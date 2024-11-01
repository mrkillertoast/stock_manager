export default async function getProductOpenFoodApi(eanCode: string) {
	const response = await fetch(`https://world.openfoodfacts.org/api/v3/product/${ eanCode }.json`)
	return await response.json()
}