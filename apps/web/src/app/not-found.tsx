import Header from "frontend/components/Header";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import Image from "next/image";

export default function NotFound() {
  return (
    <Box>
      <Header />
      <Flex
        mt={40}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Image
          src="/404.jpg"
          width={800}
          height={700}
          alt="Picture of the author"
        />
        <Heading size="lg" color="primary.600">
          Oops, The page could not be found
        </Heading>

        <ChakraLink href="/">
          <Button size="lg" variant="solid" mt={10}>
            Back to Home
          </Button>
        </ChakraLink>
      </Flex>
    </Box>
  );
}
