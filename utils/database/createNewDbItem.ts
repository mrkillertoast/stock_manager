import { ID, Query } from "appwrite";

export default async function (data: Object) {
	const { $appwrite } = useNuxtApp();
	return $appwrite.databases.createDocument("671fe58d001e645a7db6", "671fe5aa0019b0178339",ID.unique(), data)
}