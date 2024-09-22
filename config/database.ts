import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DATABASE_URI as string);
		console.log("MONGO DB CONNECTED....");
	} catch (err) {
		console.error(err);
	}
};
