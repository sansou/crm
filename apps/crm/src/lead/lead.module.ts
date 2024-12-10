import { Module } from '@nestjs/common';
import { LeadService } from './lead.service';
import { LeadController } from './lead.controller';
import { RavenDbModule } from '../raven-db/raven-db.module';
import { ProjectModule } from '../project/project.module';

@Module({
  providers: [LeadService],
  controllers: [LeadController],
  imports: [RavenDbModule, ProjectModule]
})
export class LeadModule {}
