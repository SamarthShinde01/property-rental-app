import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			unique: true,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		image: {
			type: String,
		},
		bookmarks: [
			{
				type: mongoose.Types.ObjectId,
				ref: "Property",
			},
		],
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", UserSchema);
export default User;
