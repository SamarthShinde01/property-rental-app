"use client";
import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";

export const PropertyImages = ({ images }: { images: string[] }) => {
	return (
		<Gallery>
			<section className="bg-blue-50 p-4">
				<div className="container mx-auto">
					{images.length === 1 ? (
						<Item
							original={images[0]}
							thumbnail={images[0]}
							width="1000"
							height="600"
						>
							{({ ref, open }) => (
								<Image
									src={images[0]}
									ref={ref}
									onClick={open}
									alt=""
									className="object-cover h-[400px] mx-auto rounded-xl cursor-pointer"
									width={1800}
									height={400}
									priority
								/>
							)}
						</Item>
					) : (
						<div className="grid grid-cols-2 gap-4">
							{images.map((image, index) => (
								<Item
									key={index}
									original={image}
									thumbnail={image}
									width="1000"
									height="600"
								>
									{({ ref, open }) => (
										<Image
											src={image}
											ref={ref}
											onClick={open}
											alt=""
											className="object-cover h-[400px] w-full rounded-xl cursor-pointer"
											width={1200}
											height={400}
											priority
										/>
									)}
								</Item>
							))}
						</div>
					)}
				</div>
			</section>
		</Gallery>
	);
};
