import { Test, TestingModule } from '@nestjs/testing';
import { FlightRequestsService } from './flight-requests.service';

describe('FlightRequestsService', () => {
  let service: FlightRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlightRequestsService],
    }).compile();

    service = module.get<FlightRequestsService>(FlightRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
