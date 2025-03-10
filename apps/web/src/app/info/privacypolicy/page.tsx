import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';

export default function PrivacyPolicy() {
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
        Privacy Policy
      </Heading>
      <Text mb={4}>
        At TravelEaseIn, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your information when you use our services.
      </Text>

      <VStack spacing={4}  align="start" mb={4}>
        <Box>
          <Heading as="h4" fontWeight={600} size="lg" mb={2}>
            Information We Collect
          </Heading>
          <Text>
            We collect personal information that you provide to us when you register on our site, place a booking request, or interact with our platform. This may include your name, email address, phone number, and any other information necessary to facilitate your booking.
          </Text>
        </Box>

        <Box>
          <Heading as="h4" fontWeight={600} size="lg" mb={2}>
            How We Use Your Information
          </Heading>
          <Text>
            We use the information we collect to:
            <ul>
              <li>Process and manage your booking requests.</li>
              <li>Communicate with you regarding your bookings.</li>
              <li>Improve our services and enhance your experience.</li>
              <li>Send you promotional offers and updates, if you have opted to receive them.</li>
            </ul>
          </Text>
        </Box>

        <Box>
          <Heading as="h4" fontWeight={600} size="lg" mb={2}>
            Information Sharing
          </Heading>
          <Text>
            We do not sell or rent your personal information to third parties. We may share your information with our partner agents to fulfill your booking requests. All partners are obligated to protect your information and use it solely for the purpose of providing services to you.
          </Text>
        </Box>

        <Box>
          <Heading as="h4" fontWeight={600} size="lg" mb={2}>
            Data Security
          </Heading>
          <Text>
            We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. While we strive to protect your information, no method of transmission over the internet or electronic storage is 100% secure.
          </Text>
        </Box>

        <Box>
          <Heading as="h4" fontWeight={600} size="lg" mb={2}>
            Changes to This Privacy Policy
          </Heading>
          <Text>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our website. We encourage you to review this Privacy Policy periodically for any changes.
          </Text>
        </Box>

        <Box>
          <Heading as="h4"  fontWeight={600} size="lg" mb={2}>
            Contact Us
          </Heading>
          <Text>
            If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at support@traveleasein.com.
          </Text>
        </Box>
      </VStack>

      <Text>
        By using our services, you consent to the collection and use of your information in accordance with this Privacy Policy.
      </Text>
    </VStack>
  );
}
