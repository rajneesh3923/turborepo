import React from 'react';
import {
  Box,
  Heading,
  Text,
  Link,
  VStack,
  HStack,
  Stack,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';

export default function ContactUs() {
  return (
    <VStack
    spacing={4}
    align="center"
    justify="center"
    minH="100vh"
    bg="white"
    w="full"
    mt={10}
  >
       <Heading as="h3" size="lg" fontWeight={600} textAlign="left" my={4}>
        Contact Us
      </Heading>
      <Text mb={4}>
        We’re here to help! If you have any questions, feedback, or need assistance with your travel plans, feel free to reach out to us. Our dedicated support team is ready to assist you and ensure your experience with TravelEaseIn is as smooth as possible.
      </Text>
      
      <Heading as="h4" size="lg" fontWeight={600} mb={3}>
        Get in Touch:
      </Heading>

      <VStack spacing={4} align="start">
        <Box>
          <FormLabel>Email:</FormLabel>
          <Text>support@traveleasein.com</Text>
          <Text mb={2}>
            For inquiries, support requests, or feedback, please send us an email, and we’ll get back to you as soon as possible.
          </Text>
        </Box>

        <Box>
          <FormLabel>Phone:</FormLabel>
          <Text>+1 (800) 123-4567</Text>
          <Text mb={2}>
            Prefer to speak with someone? Give us a call, and one of our team members will be happy to assist you.
          </Text>
        </Box>

        <Box>
          <FormLabel>Address:</FormLabel>
          <Text>
            TravelEaseIn
            <br />
            123 Travel Lane
            <br />
            City, State, ZIP Code
          </Text>
        </Box>

        <Box>
          <Heading as="h3" size="md" mb={2}>
            Follow Us on Social Media:
          </Heading>
          <Text mb={2}>
            Stay connected and get the latest updates, tips, and travel inspiration by following us on our social media channels:
          </Text>
          <HStack spacing={4}>
            <Link href="http://facebook.com/traveleasein" isExternal>
              Facebook
            </Link>
            <Link href="http://instagram.com/traveleasein" isExternal>
              Instagram
            </Link>
            <Link href="http://twitter.com/traveleasein" isExternal>
              Twitter
            </Link>
          </HStack>
        </Box>
      </VStack>

      <Text mt={5}>
        We value your feedback and are eager to hear from you. Whether you’re a seasoned traveler or planning your first trip, we’re here to assist you every step of the way!
      </Text>
    </VStack>
  );
}
