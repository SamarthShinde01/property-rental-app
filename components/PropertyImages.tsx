"use client";
import Image from "next/image";

export const PropertyImages = ({ images }: { images: string[] }) => {
	return (
		<section className="bg-blue-50 p-4">
			<div className="container mx-auto">
				{images.length === 1 ? (
					<Image
						src={images[0]}
						alt=""
						className="object-cover h-[400px] mx-auto rounded-xl"
						width={1800}
						height={400}
						priority={true}
					/>
				) : (
					<div className={`grid grid-cols-2 gap-4`}>
						{images.map((image, index) => (
							<Image
								key={index}
								src={image}
								alt=""
								className="object-cover h-[400px] w-full rounded-xl"
								width={1200}
								height={400}
								priority={true}
							/>
						))}
					</div>
				)}
			</div>
		</section>
	);
};
