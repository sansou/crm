import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LeadService } from './lead.service';
import { Lead } from './models/leads';

@Controller('leads')
export class LeadController {
  constructor(
    private readonly service: LeadService
  ) { }

  @Post()
  async create(@Body() lead: Lead) {
    return this.service.add(lead);
  }

  @Get('/project/:projectId')
  async findAll(@Param() projId: string) {
    return this.service.findAllByProject(projId);
  }
  
  @Delete(':id')
  async delete(@Param() id:string){ 
    return await this.service.delete(id);
  }

}
