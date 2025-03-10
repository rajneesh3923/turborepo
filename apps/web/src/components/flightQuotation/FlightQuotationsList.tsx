import React from "react";
import { FlightRequestQuotationRow } from "../../app/client/db/flightRequestQuote";
import {
  Box,
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Tag,
  Text,
} from "@chakra-ui/react";
import { MdOutlineModeEdit, MdDeleteOutline } from "react-icons/md";
import "./popover.css";

interface FlightQuotationsListProps {
  data: FlightRequestQuotationRow[];
  onQuotationEdit: (data: FlightRequestQuotationRow) => void;
  onQuotationDelete: (quotationId: string) => void;
}

export default function FlightQuotationsList({
  data,
  onQuotationEdit,
  onQuotationDelete,
}: FlightQuotationsListProps) {
  return (
    <Box>
      {data.data.map((quotation) => {
        return (
          <Flex
            key={quotation.id}
            shadow="md"
            p={5}
            rounded={10}
            gap={10}
            mb={5}
          >
            <Flex direction="column" justifyContent="center">
              <Text fontWeight={600} fontSize={16}>
                Airline
              </Text>
              <Text fontSize={13} color="gray.500">
                {quotation.airline_name}
              </Text>
            </Flex>
            <Flex direction="column" justifyContent="center">
              <Text fontWeight={600} fontSize={15}>
                Arrival (24 Hrs)
              </Text>
              <Text fontSize={13} color="gray.500">
                {quotation.arrival_time}
              </Text>
            </Flex>
            <Flex direction="column" justifyContent="center">
              <Text fontWeight={600} fontSize={16}>
                Departure
              </Text>
              <Text fontSize={13} color="gray.500">
                {quotation.departure_time}
              </Text>
            </Flex>
            <Flex direction="column" justifyContent="center">
              <Text fontWeight={600} fontSize={16}>
                Fare
              </Text>
              <Text fontSize={13} color="gray.500">
                {quotation.fare}
              </Text>
            </Flex>
            <Flex direction="column" justifyContent="center">
              <Text fontWeight={600} fontSize={16}>
                Status
              </Text>

              <Tag bg="yellow.200" color="yellow.600" fontSize={12}>
                Pending
              </Tag>
            </Flex>
            <Flex justifyContent="center" alignItems="center" gap={4} ml="auto">
              <Button
                onClick={() => onQuotationEdit(quotation)}
                size="xs"
                leftIcon={<MdOutlineModeEdit size={18} />}
              >
                Edit
              </Button>

              <Popover>
                {({ onClose }) => {
                  return (
                    <>
                      <PopoverTrigger>
                        <Button
                          variant="solid"
                          size="xs"
                          bg="red.600"
                          _hover={{
                            bg: "red.400",
                            border: 0,
                            outlineWidth: 1,
                            outlineColor: "red.100",
                          }}
                          leftIcon={<MdDeleteOutline size={18} />}
                        >
                          Delete
                        </Button>
                      </PopoverTrigger>
                      <Portal>
                        <PopoverContent shadow="2xl">
                          <PopoverArrow />

                          {/* <PopoverCloseButton /> */}
                          <PopoverBody>
                            <Text>
                              Are you sure you want to delete this quotation
                            </Text>
                            <Flex gap={3} mt={5}>
                              <Button onClick={onClose} size="xs">
                                Cancel
                              </Button>
                              <Button
                                onClick={() => onQuotationDelete(quotation.id)}
                                size="xs"
                                variant="solid"
                                bg="red.600"
                              >
                                Delete
                              </Button>
                            </Flex>
                          </PopoverBody>
                        </PopoverContent>
                      </Portal>
                    </>
                  );
                }}
              </Popover>
            </Flex>
          </Flex>
        );
      })}
    </Box>
  );
}
