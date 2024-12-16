import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { LeadService } from './lead.service';
import { CreateLeadDto } from './dtos/create-lead.dto';
import { UpdateLeadDto } from './dtos/update-lead.dto';

@Controller('leads')
export class LeadController {
  constructor(
    private readonly service: LeadService
  ) { }

  @Post()
  async create(
    @Req() request: Request,
    @Body() lead: CreateLeadDto
  ) {    
    const host = request.headers['hostname'];
    return this.service.create(lead, host);
  }

  @Get('/project/:projectId')
  async findAll(@Param('projectId') primaryKey: string) {
    return this.service.findAll(primaryKey);
  }
  
  @Delete(':id/project/:projectId')
  async delete(
    @Param('id') primaryKey:string,
    @Param('projectId') sortKey:string,
  ){ 
    return await this.service.delete(primaryKey, sortKey);
  }

  @Patch(':id/project/:projectId')
  async update(
    @Body() lead: UpdateLeadDto,
    @Param('id') primaryKey:string,
    @Param('project') sortKey: string
  ) {
    return await this.service.update(primaryKey, sortKey, lead);
  }

}
