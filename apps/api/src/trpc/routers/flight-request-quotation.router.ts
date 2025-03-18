import { Injectable } from '@nestjs/common';
import { TrpcInitService } from '../trpc-init.service';

import { FlightRequestQuotationService } from 'src/flight-request-quotation/flight-request-quotation.service';
import {
  flightRequestQuotationBody,
  flightRequestQuotationUpdate,
  getQuotesByFlightRequestSchema,
} from 'src/flight-request-quotation/@types';
import z from 'zod';

@Injectable()
export class FlightRequestTrpcRouter {
  constructor(
    private readonly trpcInitService: TrpcInitService,
    private flightRequestQuotationService: FlightRequestQuotationService,
  ) {}

  flightRequestQuotationRouter = this.trpcInitService.t.router({
    getQuotationsByFlightRequest: this.trpcInitService.authProcedure
      .input(getQuotesByFlightRequestSchema)
      .query(({ ctx, input }) => {
        return this.flightRequestQuotationService.getQuotationsByFlightRequest(
          ctx,
          input,
        );
      }),
    createFlightRequestQuotation: this.trpcInitService.authProcedure
      .input(flightRequestQuotationBody)
      .mutation(({ ctx, input }) => {
        return this.flightRequestQuotationService.createFlightRequestQuotation(
          ctx,
          input,
        );
      }),
    updateFlightRequestQuotation: this.trpcInitService.authProcedure
      .input(flightRequestQuotationUpdate)
      .mutation(({ ctx, input }) => {
        return this.flightRequestQuotationService.updateFlightRequestQuotation(
          ctx,
          input,
        );
      }),
    deleteFlightRequestQuotation: this.trpcInitService.authProcedure
      .input(
        z.object({
          quotationId: z.string(),
        }),
      )
      .mutation(({ ctx, input }) => {
        return this.flightRequestQuotationService.deleteFlightRequestQuotation(
          ctx,
          input,
        );
      }),
  });
}
