import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Project } from '../project/models/project';
import { Integration } from './models/integration';
import { ProjectService } from '../project/project.service';
import DocumentStore, { IDocumentStore } from 'ravendb';
import { RavenDbService } from '../raven-db/raven-db.service';

@Injectable()
export class IntegrationService {
  constructor(
    private readonly projectService: ProjectService,
    private readonly dbService: RavenDbService
  ) { }

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
