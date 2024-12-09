import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './models/project';
import { UpdateProjectDto } from './models/update-project.dto';
import { Lead } from '../lead/models/leads';

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly service: ProjectService
  ) { }

  @Post()
  create(@Body() projDto: Project) {
    console.log("entrei no controller");
    
    return this.service.create(projDto);
  }

  @Get(':id')
  get(@Param('id') projId: string) {    
    console.log('id:', projId);
    
    return this.service.findById(projId);
  }

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Patch(":id")
  update(
    @Param(':id') projId: string,
    @Body() updateProjDto: UpdateProjectDto
  ) {
    return this.service.update(projId, updateProjDto);
  }

  @Patch(":id/leads")
  addIntegration(
    @Param(':id') projId: string,
    @Body() leads: Lead[]
  ) {
    return this.service.addLeadsToProject(projId, leads);
  }

  @Delete(":id")
  delete(
    @Param(':id') projId: string,
  ) {
    return this.service.delete(projId);
  }
}
