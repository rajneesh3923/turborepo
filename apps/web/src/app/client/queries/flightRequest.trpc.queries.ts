import { trpc } from "@/utils/trpc";

export const useFlightRequests =
  trpc.flightRequests.getAllFlightRequests.useQuery;
export const useFlightRequestsWithQuotations =
  trpc.flightRequests.getFlightRequestsWithQuotations.useQuery;
export const useFlightRequestById =
  trpc.flightRequests.getFlightRequestById.useQuery;
