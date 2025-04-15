import { NotificationsService } from 'src/notifications/notifications.service';
import { TrpcInitService } from '../trpc-init.service.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsTrpcRouter {
  constructor(
    private readonly trpcInitService: TrpcInitService,
    private readonly notificationsService: NotificationsService,
  ) {}

  notificationsRouter = this.trpcInitService.router({
    getNotifications: this.trpcInitService.authProcedure.query(({ ctx }) => {
      return this.notificationsService.getNotifications(ctx);
    }),

    getNotificationsCount: this.trpcInitService.authProcedure.query(
      ({ ctx }) => {
        return this.notificationsService.getNotificationsCount(ctx);
      },
    ),
  });
}
