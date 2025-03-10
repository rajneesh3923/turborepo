"use client";

import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Text,
  useDisclosure,
  useToken,
} from "@chakra-ui/react";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { MdLocationOn } from "react-icons/md";
import CustomModal from "../common/Modal";
import FlighQuotation from "../flightQuotation/FlightQuotation";

import { usePathname, useRouter } from "next/navigation";
import { FlightRequestRow } from "@/app/client/db/flightRequest";
import dayjs from "dayjs";
import { userRole } from "@/app/client/db/user";

interface FlightRequestCardProps {
  showActionButtons?: boolean;
  data: FlightRequestRow;
}

export default function FlightRequestCard({
  showActionButtons = true,
  data: flightRequest,
}: FlightRequestCardProps) {
  const { isOpen, onClose } = useDisclosure();
  const router = useRouter();
  const pathname = usePathname();

  const [primary200] = useToken(
    // the key within the theme, in this case `theme.colors`
    "colors",
    // the subkey(s), resolving to `theme.colors.red.100`
    ["primary.200", "primary.300"]
  );

  const onCancelClick = () => {
    console.log("CANCEL");
  };

  const onQuoteClick = () => {
    console.log("QUOTE");
  };

  return (
    <Box shadow="xl" borderRadius={10} bg="white" py={3}>
      <Box gap={5}>
        <CustomModal
          isOpen={isOpen}
          onClose={onClose}
          cancelBtnText="Cancel"
          okBtnText="Quote"
          title="Provide your quotation for this flight request"
          onCancelBtnClick={onCancelClick}
          onOkBtnClick={onQuoteClick}
        >
          <FlighQuotation />
        </CustomModal>

        <Flex gap={3} mb={2} borderRadius={10} px={4} py={2}>
          <Avatar
            borderRadius="full"
            width={{ base: "2.2rem", md: "2.5rem" }}
            height={{ base: "2.2rem", md: "2.5rem" }}
            name="Dan Abrahmov"
            src="https://bit.ly/ryan-florence"
          />
          <Box>
            <Text fontSize={{ base: 14, md: 14 }} fontWeight={600}>
              Rajneeh Chaurasia
            </Text>
            <Text fontSize={{ base: 10 }} fontWeight={600} color="gray.500">
              26
            </Text>
          </Box>
        </Flex>
        <Divider />
        <Box borderRadius={10} px={2} mt={2}>
          <Flex
            alignItems="center"
            justifyContent="start"
            gap={4}
            fontWeight={700}
            fontSize={17}
          >
            <Flex alignItems="center" gap={1}>
              <MdLocationOn size={20} color={primary200} />
              <Text fontSize={{ base: 14, md: 16 }}>
                {" "}
                {flightRequest.departure_city}
              </Text>
            </Flex>{" "}
            <HiOutlineArrowLongRight size={30} fontWeight={800} />{" "}
            <Flex alignItems="center" gap={1}>
              <MdLocationOn size={20} color={primary200} />
              <Text fontSize={{ base: 14, md: 16 }}>
                {" "}
                {flightRequest.destination_city}
              </Text>
            </Flex>
          </Flex>
        </Box>
        <Box mt={2}>
          <Flex borderRadius={10} alignItems="center" py={2}>
            <Box px={4}>
              <Text fontSize={{ base: 12, md: "md" }} fontWeight={600}>
                Travel Date
              </Text>
              <Text fontSize={{ base: 14, md: "md" }} color="gray.500">
                {dayjs(flightRequest.travel_date).format("DD MMM, YYYY")}
              </Text>
            </Box>
            {flightRequest.return_date && (
              <Box px={4}>
                <Text fontSize={{ base: 12, md: "md" }} fontWeight={600}>
                  Return Date
                </Text>
                <Text fontSize={{ base: 14, md: "md" }} color="gray.500">
                  12 April, 2025
                </Text>
              </Box>
            )}
            <Box px={4}>
              <Text fontSize={{ base: 12, md: "md" }} fontWeight={600}>
                No. of Passengers
              </Text>
              <Text
                fontSize={{ base: 14, md: "md" }}
                color="gray.500"
                textAlign="center"
              >
                2
              </Text>
            </Box>
          </Flex>
        </Box>
        {showActionButtons && (
          <Flex justifyContent="end" px={4} mt={5}>
            <Flex gap={5}>
              <Button size="xs" variant="outline">
                Ignore
              </Button>
              {flightRequest.user?.role !== userRole.enum.Agent ? (
                <Button
                  size="xs"
                  variant="solid"
                  bg="primary.300"
                  onClick={() => {
                    // onOpen()
                    router.push(`${pathname}/${flightRequest.id}`);
                  }}
                >
                  Details
                </Button>
              ) : (
                <Button
                  size="xs"
                  variant="solid"
                  bg="primary.300"
                  onClick={() => {
                    // onOpen()
                    router.push(`${pathname}/${flightRequest.id}`);
                  }}
                >
                  Quote Now
                </Button>
              )}
            </Flex>
          </Flex>
        )}
      </Box>
    </Box>
  );
}
