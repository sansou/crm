import { Module } from '@nestjs/common';
import { LeadService } from './lead.service';

@Module({
  providers: [LeadService]
})
export class LeadModule {}
