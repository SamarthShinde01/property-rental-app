import { BookmarkButton } from "@/components/BookmarkButton";
import { ContactForm } from "@/components/ContactForm";
import { PropertyDetail } from "@/components/PropertyDetails";
import { PropretyHeaderImage } from "@/components/PropertyHeaderImage";
import { ShareButtons } from "@/components/ShareButtons";
import { connectDB } from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializeableObject } from "@/utils/convertToObject";

export default async function PropertyByIdPage({ params }: { params: any }) {
	await connectDB();
	const propertyDoc = await Property.findById(params.id).lean();
	const property = convertToSerializeableObject(propertyDoc);

	return (
		<>
			<PropretyHeaderImage image={property.images[0]} />
			<section className="bg-blue-50">
				<div className="container m-auto py-10 px-6">
					<div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
						<PropertyDetail property={property} />

						{/* <!-- Sidebar --> */}
						<aside className="space-y-4">
							<BookmarkButton property={property} />
							<ShareButtons property={property} />
							<ContactForm property={property} />
						</aside>
					</div>
				</div>
			</section>
		</>
	);
}
