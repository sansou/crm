import { Module } from '@nestjs/common';
import { RmqProcessController } from './rmq-process.controller';
import { RmqProcessService } from './rmq-process.service';
import { ConfigModule } from '@nestjs/config';
import { RabbitmqModule } from 'apps/crm/src/rabbitmq/rabbitmq.module';
import { LeadService } from './lead.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}),
    // RabbitmqModule
  ],
  controllers: [RmqProcessController],
  providers: [RmqProcessService, LeadService],
})
export class RmqProcessModule {}
