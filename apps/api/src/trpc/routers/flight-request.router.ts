import { Injectable } from '@nestjs/common';
import { TrpcInitService } from '../trpc-init.service';
import { FlightRequestsService } from 'src/flight-requests/flight-requests.service';
import {
  createFlightRequestSchema,
  deleteFlightRequestSchema,
  paginationParamsSchema,
  updateFlightRequestSchema,
} from 'src/flight-requests/@types';
import { z } from 'zod';

@Injectable()
export class FlightRequestTrpcRouter {
  constructor(
    private readonly trpcInitService: TrpcInitService,
    private fightRequestSerice: FlightRequestsService,
  ) {}
  flightRequestRouter = this.trpcInitService.t.router({
    getAllFlightRequests: this.trpcInitService.authProcedure
      .input(paginationParamsSchema)
      .query(({ ctx, input }) => {
        return this.fightRequestSerice.getAllFlightRequests(ctx, input);
      }),

    getFlightRequestsWithQuotations: this.trpcInitService.authProcedure
      .input(paginationParamsSchema)
      .query(({ ctx, input }) => {
        return this.fightRequestSerice.getFlightRequestsWithQuotations(
          ctx,
          input,
        );
      }),

    getFlightRequestById: this.trpcInitService.authProcedure
      .input(
        z.object({
          id: z.string(),
        }),
      )
      .query(({ ctx, input }) => {
        return this.fightRequestSerice.getFlightRequestsById(input.id);
      }),

    createFlightRequest: this.trpcInitService.authProcedure
      .input(createFlightRequestSchema)
      .mutation(({ ctx, input }) => {
        return this.fightRequestSerice.createFlightRequest(ctx, input);
      }),

    updateFlightRequest: this.trpcInitService.authProcedure
      .input(updateFlightRequestSchema)
      .mutation(({ ctx, input }) => {
        return this.fightRequestSerice.updateFlightRequest(ctx, input);
      }),

    deleteFlightRequest: this.trpcInitService.authProcedure
      .input(deleteFlightRequestSchema)
      .mutation(({ ctx, input }) => {
        return this.fightRequestSerice.deleteFlightRequest(ctx, input);
      }),
  });
}
