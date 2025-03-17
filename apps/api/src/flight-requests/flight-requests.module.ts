import { Module } from '@nestjs/common';
import { FlightRequestsService } from './flight-requests.service';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  providers: [FlightRequestsService],
  exports: [FlightRequestsService],
})
export class FlightRequestsModule {}
