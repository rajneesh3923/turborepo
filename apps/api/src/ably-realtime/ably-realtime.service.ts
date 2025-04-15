import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Ably from 'ably';

@Injectable()
export class AblyRealtimeService {
  //   private ably: any;
  constructor(private readonly configService: ConfigService) {}

  createClient() {
    return new Ably.Realtime({
      key: this.configService.get('ABLY_API_KEY', ''),
    });
  }
}
