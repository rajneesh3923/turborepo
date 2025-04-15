import { Module } from '@nestjs/common';
import { AblyRealtimeService } from './ably-realtime.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [AblyRealtimeService],
  exports: [AblyRealtimeService],
})
export class AblyRealtimeModule {}
