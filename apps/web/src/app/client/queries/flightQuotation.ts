// app/client/queries/flightrequest.ts

import { createQueryKeys } from "@lukemorales/query-key-factory";
import { createApiClient } from "../../../utils/axios";
import { FlightRequestQuotationRow , FlightRequestQuotationRowWithPagination } from "../db/flightRequestQuote";

export const flightRequestQuotationQuery = createQueryKeys(
  "flight-quotations",
  {
    all: (flightReqId: string , page_size: number, page: number) => ({
      queryKey: ["flight-quotations", flightReqId , page_size, page],
      queryFn: async () => {
        const apiClient = await createApiClient();
        const data = await apiClient.get<FlightRequestQuotationRowWithPagination>(
          `/flight-request-quote/${flightReqId}?page=${page}&page_size=${page_size}`
        );

        return data;
      },
    }),

    //   single: (id: string) => ({
    //     queryKey: ["flight-request", id],
    //     queryFn: async () => {
    //       const apiClient = await createApiClient();
    //       const data = await apiClient.get<FlightRequestRow>(
    //         `/flight-request/${id}`
    //       );

    //       return data;
    //     },
    //   }),

    //  for mutation we don't need to create anything

    // create: {
    //   queryFn: async (data: FlightReqInputs) => {
    //     const apiClient = await createApiClient();
    //     const response = await apiClient.post("/flight-request", data);
    //     return response.data;
    //   },
    // },
  }
);
