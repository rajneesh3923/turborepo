import { z } from 'zod';

export enum FlightRequestClass {
  Economy = 'Economy',
  Business = 'Business',
}

export const FlightRequestClassEnum = z.enum(['Economy', 'Business']);

export const paginationParamsSchema = z.object({
  page_size: z.number(),
  page: z.number(),
});

export type PaginationParams = z.infer<typeof paginationParamsSchema>;

export const getflightRequestSchema = z.object({
  id: z.string(),
});

export const createFlightRequestSchema = z.object({
  departure_city: z.string(),
  destination_city: z.string(),
  return_date: z.string().optional(),
  num_passengers: z.number(),
  class_type: FlightRequestClassEnum,
  travel_date: z.string(),
  prefered_timing: z.string(),
  round_trip: z.boolean(),
});

export type CreateFlightRequestSchema = z.infer<
  typeof createFlightRequestSchema
>;

export const updateFlightRequestSchema = z.object({
  id: z.string(),
  flightRequest: createFlightRequestSchema.partial(),
});

export type UpdateFlightRequestSchema = z.infer<
  typeof updateFlightRequestSchema
>;

export const deleteFlightRequestSchema = z.object({
  id: z.string(),
});

export type DeleteFlightRequestSchema = z.infer<
  typeof deleteFlightRequestSchema
>;
