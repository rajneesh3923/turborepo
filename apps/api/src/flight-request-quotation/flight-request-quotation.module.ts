import { Module } from '@nestjs/common';
import { FlightRequestQuotationService } from './flight-request-quotation.service';
import { SupabaseModule } from 'supabase/supabase.module';
import { AblyRealtimeModule } from 'ably-realtime/ably-realtime.module';

@Module({
  imports: [SupabaseModule, AblyRealtimeModule],
  providers: [FlightRequestQuotationService],
  exports: [FlightRequestQuotationService],
})
export class FlightRequestQuotationModule {}
