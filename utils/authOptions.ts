import { Session } from "inspector/promises";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
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
			//2. check if user exist
			//3. if not, create user
			//4. return true to sign in
		},
		async session({ session }: any) {
			//1. get user from db
			//2. assign user id from the sesssion
			//3. Return session
		},
	},
};
