import { Module } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { IntegrationController } from './integration.controller';
import { ProjectModule } from '../project/project.module';

@Module({
  providers: [IntegrationService],
  exports: [IntegrationService],
  controllers: [IntegrationController],
  imports: [ProjectModule]

})
export class IntegrationModule {}
