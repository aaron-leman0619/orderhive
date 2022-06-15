import joi from "joi";

export const IdSchema = joi.number().integer().positive().messages({
  "number.base": "Id must be a number",
  "number.integer": "Id must be an integer",
  "number.positive": "Id must be a positive number",
  "number.required": "Id is required",
});

export const IdArraySchema = joi.array().items(IdSchema).messages({
  "array.base": "Ids must be an array",
  "array.required": "Ids is required",
});

export const QuerySchema = joi.string();

export interface MessageResponse {
  message: string;
}

export interface Timestamps {
  readonly created: string;
  readonly modified: string;
}

export type DimensionUnit = "IN" | "CM" | "M";
export type WeightUnit = "KG" | "LB" | "GM" | "OZ";
export const WeightUnitSchema = joi.string().valid("KG", "LB", "GM", "OZ");
export const DimensionUnitSchema = joi.string().valid("IN", "CM", "M");
export type OptionalDimensions = Optional<Dimensions>;
export interface Dimensions {
  height: number;
  length: number;
  width: number;
  measurement_unit: DimensionUnit;
}

export type OptionalWeight = Optional<Weight>;
export interface Weight {
  weight: number;
  weight_unit: WeightUnit;
}

export interface Address {
  name?: string | null;
  company?: string | null;
  address1: string;
  address2?: string | null;
  city: string;
  state: string;
  zipcode: string;
  country?: string | null;
  country_code: string;
  contact_number?: string | null;
  email?: string | null;
  default?: boolean;
  default_customer_address?: boolean;
}

export type Optional<Type> = {
  [Property in keyof Type]+?: Type[Property];
};
