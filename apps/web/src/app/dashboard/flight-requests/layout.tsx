import { Flex } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";

export default function FlightBookingRequestsPage({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Flex
      w="100%"
      className="animate__animated animate__fadeIn"
      direction={{ base: "column" }}
      pb={10}
    >
      <Box w="100%"> {children}</Box>
    </Flex>
  );
}
