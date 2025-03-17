import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';
import { Database } from 'database.types';

@Injectable()
export class SupabaseService {
  constructor(private readonly configService: ConfigService) {}

  createClient(accessToken?: string) {
    return createClient<Database>(
      this.configService.get('SUPABASE_URL', '') ?? '',
      this.configService.get('SUPABASE_ANON_KEY', '') ?? '',
      {
        accessToken: accessToken ? async () => accessToken : undefined,
      },
    );
  }
}
