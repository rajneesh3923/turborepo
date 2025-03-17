"use client";

import { z } from "zod";
import { TimePicker } from "antd";
import InputField from "frontend/components/forms/InputField";
import { CircleX } from "lucide-react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  useToken,
  Text,
  Divider,
  FormLabel,
  FormControl,
  chakra,
} from "@chakra-ui/react";
import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "react-datepicker/dist/react-datepicker.css";
import { MdLocationOn } from "react-icons/md";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import dayjs from "dayjs";
const format = "HH:mm";
// import "./page.css";
import { useCreateFlightRequestQuote } from "frontend/app/client/mutations/flight-request-quote";
import { useParams } from "next/navigation";
import { flightRequestQuoteBody } from "../../../client/db/flightRequestQuote";
import { useToast } from "@chakra-ui/react";

const flightRequestQuotationSchema = z.object({
  quotations: z.array(
    z.object({
      airline_name: z
        .string({ message: "Airline is required" })
        .refine((val) => !!val, { message: "Provide airline name" }),
      arrival_time: z
        .string({ message: "Arrival is required" })
        .nullable()
        .refine(
          (data) => {
            const regex = new RegExp(/^([01]\d|2[0-3]):?([0-5]\d)$/);
            if (regex.test(data as string) == true) return true;
          },
          { message: "Enter a valid time in 24 Hrs format" }
        ),

      departure_time: z
        .string({ message: "Departure is required" })
        .nullable()
        .refine(
          (data) => {
            const regex = new RegExp(/^([01]\d|2[0-3]):?([0-5]\d)$/);
            if (regex.test(data as string) == true) return true;
          },
          { message: "Enter a valid time in 24 Hrs format" }
        ),

      fare: z
        .number()
        .refine((val) => val > 1, { message: "Please enter a valid fare" }),
    })
  ),
});

type FlighRequestQuotationFormValues = z.infer<
  typeof flightRequestQuotationSchema
>;

