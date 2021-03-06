import {
  StockUpdateWarehouse,
  StockUpdateReturn,
  StockDataSchema,
} from "../definitions/products";
import Orderhive from "../index";
import { IdSchema } from "../definitions/global";

/**
 * @param  {number} productId - Orderhive Product ID
 * @param  {StockUpdateWarehouse} stockData - Data to update the product stock with
 * @return {Promise<StockUpdateReturn>}
 */

export default async function updateProductStock(
  this: Orderhive,
  productId: number,
  stockData: StockUpdateWarehouse[]
): Promise<StockUpdateReturn> {
  await IdSchema.required().validateAsync(productId);
  await StockDataSchema.required().validateAsync(stockData);
  for (let each of stockData) {
    if (!each.inventory_levels) continue;
    for (let level of each.inventory_levels) {
      if (!level.cost && !level.location && !level.batch) {
        throw new Error(
          "At least one of Location, Batch, or Cost must be defined."
        );
      }
    }
  }
  try {
    let obj = { warehouses: stockData };
    const path = `/product/stock/${productId}`;
    const headers = await this.signRequest("PUT", path, obj);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.put(path, obj, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error updating stock for product ${productId}`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
