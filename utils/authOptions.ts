import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/config/database";
import User from "@/models/User";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
		}),
	],
	callbacks: {
		//invoked on successfull sign in
		async signIn({ profile }: any) {
			//1. connect to db
			await connectDB();
			//2. check if user exist
			const userExist = await User.findOne({ email: profile.email });
			//3. if not, create user
			if (!userExist) {
				const username = profile.name.slice(0, 20);
				await User.create({
					email: profile.email,
					username,
					image: profile.picture,
				});
			}
			//4. return true to sign in
			return true;
		},

		//session callback function that modifies the session object
		async session({ session }: any) {
			//1. get user from db
			const user = await User.findOne({ email: session.user.email });
			//2. assign user id from the sesssion
			session.user.id = user._id.toString();
			//3. Return session
			return session;
		},
	},
};
