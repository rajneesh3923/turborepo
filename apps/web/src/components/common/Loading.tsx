import React from "react";
import { Flex, Spinner } from "@chakra-ui/react";

export default function Loading({ text }: { text?: string }) {
  return (
    <Flex width="100%">
      <Spinner size="xl" /> {text}
    </Flex>
  );
}
