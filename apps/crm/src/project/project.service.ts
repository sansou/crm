import { Injectable, NotFoundException } from '@nestjs/common';
import { Project } from './models/project';
import { UpdateProjectDto } from './models/update-project.dto';
import DocumentStore, { IDocumentSession, IDocumentStore } from 'ravendb';
import { RavenDbService } from '../raven-db/raven-db.service';

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

  async findById(projId: string) {
    let session: IDocumentSession;

    try {
      session = this.dbService.getSession();
      const project = await session.load<Project>(projId);
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
      const project = await session.query({ collection: 'projects' }).all();
      return project;
    } finally {
      session.dispose();
    }
  }

  async update(projId: string, updateDto: UpdateProjectDto) {
    let session: IDocumentSession;

    try {
      session = this.dbService.getSession();

      const project = await session.load<Project>(`projects/${projId}`);
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

  delete(projId: string) {
    let session: IDocumentSession;

    try {
      const session = this.dbService.getSession();
      session.delete<Project>(`projects/${projId}`);
      session.saveChanges();
    } finally {
      session.dispose();
    }
  }

}
