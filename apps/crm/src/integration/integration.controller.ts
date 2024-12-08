import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { Integration } from './models/integration';
import { UpdateProjectDto } from '../project/models/update-project.dto';

@Controller('integration')
export class IntegrationController {

  constructor(
    private readonly service: IntegrationService
  ){}
  @Post()
  create(@Body() integrationDto: Integration) {
    // return this.service.create(integrationDto);
  }

  @Get(':id')
  get(@Param('id') projId: string) {    
    // return this.service.findById(projId);
  }

  @Get()
  getAll() {
    
    // return this.service.findAll();
  }

  @Patch(":id")
  update(
    @Param(':id') projId: string,
    @Body() updateProjDto: UpdateProjectDto
  ) {
    // return this.service.update(projId, updateProjDto);
  }

  @Delete(":id")
  delete(
    @Param(':id') projId: string,
  ) {
    // return this.service.delete(projId);
  }
}
