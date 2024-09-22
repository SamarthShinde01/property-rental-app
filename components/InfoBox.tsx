import Link from "next/link";

interface InfoBoxTypes {
	heading: string;
	backgroundColor?: string;
	children: string;
	buttonInfo: {
		link: string;
		buttonText: string;
		buttonBg: string;
	};
}

export const InfoBox = ({
	heading,
	backgroundColor = "bg-gray-100",
	children,
	buttonInfo,
}: InfoBoxTypes) => {
	return (
		<div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
			<h2 className="text-2xl font-bold">{heading}</h2>
			<p className="mt-2 mb-4">{children}</p>
			<Link
				href={buttonInfo.link}
				className={`inline-block ${buttonInfo.buttonBg}-500  text-white rounded-lg px-4 py-2 hover:${buttonInfo.buttonBg}-700`}
			>
				{buttonInfo.buttonText}
			</Link>
		</div>
	);
};
