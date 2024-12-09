import { Injectable, NotFoundException } from '@nestjs/common';
import { Project } from './entities/project.entity';
import { IDocumentSession } from 'ravendb';
import { RavenDbService } from '../raven-db/raven-db.service';
import { Lead } from '../lead/models/leads';
import { Model } from 'dynamoose/dist/Model';
import * as dynamoose from "dynamoose";
import { ProjectSchema } from './entities/project-schema';
import { CreateProjectDTO } from './dtos/create-project.dto';
import { createDynamooseId, createId } from '../utils/utils';
import { EntityTypes, StatusProject } from '../utils/enums';
import { normalizeProjectIds, normalizeProjectIdsForList } from '../utils/normalizes';
import { UpdateProjectDTO } from './dtos/update-project.dto';

@Injectable()
export class ProjectService {
  private dbInstance: Model<Project>
  constructor(
  ) {
    this.dbInstance = dynamoose.model<Project>('crm', ProjectSchema)
  }

  async create(dto: CreateProjectDTO) {
    const pk = createDynamooseId(createId(), EntityTypes.PROJECT);
    const project = await this.dbInstance.create({ pk, sk: pk, ...dto })
    return normalizeProjectIds(project);
  }

  async findById(pk: string) {
    pk = createDynamooseId(pk, EntityTypes.PROJECT)
    const proj = await this.dbInstance.get({ pk, sk: pk });
    if (!proj) throw new NotFoundException('Project Not Found');
    return normalizeProjectIds(proj);
  }

  async findAll() {
    const projects = await this.dbInstance.query('entityType').eq('project').exec();
    return projects;
  }

  async update(pk: string, updateDto: UpdateProjectDTO) {
    pk = createDynamooseId(pk, EntityTypes.PROJECT);
    const project = await this.dbInstance.update({ pk, sk: pk }, updateDto);
    return normalizeProjectIds(project);
  }

  async delete(pk: string) {
    pk = createDynamooseId(pk, EntityTypes.PROJECT);
    await this.dbInstance.delete({ pk, sk: pk });
  }


}

