import { Module } from '@nestjs/common';
import { LeadService } from './lead.service';
import { LeadController } from './lead.controller';
import { ProjectModule } from '../project/project.module';

@Module({
  providers: [LeadService],
  controllers: [LeadController],
  imports: [ ProjectModule]
})
export class LeadModule {}
