import { PropertyCard } from "@/components/PropertyCard";
import User from "@/models/User";
import { PropertyType } from "@/types/propertyTypes";
import { getSessionUser } from "@/utils/getSessionUser";

export default async function SavedPropertiesPage() {
	const { userId }: any = await getSessionUser();
	const { bookmarks } = await User.findById(userId).populate("bookmarks");

	return (
		<section className="px-4 py-6">
			<div className="container-xl lg:container m-auto px-4 py-6">
				<h1 className="text-2xl mb-4 text-bold">Saved Properties</h1>
				{bookmarks.length === 0 ? (
					<p>No Saved Properties found</p>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{bookmarks.map((property: PropertyType, index: number) => (
							<PropertyCard property={property} key={index} />
						))}
					</div>
				)}
			</div>
		</section>
	);
}
