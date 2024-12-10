import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateLeadDto } from './dtos/update-lead.dto';
import { CreateLeadDto } from './dtos/create-lead.dto';
import { Model } from 'dynamoose/dist/Model';
import * as dynamoose from "dynamoose";
import { LeadSchema } from './entities/lead-schema';
import { Lead } from './entities/leads.entity';
import { createDynamooseId, createId } from '../utils/utils';
import { EntityTypes } from '../utils/enums';
import { normalizeLeadIds } from '../utils/normalizes';

@Injectable()
export class LeadService {
  private dbInstance: Model<Lead>
  constructor(
  ) {
    this.dbInstance = dynamoose.model<Lead>('crm', LeadSchema)
  }

  async create(pk: string, dto: CreateLeadDto) {
    pk = createDynamooseId(pk, EntityTypes.PROJECT);
    const sk = createDynamooseId(createId(), EntityTypes.LEAD);
    const lead = await this.dbInstance.create({ pk, ...dto });    
    return normalizeLeadIds(lead);
  }

  async findById(pk: string, sk: string) {
    pk = createDynamooseId(pk, EntityTypes.PROJECT);
    sk = createDynamooseId(sk, EntityTypes.LEAD);
    const lead = await this.dbInstance.get({pk, sk});
    if (!lead) throw new NotFoundException('Lead Not Found');
    return normalizeLeadIds(lead);
  }

  async findAll(id: string) {
    const projects = await this.dbInstance.query('entityType').eq('lead').exec();
    return projects;
  }

  async findAllByProject(pk: string) {
    console.log("pk antes", pk);    
    pk = createDynamooseId(pk, EntityTypes.PROJECT);
    console.log("pk depois", pk);
    const leads = await this.dbInstance.get({ pk, sk: pk });
    return normalizeLeadIds(leads);
  }

  async update(pk: string, sk: string, updateDto: UpdateLeadDto) {
    pk = createDynamooseId(pk, EntityTypes.PROJECT);
    sk = createDynamooseId(pk, EntityTypes.LEAD);
    const project = await this.dbInstance.update({ pk, sk: pk }, updateDto);
    return normalizeLeadIds(project);
  }

  async delete(pk: string, sk: string) {
    pk = createDynamooseId(pk, EntityTypes.PROJECT);
    await this.dbInstance.delete({ pk, sk });
  }

}
