import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IntegrationModule } from './integration/integration.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [IntegrationModule, ProjectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
