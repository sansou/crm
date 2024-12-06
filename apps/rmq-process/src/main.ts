import { NestFactory } from '@nestjs/core';
import { RmqProcessModule } from './rmq-process.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {

  const app = await NestFactory.createMicroservice(RmqProcessModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'test_queue',
      noAck: false,
      queueOptions: {
        durable: false
      },
    },
  });
  
}
bootstrap();
