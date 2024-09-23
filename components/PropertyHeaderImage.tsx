import Image from "next/image";

export const PropretyHeaderImage = ({ image }: { image: string }) => {
	return (
		<section>
			<div className="container-xl m-auto">
				<div className="grid grid-cols-1">
					<Image
						src={image}
						alt=""
						className="object-cover h-[400px] w-full"
						height={0}
						width={0}
						sizes="100vw"
						priority={true}
					/>
				</div>
			</div>
		</section>
	);
};
