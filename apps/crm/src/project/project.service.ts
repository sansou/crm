import { Injectable, NotFoundException } from '@nestjs/common';
import { Project } from './entities/project.entity';
import { UpdateProjectDto } from './entities/update-project.dto';
import { Integration } from '../integration/entities/integration.entity';

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

  create(project: Project) {
    return "Projeto Criado";
  }

  update(projId: string, updateDto: UpdateProjectDto) {

  }

  findById(projId: string) {
    if(projId === this.proj.id) return (this.proj);
    throw new NotFoundException("Project not found");
  }

  
}
