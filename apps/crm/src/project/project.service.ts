import { Injectable, NotFoundException } from '@nestjs/common';
import { Project } from './models/project';
import { UpdateProjectDto } from './models/update-project.dto';
import DocumentStore, { IDocumentSession, IDocumentStore } from 'ravendb';
import { generateUuid } from '../utils';

@Injectable()
export class ProjectService {
  private static store: IDocumentStore = null;

  private initializeGlobaStore(): DocumentStore {
    return new DocumentStore('http://localhost:8080', 'crm');
  }

  getGlobalStore() {
    if (!ProjectService.store) {
      ProjectService.store = this.initializeGlobaStore();
      ProjectService.store.conventions.registerEntityType(Project);
      ProjectService.store.initialize();
    }
    return ProjectService.store;
  }

  async create(project: Project) {
    const store = this.getGlobalStore();
    let session: IDocumentSession;

    try {
      session = store.openSession();
      const id = generateUuid();
      await session.store<Project>(project, `Proj/${id}`);
      await session.saveChanges();
      return await session.load(`Proj/${id}`, Project);
    } finally {
      session.dispose();
    }
  }

  async findById(projId: string) {
    const store = this.getGlobalStore();
    let session: IDocumentSession;
    const id = "Proj/" + projId;

    try {
      session = store.openSession();
      const project = await session.load<Project>(id);
      if (!project) throw new NotFoundException("Project not found");
      return project;
    } finally {
      session.dispose();
    }
  }

  async findAll() {
    const store = this.getGlobalStore();

    let session: IDocumentSession;

    try {
      session = store.openSession();
      const project = await session.query({ collection: 'Proj'}).all();
      return project;
    } finally {
      session.dispose();
    }
  }

  async update(projId: string, updateDto: UpdateProjectDto) {
    const store = this.getGlobalStore();
    let session: IDocumentSession;

    try {
      session = store.openSession();

      const project = await session.load<Project>(`Proj/${projId}`);
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
    const store = this.getGlobalStore();
    let session: IDocumentSession;

    try {
      session = store.openSession();
      session.delete<Project>(`Proj/${projId}`);
      session.saveChanges();
    } finally {
      session.dispose();
    }
  }

}
