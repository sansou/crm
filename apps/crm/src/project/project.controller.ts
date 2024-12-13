import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './entities/project.entity';
import { Lead } from '../lead/entities/leads.entity';
import { CreateProjectDTO } from './dtos/create-project.dto';

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly service: ProjectService
  ) { }

  @Post()
  async create(
    @Body() projDto: CreateProjectDTO
  ) {
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
  async delete(
    @Param('id') primaryKey: string,
  ) {
    return await this.service.delete(primaryKey);
  }
}
