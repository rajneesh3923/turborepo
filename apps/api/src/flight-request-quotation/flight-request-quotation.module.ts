import { Module } from '@nestjs/common';
import { FlightRequestQuotationService } from './flight-request-quotation.service';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  providers: [FlightRequestQuotationService],
  exports: [FlightRequestQuotationService],
})
export class FlightRequestQuotationModule {}
