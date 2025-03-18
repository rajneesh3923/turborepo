import { Injectable } from '@nestjs/common';
import { UserRole } from '@repo/types';

import {
  CreateFlightRequestSchema,
  DeleteFlightRequestSchema,
  UpdateFlightRequestSchema,
} from './@types';
import { TRPCError } from '@trpc/server';
import { SupabaseService } from 'src/supabase/supabase.service';
import { AuthContext } from 'src/trpc/context/interfaces';
import { PaginationParams } from 'types/pagination';
import { paginate } from 'utils/paginate';

@Injectable()
export class FlightRequestsService {
  constructor(private supabaseService: SupabaseService) {}

  async getAllFlightRequests(
    authCtx: AuthContext,
    paginationParams: PaginationParams,
  ) {
    const { from, to } = paginate(paginationParams);

    const queryBuilder = this.supabaseService
      .createClient(authCtx.accessToken)
      .from('flight_requests')
      .select(
        `*,
          user:users(username, email,name,role , profilePicURL)
          `,
      )
      .range(from, to);

    if (authCtx.user.role === UserRole.AGENT) {
      const { count } = await this.supabaseService
        .createClient(authCtx.accessToken)
        .from('flight_requests')
        .select('*', { count: 'exact', head: true });

      const { data, error } = await queryBuilder;

      if (error) {
        throw new Error(error.message);
      }
      return { data, count };
    }

    if (authCtx.user.role === UserRole.USER) {
      const count = await this.supabaseService
        .createClient(authCtx.accessToken)
        .from('flight_requests')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', authCtx.user.id);

      const { data, error } = await queryBuilder.eq('user_id', authCtx.user.id);

      if (error) {
        throw new Error(error.message);
      }
      return { data, count: count.count };
    }
  }

  // New method to fetch flight requests with matching quotations for logged-in user
  async getFlightRequestsWithQuotations(
    authCtx: AuthContext,
    paginationParams: PaginationParams,
  ) {
    const { from, to } = paginate(paginationParams);

    // Query to get the count of all matching flight requests with quotations
    const { count, error: countError } = await this.supabaseService
      .createClient(authCtx.accessToken)
      .from('flight_requests')
      .select('id', { count: 'exact', head: true }) // 'id' is enough for counting
      .eq('flight_request_quotation.user_id', authCtx.user.id)
      .select('flight_request_quotation!inner(flight_request_id)');

    if (countError) {
      throw new Error(
        'Error counting flight requests with quotations: ' + countError.message,
      );
    }

    const { data, error } = await this.supabaseService
      .createClient(authCtx.accessToken)
      .from('flight_requests')
      .select(
        `
        *,
        user:users(username, email,name,role , profilePicURL),
        flight_request_quotation!inner(flight_request_id)
      `,
      )
      .eq('flight_request_quotation.user_id', authCtx.user.id)
      .range(from, to);

    console.log('data in quoteflight', data);

    if (error) {
      throw new Error(
        'Error fetching flight requests with quotations: ' + error.message,
      );
    }

    // Remove duplicates manually if necessary (Supabase doesn't support DISTINCT in JS query directly)
    // const uniqueFlightRequests = Array.from(
    //   new Set(data.map((item) => item.id)),
    // ).map((id) => data.find((item) => item.id === id));

    return { data, count: count ?? 0 };
  }

  async getFlightRequestsById(id: string) {
    const flightRequests = await this.supabaseService
      .createClient()
      .from('flight_requests')
      .select(
        `*,
      user:users(username, email,name,role ,profilePicURL)
      `,
      )
      .eq('id', id)
      .maybeSingle();

    return flightRequests.data;
  }

  async createFlightRequest(
    authCtx: AuthContext,
    createFlightRequestData: CreateFlightRequestSchema,
  ) {
    const createFlightRequestDataWithUserId = {
      ...createFlightRequestData,
      user_id: authCtx.user.id,
    };
    const { data, error } = await this.supabaseService
      .createClient(authCtx.accessToken)
      .from('flight_requests')
      .insert(createFlightRequestDataWithUserId)
      .select();

    if (error) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Flight Request cannot be created',
      });
    }

    return data;
  }

  updateFlightRequest = async (
    authCtx: AuthContext,
    updateFlightRequestData: UpdateFlightRequestSchema,
  ) => {
    const { flightRequest, id } = updateFlightRequestData;

    const { data, error } = await this.supabaseService
      .createClient(authCtx.accessToken)
      .from('flight_requests')
      .update(flightRequest)
      .eq('user_id', authCtx.user.id)
      .eq('id', id)
      .select();

    if (error) {
      throw new Error('Flight Request cannot be created');
    }

    return data;
  };

  deleteFlightRequest = async (
    authCtx: AuthContext,
    deleteFlightRequestData: DeleteFlightRequestSchema,
  ) => {
    const { data, error } = await this.supabaseService
      .createClient(authCtx.accessToken)
      .from('flight_requests')
      .delete()
      .eq('id', deleteFlightRequestData.id)
      .eq('user_id', authCtx.user.id);

    if (error) {
      throw new Error('Flight Request cannot be created');
    }

    return data;
  };
}
