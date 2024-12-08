import { forwardRef, Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { IntegrationModule } from '../integration/integration.module';
import { RavenDbModule } from '../raven-db/raven-db.module';

@Module({
  providers: [ProjectService],
  exports: [ProjectService],
  controllers: [ProjectController],
  imports: [forwardRef(()=> IntegrationModule), RavenDbModule]

})
export class ProjectModule {}
