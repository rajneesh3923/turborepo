"use client";

import {
  Avatar,
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { IoSearch } from "react-icons/io5";
import ProfileModal from "../../../components/profile/profile";
import { useUser } from "frontend/app/hooks/useUser";
import Notifications from "./Notifications";
import { User } from "@supabase/supabase-js";

interface DashboardHeaderProps {
  user: User;
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  console.log("HEADER", user.user_metadata);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      py={8}
      px={10}
      ml="auto"
      justifyContent="space-between"
      width="100%"
      alignItems="center"
    >
      <Text textAlign="center" as="h2" fontSize="2xl" fontWeight={600}>
        Dashboard
      </Text>

      <Flex alignItems="center" gap={4}>
        <Stack spacing={4}>
          <InputGroup>
            <InputLeftElement pointerEvents="none" top={1}>
              <IoSearch color="gray" className="gray.300" />
            </InputLeftElement>
            <Input
              bg="gray.100"
              border="none"
              fontWeight={600}
              color="gray.700"
              py={6}
              borderRadius={10}
              type="tel"
              placeholder="Search anything"
              _placeholder={{
                fontWeight: 400,
              }}
              px={10}
            />
          </InputGroup>
        </Stack>

        <Notifications user={user} />

        <Flex cursor="pointer" gap={3} alignItems="center" onClick={onOpen}>
          <Avatar
            borderRadius={10}
            width="3rem"
            height="3rem"
            name={user?.user_metadata?.name || "User"}
            src={user?.user_metadata?.profilePicURL}
          />
          <Box>
            <Text fontWeight={600}>{user?.user_metadata?.name || "User"}</Text>
            <Text fontSize="sm" color="gray.500">
              {user?.user_metadata?.role}
            </Text>
          </Box>
          <ProfileModal isOpen={isOpen} onClose={onClose} user={user} />
        </Flex>
      </Flex>
    </Flex>
  );
}
