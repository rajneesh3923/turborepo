import { Box, Button, Flex, Heading, IconButton } from "@chakra-ui/react";
import React from "react";
import { MdOutlineRefresh } from "react-icons/md";

export default function NetworkError({
  Errmsg,
  reset,
}: {
  Errmsg: string;
  reset: () => void;
}) {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap={5}
      p={5}
      borderRadius="1rem"
    >
      <Heading variant="h3" size="md" fontWeight={500}>
        Oops, {Errmsg} occured :(
      </Heading>
      <Button
        onClick={reset}
        variant="solid"
        leftIcon={<MdOutlineRefresh size={20} />}
        aria-label={""}
      >
        Retry
      </Button>
    </Flex>
  );
}
