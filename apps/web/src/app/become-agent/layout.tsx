import { Box, Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { Show } from "@chakra-ui/react";
import AgentPageHeader from "./components/agentpageHeader";


export default function AgentLayout({ children }: { children: ReactNode }) {
  return (
    <Flex direction="row">
   
      {/* Main content area with relative positioning */}
      <Box
        
        w="full" // This takes all the remaining width
        minH="100vh"
        // px={{ base: 2, lg: 10 }}
        position="relative" // Relative positioning for flexibility
       
      >
        <AgentPageHeader />
        {children}
      </Box>
    </Flex>
  );
}
