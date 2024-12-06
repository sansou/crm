import { Injectable, NotFoundException } from '@nestjs/common';
import { Project } from './models/project';
import { UpdateProjectDto } from './models/update-project.dto';
import { Integration } from '../integration/entities/integration.entity';
import DocumentStore, { IDocumentSession, IDocumentStore } from 'ravendb';
import { error } from 'console';

@Injectable()
export class ProjectService {
  integration: Integration = {
    name: "integração teste",
    accessToken: "access_token",
    data: {},
  }

  proj: Project = {
    id: "id1",
    name: "Project test",
    integrations: [this.integration]
  }

  async create(project: Project) {
    let store: IDocumentStore = new DocumentStore('localhost:8080', 'crm');
    store.conventions.registerEntityType(Project)
    store.initialize()
    let session: IDocumentSession;

    try {
      await session.store<Project>(project);
      console.log("antes");
      session = store.openSession();
      await session.saveChanges();
      console.log("depois");
      return true;
    } catch (error) {
      
    } finally {
      session.dispose();
      store.dispose();

    }


    // return await session.load('project/1-A', Project);

    // try {

    // } catch (error) {
    //   console.log("error:",error);

    // }

  }

  update(projId: string, updateDto: UpdateProjectDto) {

  }

  findById(projId: string) {
    if (projId === this.proj.id) return (this.proj);
    throw new NotFoundException("Project not found");
  }

  delete(proId: string) {
    return "projeto salvo";
  }

}
