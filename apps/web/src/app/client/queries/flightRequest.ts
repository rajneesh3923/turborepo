// app/client/queries/flightrequest.ts

import { createQueryKeys } from "@lukemorales/query-key-factory";
import { createApiClient } from "../../../utils/axios";
import {
  FlightRequestRow,
  FlightRequestRowsWithPagination,
} from "../db/flightRequest";
import { trpc } from "@/utils/trpc";

export const flightRequestQuery = createQueryKeys("flight-requests", {
  all: (page_size: number, page: number) => ({
    queryKey: ["flight-requests", page_size, page],
    queryFn: async () => {
      // const router = appRou

      // const apiClient = await createApiClient();
      // const data = await apiClient.get<FlightRequestRowsWithPagination>(
      //   `/flight-request?page=${page}&page_size=${page_size}`
      // );

      return await trpc.flightRequests.getAllFlightRequests.query(
        {
          page,
          page_size,
        },
        { context: {} }
      );
    },
  }),

  single: (id: string) => ({
    queryKey: ["flight-request", id],
    queryFn: async () => {
      const apiClient = await createApiClient();
      const data = await apiClient.get<FlightRequestRow>(
        `/flight-request/${id}`
      );

      return data;
    },
  }),

  // New query for fetching flight requests with quotations for the logged-in user
  withQuotations: (page_size: number, page: number) => ({
    queryKey: ["flight-requests-with-quotations", page_size, page],
    queryFn: async () => {
      const apiClient = await createApiClient();
      const data = await apiClient.get<FlightRequestRowsWithPagination>(
        `/flight-request/with-quotations?page=${page}&page_size=${page_size}`
      );

      return data;
    },
  }),
});
