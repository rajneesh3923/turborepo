"use client";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { RxDashboard } from "react-icons/rx";
import { PiAirplaneTakeoffLight } from "react-icons/pi";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoLogOut, IoLogOutOutline } from "react-icons/io5";
import { createClient } from "frontend/utils/supabase/client";

export default function DashboardMenu() {
  const router = useRouter();
  const pathname = usePathname();

  const [currentIndex, setCurrIndex] = useState(0);

  useEffect(() => {
    if (pathname === "/dashboard") {
      setCurrIndex(0);
    }
    if (pathname === "/dashboard/flight-requests") {
      setCurrIndex(1);
    }
    if (pathname === "/dashboard/quotations") {
      setCurrIndex(2);
    }
  }, [pathname]);

  const menuList = [
    {
      title: "Dashboard",
      icon: RxDashboard,
      path: "/dashboard",
      index: 0,
      onClick: () => router.push("/dashboard"),
    },
    {
      title: "Flight Requests",
      icon: PiAirplaneTakeoffLight,
      index: 1,
      path: "/dashboard/flight-requests",
      onClick: () => router.push("/dashboard/flight-requests"),
    },
    {
      title: "Your Quotations",
      icon: PiAirplaneTakeoffLight,
      index: 2,
      path: "/dashboard/quotations",
      onClick: () => router.push("/dashboard/quotations"),
    },
  ];

  return (
    <Flex
      direction="column"
      alignItems="center"
      pos="relative"
      height="100%"
      py={10}
    >
      <Text textAlign="center" as="h2" fontSize="4xl" fontWeight={600}>
        Travelie
      </Text>

      <Box as="ul" mt={10}>
        {menuList.map((menu) => {
          return (
            <Flex
              key={menu.title}
              bg={currentIndex === menu.index ? "primary.100" : ""}
              mb={1}
              as="li"
              borderRadius={8}
              alignItems="start"
              gap={4}
              fontSize={15}
              pl={4}
              pr={14}
              py={3}
              sx={{
                transition: "all 200ms linear",
              }}
              fontWeight={currentIndex === menu.index ? 600 : 500}
              color={currentIndex === menu.index ? "primary.500" : "gray.600"}
              _hover={{
                bg: "primary.300",
                color: "white",
                cursor: "pointer",
                borderRadius: 8,
                transition: "background-color",
                animationDuration: "1s",
              }}
              onClick={menu.onClick}
            >
              <menu.icon size={20} />
              <Text>{menu.title}</Text>
            </Flex>
          );
        })}
      </Box>

      <Flex
        gap={4}
        alignItems="center"
        alignSelf="start"
        pos="absolute"
        bottom={30}
        px={8}
        py={4}
        w="full"
        _hover={{
          cursor: "pointer",
          bg: "red.100",
        }}
        onClick={async () => {
          const supabase = createClient();
          const res = await supabase.auth.signOut();

          if (!res.error) {
            location.href = location.host;
          }
          console.log("RES", res);
        }}
      >
        <IoLogOutOutline size={20} fontWeight={600} />{" "}
        <Text fontWeight={600}>Logout</Text>
      </Flex>
    </Flex>
  );
}
