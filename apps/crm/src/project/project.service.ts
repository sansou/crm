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

@Injectable()
export class ProjectService {
  private dbInstance: Model<Project>
  constructor(
    private readonly dbService: RavenDbService
  ) {
    this.dbInstance = dynamoose.model<Project>('crm', ProjectSchema)
  }

  async create(dto: CreateProjectDTO) {
    const pk = createDynamooseId(createId(), EntityTypes.PROJECT);
    const project = await this.dbInstance.create({ pk, sk: pk, ...dto })
    return normalizeProject(project);
  }

  async findById(id: string) {
    let session: IDocumentSession;

    try {
      session = this.dbService.getSession();
      const project = await session.load<Project>('projects/' + id);
      if (!project) throw new NotFoundException("Project not found");
      return project;
    } finally {
      session.dispose();
    }
  }

  async findAll() {
    let session: IDocumentSession;

    try {
      session = this.dbService.getSession();
      const project = await session.query({ collection: 'projects/' }).all();
      return project;
    } finally {
      session.dispose();
    }
  }

  async update(id: string, updateDto: any) {
    let session: IDocumentSession;

    try {
      session = this.dbService.getSession();

      const project = await session.load<Project>("projects/" + id);
      const updatedFields = Object.keys(updateDto);
      //atualiza apenas os campos que vieram
      updatedFields.forEach((key) => {
        if (updateDto[key] !== undefined) {
          project[key] = updateDto[key];
        }
      });

      await session.saveChanges();
    } finally {
      session.dispose();
    }
  }

  async delete(id: string) {
    let session: IDocumentSession;

    try {
      session = this.dbService.getSession();
      await session.delete<Project>("projects/" + id);
      await session.saveChanges();
    } finally {
      session.dispose();
    }
  }


  async addLead(lead: Lead) {
    let session: IDocumentSession;

    console.log("lead:", lead);
    if (!lead) throw new NotFoundException()
    try {
      session = this.dbService.getSession();
      const project = await session.load<Project>('projects/' + lead.projectId);
      if (!project) throw new NotFoundException("Project not found");
      await session.store(lead, 'leads/');
      project.leads.push(session.advanced.getDocumentId(lead));
      await session.saveChanges();
    } finally {
      session.dispose();
    }

  }

  async addLeadsToProject(leads: Lead[]) {
    let session: IDocumentSession;

    const id = "projects/" + leads[0].projectId;

    try {
      session = this.dbService.getSession();
      const project = await session.load<Project>(id);
      if (!project) throw new NotFoundException("Project not found");
      for (const lead of leads) {
        lead.projectId = id;
        await session.store(lead, 'leads/');
        project.leads.push(session.advanced.getDocumentId(lead));
      }
      await session.saveChanges();

    } finally {
      session.dispose();
    }
  }

}
function normalizeProject(project: Project) {
  throw new Error('Function not implemented.');
}

