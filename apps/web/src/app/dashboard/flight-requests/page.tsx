"use client";

import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import FlightBookingRequestList from "./components/FlightBookingRequestList";
// import { FlightRequestRowsWithPagination } from "frontend/app/client/db/flightRequest";
// import { useFlightRequests } from "frontend/app/client/queries";
import { PaginationState } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import { useTRPC } from "../../../../utils/trpc";
import { useQuery } from "@tanstack/react-query";

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
    trpc.flightRequests.getAllFlightRequests.queryOptions({
      page: +pagination.pageIndex + 1,
      page_size: 10,
    })
  );
  console.log("FLight requests", queryRes);
  // const queryRes = useFlightRequests<FlightRequestRowsWithPagination>({
  // page: +pagination.pageIndex + 1,
  // page_size: 10,
  // });

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
      />
    </Box>
  );
}
