export interface PropertyType {
	_id: string;
	owner: string;
	name: string;
	type: string;
	description: string;
	location: {
		street?: string; // street is missing in your example, so making it optional
		city: string;
		state: string;
		zipcode: string;
	};
	beds: number;
	baths: number;
	square_feet: number;
	amenities: string[];
	rates: {
		nightly?: string;
		weekly?: string;
		monthly?: string;
	};
	seller_info: {
		name: string;
		email: string;
		phone: string;
	};
	images: string[];
	is_featured: boolean; // corrected field name
	createdAt: Date; // should be a Date type
	updatedAt: Date; // should be a Date type
}
