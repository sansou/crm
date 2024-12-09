import { Controller, Get } from '@nestjs/common';
import { RmqProcessService } from './rmq-process.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class RmqProcessController {
  constructor(private readonly rmqProcessService: RmqProcessService) {}

  @MessagePattern('default-nestjs-rmq')
  defaultNestJS(@Payload() data: any, @Ctx() context: RmqContext) {
    return this.rmqProcessService.defaultNestJS(data, context);
  }
}
