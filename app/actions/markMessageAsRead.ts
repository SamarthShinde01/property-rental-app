"use server";
import { connectDB } from "@/config/database";
import { getSessionUser } from "@/utils/getSessionUser";
import User from "@/models/User";
import { revalidatePath } from "next/cache";
import Message from "@/models/Message";

export default async function markMessageAsRead(messageId: string) {
	await connectDB();
	const sessionUser = await getSessionUser();
	if (!sessionUser || !sessionUser.userId) {
		throw new Error("User ID is required");
	}

	const { userId } = sessionUser;

	const message = await Message.findById(messageId);

	if (!message) throw new Error("Message not found");

	//verify ownership
	if (message.recipient.toString() !== userId) {
		throw new Error("Unauthorized");
	}

	message.read = !message.read;

	revalidatePath("/messages");

	await message.save();

	return message.read;
}
