import mongoose, { mongo } from "mongoose";

const PropertySchema = new mongoose.Schema(
	{
		owner: {
			type: new mongoose.Types.ObjectId(),
			ref: "User",
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		description: { type: String },
		location: {
			street: { type: String },
			city: { type: String },
			state: { type: String },
			zipcode: { type: String },
		},
		beds: {
			type: Number,
			required: true,
		},
		baths: {
			type: Number,
			required: true,
		},
		square_feet: {
			type: Number,
			required: true,
		},
		amenities: [
			{
				type: String,
			},
		],
		rates: {
			nightly: { type: String },
			weekly: { type: String },
			monthly: { type: String },
		},
		seller_info: {
			name: { type: String },
			email: { type: String },
			phone: { type: String },
		},
		images: [{ type: String }],
		is_featured: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

const Property = mongoose.model("Property", PropertySchema);

export default Property;
