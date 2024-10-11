"use server";
import cloudinary from "@/config/cloudinary";
import { connectDB } from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function addProperty(formData: any) {
	await connectDB();

	const sessionUser = await getSessionUser();

	if (!sessionUser || !sessionUser.userId) {
		throw new Error("User ID is required");
	}

	const { userId } = sessionUser;

	// Access all values for amenities and images
	const amenities = formData.getAll("amenities");
	const images = formData
		.getAll("images")
		.filter((image: any) => image.name !== "");

	// Create the propertyData object with embedded seller_info
	const propertyData = {
		type: formData.get("type"),
		name: formData.get("name"),
		description: formData.get("description"),
		location: {
			street: formData.get("location.street"),
			city: formData.get("location.city"),
			state: formData.get("location.state"),
			zipcode: formData.get("location.zipcode"),
		},
		beds: formData.get("beds"),
		baths: formData.get("baths"),
		square_feet: formData.get("square_feet"),
		amenities,
		rates: {
			weekly: formData.get("rates.weekly"),
			monthly: formData.get("rates.monthly"),
			nightly: formData.get("rates.nightly."),
		},
		seller_info: {
			name: formData.get("seller_info.name"),
			email: formData.get("seller_info.email"),
			phone: formData.get("seller_info.phone"),
		},
		images,
		owner: userId,
	};

	const imageUrls = [];

	for (const imageFile of images) {
		const imageBuffer = await imageFile.arrayBuffer();
		const imageArray = Array.from(new Uint8Array(imageBuffer));
		const imageData = Buffer.from(imageArray);

		// Convert image to base64
		const imageBase64 = imageData.toString("base64");
		const imageType = imageFile.type.split("/")[1]; // Get the file extension

		try {
			// Upload image to Cloudinary
			const result = await cloudinary.uploader.upload(
				`data:image/${imageType};base64,${imageBase64}`,
				{
					folder: "property-rental",
				}
			);
			imageUrls.push(result.secure_url);
		} catch (error) {
			console.error("Failed to upload image to Cloudinary", error);
			throw new Error("Image upload failed");
		}
	}

	propertyData.images = imageUrls;

	const newProperty = new Property(propertyData);
	await newProperty.save();

	revalidatePath("/", "layout");
	redirect(`/properties/${newProperty._id}`);
}
