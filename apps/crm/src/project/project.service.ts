import { Injectable, NotFoundException } from '@nestjs/common';
import { Project } from './entities/project.entity';
import { Model } from 'dynamoose/dist/Model';
import * as dynamoose from "dynamoose";
import { ProjectSchema } from './entities/project-schema';
import { CreateProjectDTO } from './dtos/create-project.dto';
import { createDynamooseId, createId } from '../utils/utils';
import { EntityTypes, StatusProject } from '../utils/enums';
import { normalizeProjectIds, normalizeProjectIdsForList } from '../utils/normalizes';
import { UpdateProjectDTO } from './dtos/update-project.dto';
import { QueryResponse } from 'dynamoose/dist/ItemRetriever';

@Injectable()
export class ProjectService {
  private dbInstance: Model<Project>
  constructor(
  ) {
    this.dbInstance = dynamoose.model<Project>('crm', ProjectSchema)
  }

  async create(dto: CreateProjectDTO) {
    const primaryKey = createDynamooseId(createId(), EntityTypes.PROJECT);
    const project = await this.dbInstance.create({ primaryKey, sortKey: primaryKey, ...dto });
    return normalizeProjectIds(project);
  }

  async findById(primaryKey: string) {
    primaryKey = createDynamooseId(primaryKey, EntityTypes.PROJECT)
    const proj = await this.dbInstance.get({ primaryKey, sortKey: primaryKey });
    if (!proj) throw new NotFoundException('Project Not Found');
    return normalizeProjectIds(proj);
  }

  async findAll() {
    const projects = await this.dbInstance.query('entityType').eq('project').exec();
    const projs = this.arrayByQueryResponse(projects);
    return normalizeProjectIdsForList(projs);
  }

  private arrayByQueryResponse(projQueryResponse: QueryResponse<Project>): Project[] {
    const projs: Project[] = []
    for (let count = 0; count < projQueryResponse.length; count++) {
      projs.push(projQueryResponse[count]);
    }
    return projs;
  }

  async update(primaryKey: string, updateDto: UpdateProjectDTO) {
    primaryKey = createDynamooseId(primaryKey, EntityTypes.PROJECT);
    const project = await this.dbInstance.update({ primaryKey, sortKey: primaryKey }, updateDto);
    return normalizeProjectIds(project);
  }

  async delete(primaryKey: string) {
    primaryKey = createDynamooseId(primaryKey, EntityTypes.PROJECT);
    await this.dbInstance.delete({ primaryKey, sortKey: primaryKey });
  }


}

