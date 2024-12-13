import { Injectable, NotFoundException, PreconditionFailedException, UnauthorizedException } from '@nestjs/common';
import { UpdateLeadDto } from './dtos/update-lead.dto';
import { CreateLeadDto } from './dtos/create-lead.dto';
import { Model } from 'dynamoose/dist/Model';
import * as dynamoose from "dynamoose";
import { LeadSchema } from './entities/lead-schema';
import { Lead } from './entities/leads.entity';
import { createDynamooseId, createId } from '../utils/utils';
import { EntityTypes } from '../utils/enums';
import { normalizeLeadIds, normalizeLeadIdsForList } from '../utils/normalizes';
import { ProjectService } from '../project/project.service';
import { QueryResponse } from 'dynamoose/dist/ItemRetriever';

@Injectable()
export class LeadService {
  private dbInstance: Model<Lead>
  constructor(
    private readonly projectService: ProjectService
  ) {
    this.dbInstance = dynamoose.model<Lead>('crm', LeadSchema)
  }

  async create(dto: CreateLeadDto, domain: string) {
    
    const primaryKey = createDynamooseId(dto.projectId, EntityTypes.PROJECT);
    const sortKey = createDynamooseId(dto.email, EntityTypes.LEAD);
    const project = await this.projectService.findById(primaryKey);
    if (!project.domains.includes(domain)) throw new UnauthorizedException("This Domain doesn't belong to the project");
    
    let lead: Lead;
    try {
      lead = await this.dbInstance.create({ primaryKey, sortKey, ...dto });
    } catch (error) {
      if (error.errorType === 'ConditionalCheckFailedException'){
        throw new PreconditionFailedException("Já existe um lead cadastrado com esse email")
      }
      throw new Error(error);
    }

    return normalizeLeadIds(lead);
  }

  async findById(primaryKey: string, sortKey: string) {
    primaryKey = createDynamooseId(primaryKey, EntityTypes.PROJECT);
    sortKey = createDynamooseId(sortKey, EntityTypes.LEAD);
    const lead = await this.dbInstance.get({primaryKey, sortKey});
    if (!lead) throw new NotFoundException('Lead Not Found');
    return normalizeLeadIds(lead);
  }

  async findAll(id: string) {
    const leads = await this.dbInstance.query('entityType').eq('lead').exec();  
    let lds = normalizeLeadIdsForList(this.arrayByQueryResponse(leads));
    const ret = lds.filter(l => { 
      return (l.primaryKey === id)
    });    
    return ret;
  }

  private arrayByQueryResponse(leadQueryResponse: QueryResponse<Lead>): Lead[] {
    const lds: Lead[] = []
    for (let count = 0; count < leadQueryResponse.length; count++) {
      lds.push(leadQueryResponse[count]);
    }
    return lds;
  }

  async findAllByProject(primaryKey: string) {
    primaryKey = createDynamooseId(primaryKey, EntityTypes.PROJECT);
    const leads = await this.dbInstance.get({ primaryKey, sortKey: primaryKey });
    return normalizeLeadIds(leads);
  }

  async update(primaryKey: string, sortKey: string, updateDto: UpdateLeadDto) {
    primaryKey = createDynamooseId(primaryKey, EntityTypes.PROJECT);
    sortKey = createDynamooseId(sortKey, EntityTypes.LEAD);
    const project = await this.dbInstance.update({ primaryKey, sortKey }, updateDto);
    return normalizeLeadIds(project);
  }

  async delete(primaryKey: string, sortKey: string) {
    primaryKey = createDynamooseId(primaryKey, EntityTypes.PROJECT);
    await this.dbInstance.delete({ primaryKey, sortKey });
  }

}
