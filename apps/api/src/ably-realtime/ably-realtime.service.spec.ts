import { Test, TestingModule } from '@nestjs/testing';
import { AblyRealtimeService } from './ably-realtime.service';

describe('AblyRealtimeService', () => {
  let service: AblyRealtimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AblyRealtimeService],
    }).compile();

    service = module.get<AblyRealtimeService>(AblyRealtimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
