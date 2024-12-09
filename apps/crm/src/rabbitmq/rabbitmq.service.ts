import { Inject, Injectable } from '@nestjs/common';
import { RabbitMQProviderType } from './rabbitmq.provider';
import { Channel, Message } from 'amqplib';

type Queue = 'lead';

@Injectable()
export class RabbitmqService {
  private channel: Channel
  constructor(
    @Inject('RABBITMQ_PROVIDER') private readonly rabbitMQProvider: RabbitMQProviderType,
  ) { }

  async start() {
    if (!this.channel) this.channel = await this.rabbitMQProvider;
  }

  async publishInQueue(queue: Queue, message: string) {
    return this.channel.sendToQueue(queue, Buffer.from(message));
  }

  async consume(queue: Queue, callback: (message: Message) => void) {
    return this.channel.consume(queue, (message) => {
      if (callback) callback(message);
      this.channel.ack(message);
    })
  }
}
