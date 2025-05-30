"use client";

import { Box } from "@chakra-ui/react";

import React, { useState } from "react";
import FlightBookingRequestList from "../flight-requests/components/FlightBookingRequestList";
import { PaginationState } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "../../../../utils/trpc";

export default function FlightBookingRequestPage() {
  const searchParams = useSearchParams();
  const trpc = useTRPC();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: searchParams.get("page")
      ? (searchParams.get("page") as unknown as number)
      : 0,
    pageSize: 10,
  });

  const queryRes = useQuery(
    trpc.flightRequests.getFlightRequestsWithQuotations.queryOptions({
      page: +pagination.pageIndex + 1,
      page_size: pagination.pageSize,
    })
  );

  return (
    <Box
      minH="70vh"
      py={10}
      borderRadius={10}
      px={5}

      // bgGradient={[
      //   "linear(to-tr, teal.300, yellow.400)",
      //   "linear(to-t, blue.200, teal.500)",
      //   "linear(to-b, orange.100, purple.300)",
      // ]}
    >
      {/* <Box>Filters</Box> */}
      <FlightBookingRequestList
        {...queryRes}
        setPagination={setPagination}
        pagination={pagination}
        quotation={true}
      />
    </Box>
  );
}
