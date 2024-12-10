import { ConfigService } from '@nestjs/config';
import { connect, Channel } from 'amqplib';

export const RabbitMQProvider = {
  provide: 'RABBITMQ_PROVIDER',
  useFactory: async (ConfigService: ConfigService) => {
    const uri = ConfigService.get<string>('RABBITMQ_PRIVATE_URL');
    const conn = await connect(uri);
    const channel = await conn.createChannel();
    return channel;
  },
  inject: [ConfigService],
}

export type RabbitMQProviderType = Promise<Channel>;