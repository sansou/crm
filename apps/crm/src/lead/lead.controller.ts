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
    const host = request.headers['host'];
    return this.service.create(lead, host);
  }

  @Get('/project/:projectId')
  async findAll(@Param('projectId') pk: string) {
    return this.service.findAll(pk);
  }
  
  @Delete(':id/project/:projectId')
  async delete(
    @Param('id') pk:string,
    @Param('projectId') sk:string,
  ){ 
    return await this.service.delete(pk, sk);
  }

  @Patch(':id/project/:projectId')
  async update(
    @Body() lead: UpdateLeadDto,
    @Param('id') pk:string,
    @Param('project') sk: string
  ) {
    return await this.service.update(pk, sk, lead);
  }

}
