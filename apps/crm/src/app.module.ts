import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IntegrationModule } from './integration/integration.module';
import { ProjectModule } from './project/project.module';
import { LeadModule } from './lead/lead.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    IntegrationModule,
    ProjectModule, 
    LeadModule, 
    RabbitmqModule,
    ConfigModule.forRoot({ isGlobal: true})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
