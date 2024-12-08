import { Test, TestingModule } from '@nestjs/testing';
import { RavenDbService } from './raven-db.service';

describe('RavenDbService', () => {
  let service: RavenDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RavenDbService],
    }).compile();

    service = module.get<RavenDbService>(RavenDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
