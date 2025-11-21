import { PropertyModel } from "../models/property-model";

export interface GetAllProperties {
  getAll(): Promise<PropertyModel[]>
}
