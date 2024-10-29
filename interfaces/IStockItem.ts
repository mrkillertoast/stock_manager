export interface IStockItem extends Document {
	name: string,
	amount: number,
	ean: number | null
}