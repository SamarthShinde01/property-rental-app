import { PropertyCard } from "@/components/PropertyCard";
import { connectDB } from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializeableObject } from "@/utils/convertToObject";

interface searchParamsTypes {
	location: string;
	propertyType: string;
}

export default async function SearchPropertyPage({
	searchParams,
}: {
	searchParams: searchParamsTypes;
}) {
	const { location, propertyType } = searchParams;

	await connectDB();

	const locationPattern = new RegExp(location, "i");

	let query = {
		$or: [
			{ name: locationPattern },
			{ description: locationPattern },
			{ "location.street": locationPattern },
			{ "location.city": locationPattern },
			{ "location.state": locationPattern },
			{ "location.zipcode": locationPattern },
		],
	};

	if (propertyType && propertyType !== "All") {
		const typePattern = new RegExp(propertyType, "i");
		query.type = typePattern;
	}

	const propertiesQueryResults = await Property.find(query).lean();
	const properties = convertToSerializeableObject(propertiesQueryResults);

	return (
		<section className="px-4 py-6">
			<div className="container-xl lg:container m-auto px-4 py-6">
				{properties.length === 0 ? (
					<p>No properties found</p>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{properties.map((property, index) => (
							<PropertyCard property={property} key={index} />
						))}
					</div>
				)}
			</div>
		</section>
	);
}
