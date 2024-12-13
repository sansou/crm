import { Item } from "dynamoose/dist/Item";

export interface Lead extends Item{
  primaryKey: string,
  sortKey: string, // será o email
  name: string,
  phone: string,
  position?: string,
  state?: string,
  city?: string,
  info?: any,
  observation?: string [],
  createdAt: Date,
  updatedAt: Date
}