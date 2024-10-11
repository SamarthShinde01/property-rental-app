/**
 * Converts a Mongoose lean document into a serializable plain JavaScript object.
 *
 * The Mongoose lean document to be converted.
 * A plain JavaScript object that is a serializable representation of the input document.
 */

export function convertToSerializeableObject(leanDocument: any) {
	for (const key of Object.keys(leanDocument)) {
		if (leanDocument[key].toJSON && leanDocument[key].toString)
			leanDocument[key] = leanDocument[key].toString();
	}
	return leanDocument;
}
