import { z } from "zod";
import { userRow } from "./user";

export const flightRequestClassType = z.enum(["Economy", "Business"]);

export const flightRequestStatusEnum = z.enum([
  "Available", // agent can send quotation
  "Unavailable", // when deleted or made unavialble by user
  "Accepted",
  "ApprovedByAgent",
  "DeniedByAgent",
  "Payment_Received",
  "Booking_Started",
  "Ticket_Approved",
  "Reported",
  "Booking_Completed",
  "",
]);

export type FlightRequestEnum = z.infer<typeof flightRequestStatusEnum>;

const flightRequestRow = z.object({
  id: z.string(),
  departure_city: z.string(),
  destination_city: z.string(),
  return_date: z.date(),
  class_type: flightRequestClassType,
  status: flightRequestStatusEnum,
  created_at: z.string(),
  updated_at: z.string(),
  user_id: z.string(),
  round_trip: z.boolean(),
  prefered_timing: z.string(),
  travel_date: z.date(),
  user: userRow,
});

export type FlightRequestRow = z.infer<typeof flightRequestRow>;

const flightRequestRowsWithPagination = z.object({
  data: flightRequestRow.array(),
  count: z.number(),
});

export type FlightRequestRowsWithPagination = z.infer<
  typeof flightRequestRowsWithPagination
>;
