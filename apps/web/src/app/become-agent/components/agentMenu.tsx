"use client";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { MdInfoOutline, MdVerified } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { AiOutlineCreditCard } from "react-icons/ai";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AgentMenu() {
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
      title: "General Info",
      icon: MdInfoOutline,
      path: "/dashboard",
      index: 0,
      onClick: () => router.push("/dashboard"),
    },
    {
      title: "Personal Info",
      icon: FaUser,
      index: 1,
      path: "/dashboard/flight-requests",
      onClick: () => router.push("/dashboard/flight-requests"),
    },
    {
      title: "Payment Info",
      icon: AiOutlineCreditCard,
      index: 2,
      path: "/dashboard/quotations",
      onClick: () => router.push("/dashboard/quotations"),
    },

    {
        title: "Verification Info",
        icon: MdVerified,
        index: 2,
        path: "/dashboard/quotations",
        onClick: () => router.push("/dashboard/quotations"),
      },
  ];

  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      py={10}
    >
      <Heading textAlign="center" as="h2" size="lg">
        Logo
      </Heading>

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
    </Flex>
  );
}

