import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './entities/project.entity';
import { Lead } from '../lead/models/leads';

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly service: ProjectService
  ) { }

  @Post()
  async create(@Body() projDto: Project) {   
    return await this.service.create(projDto);
  }

  @Get(':id')
  async get(@Param('id') projId: string) {       
    return this.service.findById(projId);
  }

  @Get()
  async getAll() {
    return this.service.findAll();
  }

  @Patch(':id')
  async update(
    @Param('id') projId: string,
    @Body() updateProjDto: any
  ) {
    return this.service.update(projId, updateProjDto);
  }

  @Delete(':id')
  delete(
    @Param(':id') projId: string,
  ) {
    return this.service.delete(projId);
  }
}
