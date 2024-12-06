import { Controller, Get } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(
    private readonly service: ProjectService
  ) { }
  @Get("crm.project.get")
  get() {
    return;
    // return this.service.findById(projId);
  }
}
