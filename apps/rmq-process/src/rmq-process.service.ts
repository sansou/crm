import { Injectable } from '@nestjs/common';
import { RmqContext } from '@nestjs/microservices';

@Injectable()
export class RmqProcessService {
  defaultNestJS(data: any, context: RmqContext) {
    return;
    
  }
}
