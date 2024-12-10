import { Item } from "dynamoose/dist/Item";

export interface Lead extends Item{
  pk: string,
  email: string, //Será a SK
  name: string,
  phone: string,
  position?: string,
  state?: string,
  city?: string,
  entityType: string,
  createdAt: Date,
}