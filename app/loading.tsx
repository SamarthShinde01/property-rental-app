"use client";
import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
	display: "block",
	margin: "100px auto",
};

export default function LoadingSpinner({ loading }: { loading: boolean }) {
	return (
		<ClipLoader
			color="#3B82F6"
			loading={loading}
			cssOverride={override}
			size={150}
			aria-label="Loading Spinner"
			data-testid="loader"
		/>
	);
}
