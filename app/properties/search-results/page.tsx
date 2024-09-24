import { PropertyCard } from "@/components/PropertyCard";
import { PropertySearchForm } from "@/components/PropertySearchForm";
import { connectDB } from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializeableObject } from "@/utils/convertToObject";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";

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
		<>
			<section className="bg-blue-700 py-4">
				<div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
					<PropertySearchForm />
				</div>
			</section>
			<section className="px-4 py-6">
				<div className="container-xl lg:container m-auto px-4 py-6">
					<Link
						href="/properties"
						className="flex items-center text-blue-500 hover:underline mb-3"
					>
						<FaArrowAltCircleLeft className="mr-2 mb-1" /> Back To Properties
					</Link>

					<h1 className="text-2xl mb-4">Search Results</h1>
					{properties.length === 0 ? (
						<p>No search results</p>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{properties.map((property) => (
								<PropertyCard property={property} key={property._id} />
							))}
						</div>
					)}
				</div>
			</section>
		</>
	);
}