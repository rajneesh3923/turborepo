import { queryClient } from "frontend/utils/query";
import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { MdErrorOutline } from "react-icons/md";

export default function Error({ message }: { message: string }) {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      <MdErrorOutline color="red" size={50} />

      <Text fontSize={20}>{message}</Text>

      {/* //todo:implement refetch query */}
      <Button
        onClick={async () => {
          const res = await queryClient.refetchQueries({
            queryKey: ["flight-request"],
            type: "active",
          });

          console.log("RES", res);
        }}
      >
        Retry
      </Button>
    </Flex>
  );
}
