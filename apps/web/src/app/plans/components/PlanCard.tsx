"use client";

import { Box, Button, Flex, Heading, Text, VStack, Stack, useColorModeValue } from "@chakra-ui/react";
import React from "react";

interface PlanCardProps {
  title: string;
  price: string;
  priceDescription: string;
  features: string[];
  buttonText: string;
  buttonColor: string;
  discount?: string;
  recommended?: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({
  title,
  price,
  priceDescription,
  features,
  buttonText,
  buttonColor,
  discount,
  recommended,
}) => (
  <VStack
    bg="white"
    p={6}
    borderRadius="lg"
    boxShadow="md"
    minW="sm"
    textAlign="center"
    borderColor={recommended ? "purple.500" : "gray.200"}
    borderWidth={recommended ? "2px" : "1px"}
  >
    {recommended && (
      <Text color="purple.500" fontWeight="bold" mb={2}>
        RECOMMENDED
      </Text>
    )}
    <Heading size="md" mb={2}>{title}</Heading>
    <Text fontSize="2xl" fontWeight="bold" mb={1}>{price}</Text>
    <Text fontSize="sm" color="gray.500" mb={4}>{priceDescription}</Text>
    {discount && (
      <Text color="green.500" fontWeight="bold" mb={4}>{discount}</Text>
    )}
    <VStack align="start" spacing={2} mb={4}>
      {features.map((feature, index) => (
        <Text key={index} fontSize="sm" color="gray.600">✓ {feature}</Text>
      ))}
    </VStack>
    <Button colorScheme={buttonColor} variant="solid" w="full">
      {buttonText}
    </Button>
  </VStack>
);

export default PlanCard;