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
    
    const pk = createDynamooseId(dto.projectId, EntityTypes.PROJECT);
    const sk = createDynamooseId(dto.email, EntityTypes.LEAD);
    const project = await this.projectService.findById(pk);
    if (!project.domains.includes(domain)) throw new UnauthorizedException("This Domain doesn't belong to the project");
    
    let lead: Lead;
    try {
      lead = await this.dbInstance.create({ pk, sk, ...dto });
    } catch (error) {
      if (error.errorType === 'ConditionalCheckFailedException'){
        throw new PreconditionFailedException("Já existe um lead cadastrado com esse email")
      }
      throw new Error(error);
    }

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
    const leads = await this.dbInstance.query('entityType').eq('lead').exec();  
    let lds = normalizeLeadIdsForList(this.arrayByQueryResponse(leads));
    const ret = lds.filter(l => { 
      return (l.pk === id)
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

  async findAllByProject(pk: string) {
    pk = createDynamooseId(pk, EntityTypes.PROJECT);
    const leads = await this.dbInstance.get({ pk, sk: pk });
    return normalizeLeadIds(leads);
  }

  async update(pk: string, sk: string, updateDto: UpdateLeadDto) {
    pk = createDynamooseId(pk, EntityTypes.PROJECT);
    sk = createDynamooseId(sk, EntityTypes.LEAD);
    const project = await this.dbInstance.update({ pk, sk }, updateDto);
    return normalizeLeadIds(project);
  }

  async delete(pk: string, sk: string) {
    pk = createDynamooseId(pk, EntityTypes.PROJECT);
    await this.dbInstance.delete({ pk, sk });
  }

}
