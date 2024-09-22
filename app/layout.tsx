import type { Metadata } from "next";
import "@/assets/styles/globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
	title: "Property Rental App",
	description: "Find the perfect rental property",
	keywords: "rental, property, real estate",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
