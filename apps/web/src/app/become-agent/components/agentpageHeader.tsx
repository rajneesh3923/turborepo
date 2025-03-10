import { Avatar, Box, Flex, Heading, HStack, Spacer, Text, VStack } from "@chakra-ui/react";

const AgentPageHeader = () => {
  return (
    <Box 
      as="header" 
      bg="primary.400" 
      px={8} 
      py={6} 
      color="white" 
      boxShadow="lg"
      borderBottom="1px solid" 
      borderColor="primary.700"
    >
      <Flex align="center">
        {/* Left Section: Agent's Info */}
        <HStack spacing={5}>
          <Avatar 
            name="Agent" 
            src="/path-to-avatar-image.jpg" 
            size="lg"
            borderColor="white"
            borderWidth={2}
            boxShadow="lg"
          />
          <VStack align="flex-start" spacing={1}>
            <Heading size="lg" fontWeight="bold">
              Agent Registration
            </Heading>
            <Text fontSize="md" color="primary.100">
              Become an Agent
            </Text>
          </VStack>
        </HStack>

        <Spacer />

        {/* Right Section: Add other elements here if needed */}
        
      </Flex>
    </Box>
  );
};

export default AgentPageHeader;
