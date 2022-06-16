import { IdArraySchema } from "../definitions/global";
import { TageTypeSchema } from "../definitions/tags";
import Orderhive from "../index";

type TagType = "sales_order";

/** *
 * @param  {number[]} orderIds
 * @param  {number[]} tagIds
 * @param  {TagType} type
 * @return {Promise<undefined>}
 */

export default async function addTag(
  this: Orderhive,
  orderIds: Array<number>,
  tagIds: Array<number>,
  type?: TagType
): Promise<undefined> {
  await IdArraySchema.validateAsync(orderIds);
  await IdArraySchema.validateAsync(tagIds);
  await TageTypeSchema.validateAsync(type);
  try {
    let obj = {
      source_id: orderIds,
      tags: tagIds,
    };
    let path = `/orders/tags/${type}`;
    const headers = await this.signRequest("PUT", path, obj);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.put(path, obj, { headers });
    this.logger.info(res.data.message);
    return;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError("Error adding tag", error.response.data);
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
