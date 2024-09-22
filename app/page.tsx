import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HomeProperties } from "@/components/HomeProperties";
import { InfoBoxes } from "@/components/InfoBoxes";
import { PropertyCard } from "@/components/PropertyCard";

export default function Home() {
	return (
		<>
			<Hero />
			<InfoBoxes />
			<HomeProperties />
			<Footer />
		</>
	);
}
