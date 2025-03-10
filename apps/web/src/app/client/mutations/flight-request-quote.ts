import { createApiClient } from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";
import {
  FlightRequestQuoteBody,
  UpdateFlightRequestQuotationBody,
} from "../db/flightRequestQuote";
import { AxiosError } from "axios";

export function useCreateFlightRequestQuote() {
  const createFlightRequestQuote = async (body: FlightRequestQuoteBody) => {
    const apiClient = await createApiClient();

    return apiClient.post<FlightRequestQuoteBody>(
      "/flight-request-quote",
      body
    );
  };

  return useMutation<
    unknown,
    AxiosError<{ message: string }, unknown>,
    FlightRequestQuoteBody,
    unknown
  >({
    mutationFn: createFlightRequestQuote,
  });
}
export function useUpdateFlightRequestQuotation() {
  const updateFlightRequestQuotation = async (
    body: UpdateFlightRequestQuotationBody
  ) => {
    const apiClient = await createApiClient();

    return apiClient.put<UpdateFlightRequestQuotationBody>(
      `/flight-request-quote/${body.id}`,
      body
    );
  };

  return useMutation<
    unknown,
    AxiosError<{ message: string }, unknown>,
    UpdateFlightRequestQuotationBody,
    unknown
  >({
    mutationFn: updateFlightRequestQuotation,
  });
}
export function useDeleteFlightRequestQuotation() {
  const deleteFlightRequestQuotation = async (quotationId: string) => {
    const apiClient = await createApiClient();

    return apiClient.delete<string>(`/flight-request-quote/${quotationId}`);
  };

  return useMutation<
    unknown,
    AxiosError<{ message: string }, unknown>,
    string,
    unknown
  >({
    mutationFn: deleteFlightRequestQuotation,
  });
}
