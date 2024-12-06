import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './models/project';
import { UpdateProjectDto } from './models/update-project.dto';

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly service: ProjectService
  ) { }

  @Post()
  create(@Body() projDto: Project) {
    return this.service.create(projDto);
  }

  @Get()
  get(@Param() projId: string) {
    return this.service.findById(projId);
  }

  @Patch()
  update(
    @Param() projId: string,
    @Body() updateProjDto: UpdateProjectDto
  ) {
    return this.service.update(projId, updateProjDto);
  }
}
