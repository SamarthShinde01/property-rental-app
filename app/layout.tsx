import type { Metadata } from "next";
import "@/assets/styles/globals.css";
import { Navbar } from "@/components/Navbar";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { Footer } from "@/components/Footer";

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
		<AuthProvider>
			<html lang="en">
				<body>
					<Navbar />
					<main>{children}</main>

					<ToastContainer />
					<Footer />
				</body>
			</html>
		</AuthProvider>
	);
}
