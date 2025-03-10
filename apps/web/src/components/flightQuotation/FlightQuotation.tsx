import { Box } from "@chakra-ui/react";
import React from "react";
import FlightRequestCard from "../flighRequest/FlightRequestCard";

export default function FlighQuotation() {
  return (
    <Box>
      <FlightRequestCard showActionButtons={false} />
    </Box>
  );
}
