import { Item } from 'dynamoose/dist/Item';

export interface Project extends Item {
    pk: string,
    sk: string,
    name: string,
    status: string,
    entityType: string;
    createdAt?: Date,
    updatadAt?: Date,
}
