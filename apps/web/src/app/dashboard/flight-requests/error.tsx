"use client"; // Error boundaries must be Client Components

import NetworkError from "frontend/components/common/NetworkError";
import { Box, Flex } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string } & AxiosError;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Flex h="70vh" justifyContent="center" alignItems="center">
      <NetworkError Errmsg={error.message} reset={reset} />
    </Flex>
  );
}
