import { Injectable } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq/rabbitmq.service';
import { Json } from 'ravendb';

@Injectable()
export class AppService {
  constructor(private readonly rabbitmqService: RabbitmqService) { }

  async defaultNesJS() {  
  }

  async queue(){
    await this.rabbitmqService.start();
    const data = { message: 'Lead enviado para a queue'}
    await this.rabbitmqService.publishInQueue('lead', JSON.stringify(data))
  }
}
