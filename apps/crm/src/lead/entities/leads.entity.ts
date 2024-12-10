import { Item } from "dynamoose/dist/Item";

export interface Lead extends Item{
  pk: string,
  sk: string, // será o email
  name: string,
  phone: string,
  position?: string,
  state?: string,
  city?: string,
  entityType: string,
  createdAt: Date,
}