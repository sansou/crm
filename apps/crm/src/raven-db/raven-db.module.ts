import { Module } from '@nestjs/common';
import { RavenDbService } from './raven-db.service';

@Module({
  providers: [RavenDbService],
  exports: [RavenDbService]
})
export class RavenDbModule {}
