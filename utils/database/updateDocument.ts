import { Query } from "appwrite";

export default async function (documentId: string, data: Object) {
	const { $appwrite } = useNuxtApp();
	return $appwrite.databases.updateDocument('671fe58d001e645a7db6', '671fe5aa0019b0178339', documentId, data)
}