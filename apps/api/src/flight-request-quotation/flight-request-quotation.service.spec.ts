import { Test, TestingModule } from '@nestjs/testing';
import { FlightRequestQuotationService } from './flight-request-quotation.service';

describe('FlightRequestQuotationService', () => {
  let service: FlightRequestQuotationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlightRequestQuotationService],
    }).compile();

    service = module.get<FlightRequestQuotationService>(FlightRequestQuotationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
