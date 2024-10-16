import { connectDB } from "@/config/database";
import Link from "next/link";
import profileDefault from "@/assets/images/profile.png";
import { getSessionUser } from "@/utils/getSessionUser";
import Image from "next/image";
import Property from "@/models/Property";
import { ProfileProperty } from "@/components/ProfileProperty";
import { convertToSerializeableObject } from "@/utils/convertToObject";

export default async function ProfilePage() {
	await connectDB();
	const sessionUser = await getSessionUser();
	const { userId }: any = sessionUser;

	if (!userId) {
		throw new Error("User ID is required");
	}

	const properties = await Property.find({ owner: userId })
		.sort({ createdAt: -1 })
		.lean();

	return (
		<section className="bg-blue-50">
			<div className="container m-auto p-10">
				<div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
					<h1 className="text-2xl font-bold mb-4">Your Profile</h1>
					<div className="flex flex-col md:flex-row">
						<div className="md:w-1/4 mx-20 mt-10">
							<div className="mb-4">
								<Image
									className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
									src={sessionUser?.user?.image || profileDefault}
									height={200}
									width={200}
									alt="User"
								/>
							</div>

							<h2 className="text-2xl mb-4">
								<span className="font-bold block">Name: </span>
								{sessionUser?.user?.name}
							</h2>
							<h2 className="text-2xl">
								<span className="font-bold block">Email: </span>
								{sessionUser?.user?.email}
							</h2>
						</div>

						<div className="md:w-3/4 md:pl-4">
							<h2 className="text-xl font-semibold mb-4">Your Listings</h2>
							{properties?.map((property, index) => (
								<ProfileProperty
									key={index}
									property={convertToSerializeableObject(property)}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
