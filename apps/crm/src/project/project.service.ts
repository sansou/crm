import { Injectable, NotFoundException } from '@nestjs/common';
import { Project } from './models/project';
import { UpdateProjectDto } from './models/update-project.dto';
import { IDocumentSession } from 'ravendb';
import { RavenDbService } from '../raven-db/raven-db.service';
import { Lead } from '../lead/models/leads';

@Injectable()
export class ProjectService {
  constructor(
    private readonly dbService: RavenDbService
  ) { }

  async create(project: Project) {
    let session: IDocumentSession;
    
    try {
      session = this.dbService.getSession();
      await session.store<Project>(project, "projects/");
      await session.saveChanges();
      return {
        ...project,
        id: session.advanced.getDocumentId(project)
      };
    } finally {
      session.dispose();
    }
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

  async update(id: string, updateDto: UpdateProjectDto) {
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

  delete(id: string) {
    let session: IDocumentSession;

    try {
      session = this.dbService.getSession();
      session.delete<Project>("projects/" + id);
      session.saveChanges();
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
