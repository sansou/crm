import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('lead')
  async defaultNesJS() {
    return this.appService.defaultNesJS();
  }

  @Get('queue')
  async queue() {
    return this.appService.queue();
  }
}
