"use client";

import { Box, Button, Flex, Heading, Text, VStack, Stack, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import PlanCard from "./components/PlanCard";

export default function SubscriptionPlans() {
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const featureColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box p={8} bg={bgColor} minH="100vh"  >
      <Heading textAlign="center"  my={16}>Elevate Your Travel Booking Experience with Tailored Plans for Agents</Heading>
      
      <Flex justify="center" gap={6} wrap="wrap">
        {/* Lite Plan */}
        <PlanCard
          title="Lite"
          price="₹999"
          priceDescription="Per user / month, billed yearly"
          features={[
            "20 Flight Bookings Per Month",
            "10 Hotels Bookings Per Month",
            "5 Active Packages per month",
            "Unlimited Quotations on Flights",
            "100 Quotations on Hotels",
            "Real Time Notifications",
            "Max 1 booking assistant",
          ]}
          buttonText="Go Lite"
          buttonColor="green.400"
          discount="SAVE 50%"
        />

        {/* Pro Plan */}
        <PlanCard
          title="Pro"
          price="₹2999"
          priceDescription="Per user / month, billed yearly"
          features={[
            "100 Flight Bookings Per Month",
            "50 Hotels Bookings Per Month",
            "20 Active Packages per month",
            "Unlimited Quotations on Flights",
            "Unlimited Quotations on Hotels",
            "Real Time Notifications",
            "Max 5 booking assistant",
          ]}
          buttonText="Go Pro"
          buttonColor="purple.400"
          discount="SAVE 47%"
          recommended
        />

        {/* Enterprise Plan */}
        <PlanCard
          title="Enterprise"
          price="Let’s Talk"
          priceDescription="Custom Pricing"
          features={[
            "Unlimited Flight Bookings Per Month",
            "Unlimited Hotels Bookings Per Month",
            "500+ Active Packages per month",
            "Unlimited Quotations on Flights",
            "Unlimited Quotations on Hotels",
            "Real Time Notifications",
            "100+ booking assistant",
            "Advanced security controls",
            "Single sign-on",
            "Priority customer support",
            "Dedicated customer success",
          ]}
          buttonText="Talk to Sales"
          buttonColor="blue.400"
        />
      </Flex>

        {/* Single Booking Button */}
        <Flex justify="center" mt={8}>
        <Button bg="primary.400" textColor="white" size="lg">Try a Single Booking at ₹99</Button>
      </Flex>
    </Box>
  );
}


