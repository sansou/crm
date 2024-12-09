import { Injectable, OnModuleInit } from "@nestjs/common";
import { RabbitmqService } from "apps/crm/src/rabbitmq/rabbitmq.service";

@Injectable()
export class LeadService implements OnModuleInit {
  constructor(private readonly rabbitmqService: RabbitmqService){}
  

  async onModuleInit() {
    await this.rabbitmqService.start();
    await this.rabbitmqService.consume('lead', (message) => {
      console.log(message.content.toString());

    });
  }
}