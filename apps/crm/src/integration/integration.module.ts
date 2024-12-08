import { forwardRef, Module } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { ProjectModule } from '../project/project.module';
import { RavenDbModule } from '../raven-db/raven-db.module';

@Module({
  providers: [IntegrationService],
  exports: [IntegrationService],
  imports: [forwardRef(() =>ProjectModule), RavenDbModule]

})
export class IntegrationModule {}
