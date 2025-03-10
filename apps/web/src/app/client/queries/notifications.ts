// app/client/queries/flightrequest.ts

import { createQueryKeys } from "@lukemorales/query-key-factory";
import {
  NotificationRow,
  NotificationRowsWithPagination,
} from "../db/notifications";
import { createApiClient } from "../../../utils/axios";

export const notificationsQuery = createQueryKeys("notifications", {
  all: (page_size: number, page: number) => ({
    queryKey: ["notifications", page_size, page],
    queryFn: async () => {
      const apiClient = await createApiClient();
      const data = await apiClient.get<NotificationRowsWithPagination>(
        `/notifications?page=${page}&page_size=${page_size}`
      );

      return data;
    },
  }),

  count: {
    queryKey: ["notifications", "count"],
    queryFn: async () => {
      const apiClient = await createApiClient();
      const data = await apiClient.get<number>(`/notifications/count`);

      return data;
    },
  },

  single: (id: string) => ({
    queryKey: ["notifications", id],
    queryFn: async () => {
      const apiClient = await createApiClient();
      const data = await apiClient.get<NotificationRow>(`/notifications/${id}`);

      return data;
    },
  }),
});
