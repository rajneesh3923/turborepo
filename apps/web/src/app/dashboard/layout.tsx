import { Box, Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import DashboardHeader from "./components/DashboardHeader";
import DashboardMenu from "./components/Menu";
import { createClient } from "frontend/utils/supabase/server";
import { redirect } from "next/navigation";
import { Show } from "@chakra-ui/react";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  console.log("DASh user", data.user);

  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return (
    <Flex direction="row">
      <Show above="lg">
        <Box
          minW="16rem"
          borderRight="1px solid"
          borderColor="gray.200"
          pos="fixed"
          h="100vh"
          bg="white"
          zIndex={1000}
        >
          <DashboardMenu />
        </Box>
      </Show>

      <Box
        bg="purple.50"
        w="100%"
        minH="100vh"
        px={{ base: 2, lg: 10 }}
        ml={{ lg: "16rem" }}
      >
        <DashboardHeader user={data.user} />

        {children}
      </Box>
    </Flex>
  );
}
