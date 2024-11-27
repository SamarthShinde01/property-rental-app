import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
	{
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		recipient: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		property: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Property",
			required: true,
		},
		name: {
			type: String,
			required: [true, "Name is required"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
		},
		phone: String,
		body: String,
		read: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const Message =
	mongoose.models.Message || mongoose.model("Message", MessageSchema);

export default Message;
