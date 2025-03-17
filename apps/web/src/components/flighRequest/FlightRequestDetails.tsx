import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  Spinner,
  Tag,
  Text,
  useToken,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import React from "react";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { MdLocationOn } from "react-icons/md";
import Error from "../common/Error";
import { useFlightRequestById } from "frontend/app/client/queries";

export default function FlightRequestDetails({
  flightRequestId,
}: {
  flightRequestId: string;
}) {
  const { data, isLoading, error, isError } = useFlightRequestById(
    {
      id: flightRequestId,
    },
    { enabled: !!flightRequestId }
  );

  const [primary300] = useToken("colors", ["blue.300"]);

  if (isLoading && !data) {
    return (
      <Flex h="100%" justifyContent="center" alignItems="center">
        <Spinner />
      </Flex>
    );
  }
  if (isError) {
    return (
      <Flex h="100%" justifyContent="center" alignItems="center">
        <Error message={error.message} />
      </Flex>
    );
  }

  return (
    <Box p={5}>
      <Flex gap={8}>
        <Avatar
          size="2xl"
          name="Ryan Florence"
          src={data?.user.profilePicURL}
        />
        <Flex direction="column" justifyContent="center" gap={10}>
          <Box>
            <Text fontSize={24} fontWeight={600}>
              {data?.user?.name}
            </Text>
            <Flex>
              <Text>Message</Text>
            </Flex>
          </Box>
        </Flex>
      </Flex>

      <Box mt={10} bg="purple.50" p={10} borderRadius={10}>
        <Box>
          <Heading size="lg" fontWeight={600}>
            Flight Request Details
          </Heading>
          <Flex gap={2} mt={2} fontSize="md">
            <Text fontWeight={700} color="primary.400">
              Fligh Request Id
            </Text>{" "}
            : <Text fontWeight={500}>{data?.id}</Text>
          </Flex>
        </Box>
        <Divider my={5} />

        <Box w="100%">
          <Flex
            alignItems="center"
            justifyContent="start"
            gap={4}
            fontWeight={700}
            fontSize={17}
          >
            <Box>
              <Text fontSize={{ base: 12, md: "md" }} mb={2} fontWeight={700}>
                Deprature City
              </Text>
              <Flex alignItems="center" gap={1}>
                <MdLocationOn size={30} color={primary300} />
                <Text fontSize={{ base: 14, md: 20 }}>
                  {" "}
                  {data?.departure_city}
                </Text>
              </Flex>{" "}
            </Box>
            <HiOutlineArrowLongRight size={30} fontWeight={800} />{" "}
            <Box>
              <Text fontSize={{ base: 12, md: "md" }} mb={2} fontWeight={700}>
                Destination City
              </Text>
              <Flex alignItems="center" gap={1}>
                <MdLocationOn size={30} color={primary300} />
                <Text fontSize={{ base: 14, md: 20 }}>
                  {data?.destination_city}
                </Text>
              </Flex>
            </Box>
          </Flex>

          <Box mt={10}>
            <Flex
              borderRadius={10}
              alignItems="center"
              py={2}
              wrap="wrap"
              gap={12}
            >
              <Box>
                <Text fontSize={{ base: 12, md: "md" }} fontWeight={700}>
                  Travel Date
                </Text>
                <Text
                  fontWeight={600}
                  fontSize={{ base: 14, md: "md" }}
                  color="gray.700"
                >
                  {dayjs(data?.travel_date).format("DD MMM, YYYY")}
                </Text>
              </Box>
              {data?.return_date && (
                <Box>
                  <Text fontSize={{ base: 12, md: "md" }} fontWeight={700}>
                    Return Date
                  </Text>
                  <Text
                    fontWeight={600}
                    fontSize={{ base: 14, md: "md" }}
                    color="gray.700"
                  >
                    12 April, 2025
                  </Text>
                </Box>
              )}
              <Box>
                <Text fontSize={{ base: 12, md: "md" }} fontWeight={700}>
                  No. of Passengers
                </Text>
                <Text
                  fontWeight={600}
                  fontSize={{ base: 14, md: "md" }}
                  color="gray.700"
                >
                  2
                </Text>
              </Box>
              <Box>
                <Text fontSize={{ base: 12, md: "md" }} fontWeight={700}>
                  Class
                </Text>
                <Text
                  fontSize={{ base: 14, md: "md" }}
                  fontWeight={600}
                  color="gray.700"
                >
                  {data?.class_type}
                </Text>
              </Box>
              <Box>
                <Text fontSize={{ base: 12, md: "md" }} fontWeight={700}>
                  Return
                </Text>
                <Text
                  fontSize={{ base: 14, md: "md" }}
                  fontWeight={600}
                  color="gray.700"
                >
                  {data?.round_trip ? "Yes" : "No"}
                </Text>
              </Box>
              <Box>
                <Text fontSize={{ base: 12, md: "md" }} fontWeight={700}>
                  Prefered Timing
                </Text>
                <Text
                  fontSize={{ base: 14, md: "md" }}
                  fontWeight={600}
                  color="gray.700"
                >
                  {data?.prefered_timing ? data?.prefered_timing : "N/A"}
                </Text>
              </Box>
              <Box>
                <Text fontSize={{ base: 12, md: "md" }} fontWeight={700}>
                  Status
                </Text>

                <Tag
                  fontSize={{ base: 12, md: "sm" }}
                  size="md"
                  variant="solid"
                  bg="green.100"
                  color="green.500"
                  fontWeight={600}
                >
                  {data?.status}
                </Tag>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
