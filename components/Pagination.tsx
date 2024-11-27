import Link from "next/link";

interface PaginationTypes {
	page: number;
	pageSize: number;
	totalItem: number;
}

export default function Pagination({
	page,
	pageSize,
	totalItem,
}: PaginationTypes) {
	const totalPages = Math.ceil(totalItem / pageSize);
	return (
		<section className="container mx-auto flex justify-center items-center my-8">
			{page > 1 ? (
				<Link
					href={`/properties?page=${page - 1}`}
					className="mr-2 px-2 py-1 border border-gray-300 rounded"
				>
					Previous
				</Link>
			) : null}

			<span className="mx-2">
				Page {page} of {totalPages}
			</span>

			{page < totalPages ? (
				<Link
					href={`/properties?page=${page + 1}`}
					className="ml-2 px-2 py-1 border border-gray-300 rounded"
				>
					Next
				</Link>
			) : null}
		</section>
	);
}
