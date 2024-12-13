import { forwardRef, Module } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { ProjectModule } from '../project/project.module';

@Module({
  providers: [IntegrationService],
  exports: [IntegrationService],
  imports: [forwardRef(() =>ProjectModule)]

})
export class IntegrationModule {}
