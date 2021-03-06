import Orderhive from "../index";
import { MessageResponse } from "../definitions/global";
import { IdArraySchema, IdSchema } from "../definitions/global";
/**
 * @param  {number} parentProductId - Orderhive Product ID of the parent product
 * @param  {number[]} childProductIds - Array of Orderhive Product IDs for the child products
 * @return {Promise<MessageResponse>}
 */

export default async function mapProducts(
  this: Orderhive,
  parentProductId: number,
  childProductIds: number[]
): Promise<MessageResponse> {
  await IdSchema.required().validateAsync(parentProductId);
  await IdArraySchema.required().validateAsync(childProductIds);
  try {
    let obj = { product_ids: childProductIds };
    const path = `/product/automap/${parentProductId}`;
    const headers = await this.signRequest("PUT", path, obj);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.put(path, obj, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error mapping products to parent product ${parentProductId}`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
