import type { Models } from "appwrite";

export interface IStockItem {
	$id: string,
	name: string,
	amount: number,
	ean: number | null
}