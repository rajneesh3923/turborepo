import { Injectable } from '@nestjs/common';
import { TrpcInitService } from '../trpc-init.service.js';
import {
  flightRequestQuotationBody,
  flightRequestQuotationUpdate,
} from 'src/flight-request-quotation/@types';
import z from 'zod';
import { FlightRequestQuotationService } from '../../flight-request-quotation/flight-request-quotation.service';
import { paginationParamsSchema } from 'types/pagination';

export const getQuotesByFlightRequestSchema = z.object({
  flightReqId: z.string(),
  paginationParams: paginationParamsSchema,
});

@Injectable()
export class FlightRequestQuotationTrpcRouter {
  constructor(
    private readonly trpcInitService: TrpcInitService,
    private flightRequestQuotationService: FlightRequestQuotationService,
  ) {}

  flightRequestQuotationRouter = this.trpcInitService.t.router({
    getQuotationsByFlightRequest: this.trpcInitService.authProcedure
      .input(getQuotesByFlightRequestSchema)
      .query(async ({ ctx, input }) => {
        return await this.flightRequestQuotationService.getQuotationsByFlightRequest(
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
