import { Item } from "dynamoose/dist/Item";
import { StatusLead } from "../../utils/enums";

export interface Lead extends Item{
  primaryKey: string,
  sortKey: string, // será o email
  name: string,
  phone: string,
  status: StatusLead,
  host: string,
  position?: string,
  state?: string,
  city?: string,
  info?: any,
  observation?: string [],
  createdAt: Date,
  updatedAt: Date
}