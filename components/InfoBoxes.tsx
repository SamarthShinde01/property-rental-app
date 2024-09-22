import { InfoBox } from "./InfoBox";

export const InfoBoxes = () => {
	return (
		<section>
			<div className="container-xl lg:container m-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
					<InfoBox
						heading="For Renters"
						buttonInfo={{
							link: "/properties",
							buttonText: "Browse Properties",
							buttonBg: "bg-blue",
						}}
					>
						Find your dream rental property. Bookmark properties and contact
						owners.
					</InfoBox>

					<InfoBox
						heading="For Property Owners"
						backgroundColor="bg-blue-100"
						buttonInfo={{
							link: "properties/add",
							buttonText: "Add Property",
							buttonBg: "bg-blue",
						}}
					>
						List your properties and reach potential tenants. Rent as an airbnb
						or long term.
					</InfoBox>
				</div>
			</div>
		</section>
	);
};
