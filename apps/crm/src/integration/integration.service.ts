import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Project } from '../project/entities/project.entity';
import { Integration } from './models/integration';
import { ProjectService } from '../project/project.service';
import DocumentStore, { IDocumentStore } from 'ravendb';

@Injectable()
export class IntegrationService {
  constructor(
    private readonly projectService: ProjectService,
  ) { }

  async addAcessToken(integration: Integration, projId: string) {
    // let idx = null;
    // const project: Project = await this.projectService.findById(projId);
    // const hasTokenInPoject = project.integrations.some((int: Integration, index: number) => {
    //   if (int.name === integration.name) {
    //     idx = index;
    //     return true;
    //   }
    // })

    // let integrations: Integration[] = project.integrations;
    // if (hasTokenInPoject) {
    //   integrations[idx] = integration;
    //   return await this.projectService.update(projId, integration);
    // }
    // integrations.push(integration);
    // return this.projectService.update(projId, integration);
  }

  async create(integration: Integration, projId: string) {
    const project: Project = await this.projectService.findById(projId);
    //deve buscar todas por projeto
    // if (!project.integrations.some(int => {
    //   (int.accessToken === integration.accessToken && int.name === integration.name)
    // })) throw new UnauthorizedException("Integration not found");

    integration
    return ("Integration created");
  }

}
