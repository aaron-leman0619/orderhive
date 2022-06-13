import Orderhive from "../index";
import { Warehouse } from "./index";

export default async function listWarehouses(
  this: Orderhive,
  warehouseId?: number
): Promise<Warehouse> {
  try {
    const path = `/setup/warehouse/${warehouseId}`;
    const headers = await this.signRequest("GET", path);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.get(path, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error fetching warehouse details`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}