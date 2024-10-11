"use client";
import Image from "next/image";
import Link from "next/link";
import deleteProperty from "@/app/actions/deleteProperty";
import { toast } from "react-toastify";
import { PropertyType } from "@/types/propertyTypes";

export const ProfileProperty = ({ property }: { property: PropertyType }) => {
	const handleDeleteProperty = async (propertyId: string) => {
		const confirmed = window.confirm(
			"Are you sure you want to delete this property?"
		);

		if (!confirmed) {
			return;
		}

		try {
			await deleteProperty(propertyId);
			toast.success("Property deleted successfully");
		} catch (error) {
			console.error("Error deleting property:", error);
			toast.error("Failed to delete property. Please try again.");
		}
	};

	if (!property) {
		return <p>Properties not added yet..</p>;
	}

	return (
		<div className="mb-10">
			<Link href="/properties">
				<Image
					className="h-32 w-full rounded-md object-cover"
					src={property.images[0]}
					height={200}
					width={500}
					alt="Property Image"
				/>
			</Link>
			<div className="mt-2">
				<p className="text-lg font-semibold">{property.name}</p>
				<p className="text-gray-600">
					Address: {property.location.street}, {property.location.city},
					{property.location.state}
				</p>
			</div>
			<div className="mt-2">
				<Link
					href={`/properties/${property._id}/edit`}
					className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
				>
					Edit
				</Link>
				<button
					className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
					type="button"
					onClick={() => handleDeleteProperty(property._id)}
				>
					Delete
				</button>
			</div>
		</div>
	);
};
