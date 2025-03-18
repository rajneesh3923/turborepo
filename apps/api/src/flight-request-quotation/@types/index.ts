import z from 'zod';
import { paginationParamsSchema } from 'types/pagination';

export const getQuotesByFlightRequestSchema = z.object({
  flightReqId: z.string(),
  paginationParams: paginationParamsSchema,
});

export type GetQuotesByFlightRequestSchema = z.infer<
  typeof getQuotesByFlightRequestSchema
>;

export const flightRequestQuotationBody = z.object({
  airline_name: z.string(),
  arrival_time: z.string(),
  departure_time: z.string(),
  fare: z.number(),
  flight_request_id: z.string(),
  user_id: z.string(),
});

export type CreateFlightRequestQuotation = z.infer<
  typeof flightRequestQuotationBody
>;

export const flightRequestQuotationUpdate = z.object({
  updateBody: flightRequestQuotationBody.partial(),
  quotationId: z.string(),
});

export type FlightRequestQuotationUpdate = z.infer<
  typeof flightRequestQuotationUpdate
>;
