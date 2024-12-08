import { forwardRef, Module } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { IntegrationController } from './integration.controller';
import { ProjectModule } from '../project/project.module';
import { RavenDbModule } from '../raven-db/raven-db.module';

@Module({
  providers: [IntegrationService],
  exports: [IntegrationService],
  controllers: [IntegrationController],
  imports: [forwardRef(() =>ProjectModule), RavenDbModule]

})
export class IntegrationModule {}
