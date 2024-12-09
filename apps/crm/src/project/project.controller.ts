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
  async create(@Body() projDto: Project) {   
    return this.service.create(projDto);
  }

  @Get(':id')
  async get(@Param('id') projId: string) {    
    console.log('id:', projId);
    
    return this.service.findById(projId);
  }

  @Get()
  async getAll() {
    return this.service.findAll();
  }

  @Patch(':id')
  async update(
    @Param('id') projId: string,
    @Body() updateProjDto: UpdateProjectDto
  ) {
    return this.service.update(projId, updateProjDto);
  }

  @Patch('leads')
  async addLeads(
    @Body() leads: Lead[]
  ) {    
    return  await this.service.addLeadsToProject(leads);
  }

  @Patch('lead')
  async addLead(
    @Body() lead: Lead
  ) {
    return await this.service.addLead(lead);
  }

  @Delete(':id')
  delete(
    @Param(':id') projId: string,
  ) {
    return this.service.delete(projId);
  }
}
