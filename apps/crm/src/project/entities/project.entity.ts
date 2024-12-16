import { Item } from 'dynamoose/dist/Item';

export interface Project extends Item {
    pk: string,
    sk: string,
    name: string,
    status: string,
    domains: string[],
    description?: string,
    createdAt?: Date,
    updatadAt?: Date,
}
