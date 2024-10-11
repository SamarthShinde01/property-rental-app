"use client";
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import { PropertyType } from "@/types/propertyTypes";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";

export const BookmarkButton = ({ property }: { property: PropertyType }) => {
	const { data: session }: any = useSession();
	const userId = session?.user?.id;

	const [loading, setLoading] = useState(false);
	const [isBookmarked, setIsBookmarked] = useState(null);

	useEffect(() => {
		const isBookmark = async () => {
			try {
				const res1 = await bookmarkProperty(property._id);
				setIsBookmarked(res1.isBookmarked);
			} catch (err: any) {
				toast.error(err);
			}
		};

		isBookmark();
	}, []);

	const handleClick = async () => {
		if (!userId) {
			toast.error("You need to be signed to bookmark a listing");
			return;
		}

		try {
			setLoading(true);
			const res = await bookmarkProperty(property._id);
			setIsBookmarked(res.isBookmarked);
			toast.success(res.message);
		} catch (err: any) {
			toast.error(err);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return <p className="text-center">Loading...</p>;
	}
	return (
		<>
			{isBookmarked ? (
				<button
					onClick={handleClick}
					className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
				>
					<FaBookmark className="mr-2" /> Property Bookmarked
				</button>
			) : (
				<button
					onClick={handleClick}
					className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
				>
					<FaBookmark className="mr-2" /> Bookmark Property
				</button>
			)}{" "}
		</>
	);
};
