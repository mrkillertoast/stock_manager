import { Query } from "appwrite";

export default async function (eanToFind: string) {
	const { $appwrite } = useNuxtApp();
	return $appwrite.databases.listDocuments("671fe58d001e645a7db6", "671fe5aa0019b0178339", [ Query.equal('ean', eanToFind) ])
}