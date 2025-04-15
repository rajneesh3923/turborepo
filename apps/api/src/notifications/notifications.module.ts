import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