export default function FlightRequestQuoteDropPage() {
  const [primary200] = useToken(
    // the key within the theme, in this case `theme.colors`
    "colors",
    // the subkey(s), resolving to `theme.colors.red.100`
    ["primary.200", "primary.300"]
  );
  const toast = useToast();
  const params = useParams<{ frId: string }>();

  const createQuote = useCreateFlightRequestQuote();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FlighRequestQuotationFormValues>({
    defaultValues: {
      quotations: [
        {
          airline_name: "",
          arrival_time: null,
          departure_time: null,
          fare: 0,
        },
      ],
    },
    mode: "onChange",
    resolver: zodResolver(flightRequestQuotationSchema),
  });
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "quotations", // unique name for your Field Array
  });

  const onQuotationSubmit = (data: FlighRequestQuotationFormValues) => {
    console.log("DATA", data);

    const body = {
      quotations: data.quotations,
      flight_request_id: params.frId,
    };

    const parsed = flightRequestQuoteBody.safeParse(body);

    if (parsed.error) {
      throw new Error("Invalid data");
    }

    createQuote.mutate(parsed.data, {
      onSuccess: () => {
        console.log("SUCCESS");
      },
      onError: (err) => {
        console.log("ERR", err.response?.data.message);
        toast({
          title: err.response?.data.message,
          status: "error",
          position: "top-right",
        });
      },
    });
  };

  const CloseIcon = chakra(CircleX);

  return (
    <Container maxW="5xl">
      <Heading textAlign="center">Provide Your Quotation</Heading>
      <Box mt={10}>
        <Box gap={5} shadow="xl" py={5}>
          <Flex gap={3} mb={2} borderRadius={10} px={4} py={2}>
            <Avatar
              borderRadius="full"
              width="2.5rem"
              height="2.5rem"
              name="Dan Abrahmov"
              src="https://bit.ly/ryan-florence"
            />
            <Box>
              <Text fontWeight={600}>Rajneeh Chaurasia</Text>
              <Text fontWeight={600} fontSize={12} color="gray.500">
                26
              </Text>
            </Box>
          </Flex>
          <Divider />
          <Box borderRadius={10} px={4} py={2} mt={2}>
            <Flex
              alignItems="center"
              justifyContent="center"
              gap={4}
              fontWeight={700}
              fontSize={17}
            >
              <Flex alignItems="center" gap={1}>
                <MdLocationOn size={20} color={primary200} />
                New Delhi
              </Flex>{" "}
              <HiOutlineArrowLongRight size={30} fontWeight={800} />{" "}
              <Flex alignItems="center" gap={1}>
                <MdLocationOn size={20} color={primary200} />
                Bangalore
              </Flex>
            </Flex>
          </Box>
          <Box px={8} mt={2}>
            <Flex
              bg="primary.50"
              borderRadius={10}
              alignItems="center"
              justifyContent="center"
              py={2}
              gap={8}
            >
              <Box px={4}>
                <Text fontWeight={600} color="gray.600" fontSize="sm">
                  Travel Date
                </Text>
                <Text color="gray.700" fontWeight={700} fontSize={25}>
                  4 April, 2025
                </Text>
              </Box>
              <Box px={4}>
                <Text fontWeight={600} color="gray.600" fontSize="sm">
                  Return Date
                </Text>
                <Text color="gray.700" fontWeight={700} fontSize={25}>
                  12 April, 2025
                </Text>
              </Box>
              <Box px={4}>
                <Text fontWeight={600} color="gray.600" fontSize="sm">
                  No. of Passengers
                </Text>
                <Text color="gray.700" fontWeight={700} fontSize={25}>
                  2
                </Text>
              </Box>
            </Flex>
          </Box>
        </Box>

        <Box mt={5} shadow="xl" borderRadius={10} bg="white" p={5}>
          <form onSubmit={handleSubmit(onQuotationSubmit)}>
            <Button
              variant="solid"
              size="sm"
              onClick={() =>
                append({
                  airline_name: "",
                  arrival_time: "",
                  departure_time: "",
                  fare: 5800,
                })
              }
            >
              Add Quotation
            </Button>
            <Box mt={5}>
              {fields.map((field, index) => (
                <Flex key={index} gap={4} alignItems="start">
                  {/* //TODO: Add select component for airlines */}
                  <Flex alignItems="center" width="full">
                    <CloseIcon
                      width={100}
                      onClick={() => remove(index)}
                      style={{
                        marginTop: index <= 0 ? 10 : -10,
                        cursor: "pointer",
                      }}
                      _hover={{
                        color: "red.300",
                      }}
                    />
                    <InputField
                      label={index > 0 ? "" : "Airline"}
                      size="sm"
                      type="text"
                      name={`quotations.${index}.airline_name`}
                      placeholder="Indigo, Air india, etc"
                      register={register}
                      labelStyles={{ fontSize: 14 }}
                      error={
                        errors?.quotations &&
                        errors.quotations[index] &&
                        errors.quotations[index]["airline_name"]
                      }
                    />
                  </Flex>

                  <Controller
                    control={control}
                    name={`quotations.${index}.arrival_time`}
                    render={({ field: { onChange, onBlur, value, ref } }) => {
                      console.log("VAL", value);
                      return (
                        <FormControl w="25rem">
                          {index <= 0 && (
                            <FormLabel
                              fontSize={14}
                              htmlFor={`quotations.${index}.arrival_time`}
                            >
                              Arrival
                            </FormLabel>
                          )}
                          <TimePicker
                            size="large"
                            style={{
                              width: "100%",
                              borderRadius: 10,
                              // marginTop: 5,
                            }}
                            defaultValue={dayjs("12:08", format)}
                            format={format}
                            onBlur={onBlur}
                            onChange={(value) => {
                              const time = value?.format("HH:mm");
                              onChange();
                              setValue(
                                `quotations.${index}.arrival_time`,
                                time,
                                {
                                  shouldValidate: true,
                                }
                              );
                            }}
                            value={value ? dayjs(value, format) : null}
                            ref={ref}
                            status={
                              errors?.quotations &&
                              errors.quotations[index] &&
                              errors.quotations[index]["arrival_time"]
                                ? "error"
                                : ""
                            }
                          />
                          <Text fontSize={13} color="red.400" mt={2}>
                            {errors?.quotations &&
                              errors.quotations[index] &&
                              errors.quotations[index]["arrival_time"]?.message}
                          </Text>
                        </FormControl>
                      );
                    }}
                  />
                  <Controller
                    control={control}
                    name={`quotations.${index}.departure_time`}
                    render={({ field: { onChange, onBlur, value, ref } }) => {
                      console.log("VAL", value);

                      return (
                        <FormControl w="25rem">
                          {index <= 0 && (
                            <FormLabel
                              fontSize={14}
                              htmlFor={`quotations.${index}.departure_time`}
                            >
                              Departure
                            </FormLabel>
                          )}
                          <TimePicker
                            size="large"
                            style={{
                              width: "100%",
                              borderRadius: 10,
                              // marginTop: 5,
                            }}
                            defaultValue={dayjs("12:08", format)}
                            format={format}
                            onBlur={onBlur}
                            onChange={(value) => {
                              const time = value?.format("HH:mm");
                              onChange();
                              setValue(
                                `quotations.${index}.departure_time`,
                                time,
                                {
                                  shouldValidate: true,
                                }
                              );
                            }}
                            value={value ? dayjs(value, format) : null}
                            ref={ref}
                            status={
                              errors?.quotations &&
                              errors.quotations[index] &&
                              errors.quotations[index]["departure_time"]
                                ? "error"
                                : ""
                            }
                          />
                          <Text fontSize={13} color="red.400" mt={2}>
                            {errors?.quotations &&
                              errors.quotations[index] &&
                              errors.quotations[index]["departure_time"]
                                ?.message}
                          </Text>
                        </FormControl>
                      );
                    }}
                  />
                  <InputField
                    label={index > 0 ? "" : "Fare"}
                    style={{ width: "10rem" }}
                    type="number"
                    size="sm"
                    name={`quotations.${index}.fare`}
                    placeholder="Enter your fare"
                    labelStyles={{ fontSize: 14 }}
                    register={register}
                    error={
                      errors?.quotations &&
                      errors.quotations[index] &&
                      errors.quotations[index]["fare"]
                    }
                  />
                </Flex>
              ))}
            </Box>

            <Flex gap={5} justifyContent="end" mt={10}>
              <Button
                variant="outline"
                size="sm"
                type="submit"
                textAlign="right"
              >
                Cancel
              </Button>

              <Button variant="solid" size="sm" type="submit" textAlign="right">
                Send Quotation
              </Button>
            </Flex>
          </form>
        </Box>
      </Box>
    </Container>
  );
}
