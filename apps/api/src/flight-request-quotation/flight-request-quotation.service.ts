import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { AuthContext } from 'src/trpc/context/interfaces';
import { paginate } from 'utils/paginate';
import {
  CreateFlightRequestQuotation,
  FlightRequestQuotationUpdate,
  GetQuotesByFlightRequestSchema,
} from './@types';

@Injectable()
export class FlightRequestQuotationService {
  constructor(private supabaseService: SupabaseService) {}

  async getQuotationsByFlightRequest(
    authCtx: AuthContext,
    input: GetQuotesByFlightRequestSchema,
  ) {
    const { flightReqId, paginationParams } = input;
    const { from } = paginate(paginationParams);

    const { data, error } = await this.supabaseService
      .createClient(authCtx.accessToken)
      .rpc('get_flight_request_quotations', {
        fr_id: flightReqId,
        p_limit: paginationParams.page_size,
        p_offset: from,
      });

    const count = await this.supabaseService
      .createClient(authCtx.accessToken)
      .from('flight_request_quotation')
      .select('*', { count: 'exact', head: true })
      .eq('flight_request_id', flightReqId);

    if (error) {
      throw new Error('Cannot get flight req quotations');
    }

    return { data, count: count.count };
  }

  async createFlightRequestQuotation(
    authCtx: AuthContext,
    input: CreateFlightRequestQuotation,
    //TODO:check for array of inputs
  ) {
    const { data: flightReq, error: flighReqError } = await this.supabaseService
      .createClient(authCtx.accessToken)
      .from('flight_requests')
      .select('*, user:users(email,id,name)')
      .eq('id', input[0].flight_request_id)
      .maybeSingle();

    if (flighReqError) {
      throw new Error('Flight Request not found');
    }

    //    const channel = ably.channels.get(
    //      `notifications:${flightReq?.user?.email}`,
    //    );

    console.log('USERdddaa', flightReq);

    const { data, error } = await this.supabaseService
      .createClient(authCtx.accessToken)
      .from('flight_request_quotation')
      .insert(input)
      .select();

    if (error) {
      console.log('Errrror', error);
      throw new Error('Quotation Request cannot be created');
    }

    // create notification

    const notification = {
      title: 'New quotation',
      body: `<p><b>${flightReq?.user?.name}</b> sent you <b>${input.length} quotation for your <b>${flightReq?.departure_city}</b> - <b>${flightReq?.destination_city}</b> flight request</b></p>`,
      user_id: flightReq?.user_id as string,
      type: 'NEW_QUOTATION',
      flight_request_id: flightReq?.id,
      from_user_id: authCtx.user.id,
    };

    const { error: notifiError } = await this.supabaseService
      .createClient(authCtx.accessToken)
      .from('notification')
      .insert(notification)
      .select();

    console.log('agent user id', flightReq?.user_id, notifiError);

    if (notifiError) {
      throw new Error('Notification cannot be created');
    }

    // const { data: count } = await supabase
    //   .from("flight_requests")
    //   .select("*", { count: "exact", head: true });

    //    await channel.publish('new-quotation', notification);

    return data;
  }

  async updateFlightRequestQuotation(
    authCtx: AuthContext,
    input: FlightRequestQuotationUpdate,
  ) {
    const { quotationId, updateBody } = input;

    const { data, error } = await this.supabaseService
      .createClient(authCtx.accessToken)
      .from('flight_request_quotation')
      .update(updateBody)
      .eq('id', input.quotationId)
      .select();

    console.log('BODY', quotationId, data);

    if (error) {
      throw new Error('Quotation update failed');
    }

    return data;
  }

  async deleteFlightRequestQuotation(
    authCtx: AuthContext,
    input: {quotationId: string}
  ) {
    const { data, error } = await this.supabaseService
      .createClient(authCtx.accessToken)
      .from('flight_request_quotation')
      .delete()
      .eq('id', input.quotationId)
      .select();

    if (error) {
      throw new Error('Quotation delete failed');
    }

    return data;
  }
}
