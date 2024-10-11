import { PropertyEditForm } from "@/components/PropertyEditForm";
import { connectDB } from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializeableObject } from "@/utils/convertToObject";

interface ParamsType {
	params: {
		id: string;
	};
}

export default async function EditPropertyPage({ params }: ParamsType) {
	await connectDB();

	const propertyDoc = await Property.findById(params?.id).lean();

	// Serialize the propertyDoc into a format suitable for passing to the component
	const property = propertyDoc
		? convertToSerializeableObject(propertyDoc)
		: null;

	// Handle case when the property is not found
	if (!property) {
		return (
			<h1 className="text-center text-2xl font-bold mt-10">
				Property Not Found
			</h1>
		);
	}

	return (
		<section className="bg-blue-50">
			<div className="container m-auto max-w-2xl py-24">
				<div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
					<PropertyEditForm property={property} />
				</div>
			</div>
		</section>
	);
}
