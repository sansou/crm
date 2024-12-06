import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Project } from '../project/models/project';
import { Integration } from './entities/integration';
import { ProjectService } from '../project/project.service';
import DocumentStore, { IDocumentStore } from 'ravendb';

@Injectable()
export class IntegrationService {
  private static store: IDocumentStore = null;
  constructor(
    private readonly projectService: ProjectService
  ) { }

  private initializeGlobaStore(): DocumentStore {
    return new DocumentStore('http://localhost:8080', 'crm');
  }

  getGlobalStore() {
    if (!IntegrationService.store) {
      IntegrationService.store = this.initializeGlobaStore();
      IntegrationService.store.conventions.registerEntityType(Project);
      IntegrationService.store.initialize();
    }
    return IntegrationService.store;
  }

  async addAcessToken(integration: Integration, projId: string) {
    let idx = null;
    const project: Project = await this.projectService.findById(projId);
    const hasTokenInPoject = project.integrations.some((int: Integration, index: number) => {
      if (int.name === integration.name) {
        idx = index;
        return true;
      }
    })

    let integrations: Integration[] = project.integrations;
    if (hasTokenInPoject) {
      integrations[idx] = integration;
      return await this.projectService.update(projId, integration);
    }
    integrations.push(integration);
    return this.projectService.update(projId, integration);
  }

  async create(integration: Integration, projId: string) {
    const project: Project = await this.projectService.findById(projId);
    if (!project.integrations.some(int => {
      (int.accessToken === integration.accessToken && int.name === integration.name)
    })) throw new UnauthorizedException("Integration not found");

    integration
    return ("Integration created");
  }

}
