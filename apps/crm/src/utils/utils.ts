import { nanoid } from 'nanoid';
import { EntityTypes } from "./enums";

export function createDynamooseId(id: string, entityType: EntityTypes): string{
  if (!id) throw new Error('ID is required');
  if (!entityType) throw new Error('Entitity type is required');
  if (id[4] === "#")  return id;
  return `${entityType}#${id}`;
}

export function getIdByDynamooseId(id: string): string{
  if (!id) throw new Error('ID is required');
  if (!(id[4] === "#"))  return id;
  return id.slice(5);
}

export function createId(): string {
    return nanoid();
}

export function createDynamooseIdWithoutThrows(id: string, entityType: EntityTypes): string{
    if (!id || id?.length < 4) return null
    if (id[4] === "#")  return id;
    return `${entityType}#${id}`;
}