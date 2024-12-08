import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async defaultNesJS(): Promise<string> {
    throw new Error('Method not implemented.');
  }
  async getHello(): Promise<string> {
    return 'Hello World!';
  }
}
