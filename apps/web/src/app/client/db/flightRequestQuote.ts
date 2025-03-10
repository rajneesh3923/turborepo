import { z } from "zod";

export const flightRequestQuotationRow = z.object({
  id: z.string(),
  airline_name: z.string(),
  arrival_time: z.string(),
  departure_time: z.string(),
  flight_request_id: z.string(),
  fare: z.number(),
  user_id: z.string(),
});

export type FlightRequestQuotationRow = z.infer<
  typeof flightRequestQuotationRow
>;

const FlightRequestQuotationRowWithPagination = z.object({
  data: flightRequestQuotationRow.array(),
  count: z.number(),
});

export type FlightRequestQuotationRowWithPagination = z.infer<
  typeof FlightRequestQuotationRowWithPagination
>;


// export const  editFlightRequestQuotation =   flightRequestQuotationRow.omit({
//   user_id: true,
//   flight_request_id: true,
// })

// export type EditFlightRequestQuotation =  z.infer<typeof>

export const flightRequestQuoteBody = z.object({
  flight_request_id: z.string(),
  quotations: z.array(
    flightRequestQuotationRow.omit({
      user_id: true,
      id: true,
      flight_request_id: true,
    })
  ),
});

export type FlightRequestQuoteBody = z.infer<typeof flightRequestQuoteBody>;

export const updateFlightRequestQuotationBody =
  flightRequestQuotationRow.partial();

export type UpdateFlightRequestQuotationBody = z.infer<
  typeof updateFlightRequestQuotationBody
>;
