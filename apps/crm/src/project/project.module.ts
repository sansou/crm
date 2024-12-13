import { forwardRef, Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { IntegrationModule } from '../integration/integration.module';

@Module({
  providers: [ProjectService],
  exports: [ProjectService],
  controllers: [ProjectController],
  imports: [forwardRef(()=> IntegrationModule)]

})
export class ProjectModule {}
