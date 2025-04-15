import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { AuthContext } from 'src/trpc/context/interfaces';

@Injectable()
export class NotificationsService {
  constructor(private SupabaseService: SupabaseService) {}

  async getNotifications(authCtx: AuthContext) {
    const { data, error } = await this.SupabaseService.createClient(
      authCtx.accessToken,
    )
      .from('notification')
      .select('*, from_user:users!notification_from_user_id_fkey(*)')
      .order('created_at', { ascending: true })
      .eq('user_id', authCtx.user.id);

    if (error) {
      throw new Error('Something went wrong in the notifications api');
    }
    return { data, count: 0 };
  }

  async getNotificationsCount(authCtx: AuthContext) {
    const { count, error } = await await this.SupabaseService.createClient(
      authCtx.accessToken,
    )
      .from('notification')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', authCtx.user.id);

    console.log('DATAzdsdw', count, error);

    if (error) {
      throw new Error(
        'Something went wrong while marking the notification as read',
      );
    }
    return count;
  }
}
