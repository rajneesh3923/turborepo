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
  useToken,
  Text,
  Divider,
  FormLabel,
  FormControl,
  chakra,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "react-datepicker/dist/react-datepicker.css";
import { MdLocationOn } from "react-icons/md";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import {
  useCreateFlightRequestQuote,
  useDeleteFlightRequestQuotation,
  useUpdateFlightRequestQuotation,
} from "frontend/app/client/mutations/flight-request-quote";
import { useToast } from "@chakra-ui/react";
import {
  FlightRequestQuotationRow,
  flightRequestQuoteBody,
  updateFlightRequestQuotationBody,
} from "frontend/app/client/db/flightRequestQuote";
import { useQuery } from "@tanstack/react-query";
import { flightRequestQuery } from "frontend/app/client/queries/flightRequest";
import Error from "../common/Error";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";
const format = "HH:mm";
import "./page.css";
import { flightRequestQuotationQuery } from "frontend/app/client/queries/flightQuotation";
import FlightQuotationsList from "../flightQuotation/FlightQuotationsList";
import Loading from "../common/Loading";
import { User } from "@supabase/supabase-js";
import {
  createColumnHelper,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";

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

export default function FlightRequestQuotationForm({
  flightRequestId,
  user,
}: {
  flightRequestId: string;
  user: User | null;
}) {
  const [primary200, primary600] = useToken("colors", [
    "primary.200",
    "primary.600",
  ]);
  const toast = useToast();

  console.log("flight req id", flightRequestId);

  const searchParams = useSearchParams();

  const [showAddQuotationForm, setShowQuotationForm] = useState(false);
  const [editQuotation, setEditQuotation] =
    useState<FlightRequestQuotationRow | null>();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: searchParams.get("page")
      ? (searchParams.get("page") as unknown as number)
      : 0,
    pageSize: 10,
  });

  const {
    data: flightReq,
    isLoading,
    error,
    isError,
  } = useQuery({
    ...flightRequestQuery.single(flightRequestId),
    enabled: !!flightRequestId,
  });
  const {
    data: flightRequestQuotations,
    isLoading: flightReqQuotationLoading,
    error: flightReqQuotationError,
    isError: isFlightReqQuotationError,
    refetch,
  } = useQuery(flightRequestQuotationQuery.all(flightRequestId, 100, 1));

  console.log("flight QUotations", flightRequestQuotations);

  const createQuote = useCreateFlightRequestQuote();
  const updateQuotation = useUpdateFlightRequestQuotation();
  const deleteQuotation = useDeleteFlightRequestQuotation();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FlighRequestQuotationFormValues>({
    defaultValues: {
      quotations: [
        {
          airline_name: "",
          arrival_time: "18:26",
          departure_time: null,
          fare: 0,
        },
      ],
    },
    mode: "onChange",
    resolver: zodResolver(flightRequestQuotationSchema),
  });
  const { fields, remove, append } = useFieldArray({
    control,
    name: "quotations",
  });
  const CloseIcon = chakra(CircleX);

  const onQuotationSubmit = (data: FlighRequestQuotationFormValues) => {
    console.log("DATA", data);

    const body = {
      quotations: data.quotations,
      flight_request_id: flightRequestId,
    };

    if (!editQuotation) {
      const parsed = flightRequestQuoteBody.safeParse(body);

      if (parsed.error) {
        throw parsed.error;
      }

      createQuote.mutate(parsed.data, {
        onSuccess: () => {
          console.log("SUCCESS");
          toast({
            title: `Quotation has been sent to ${flightReq?.user.name}`,
            status: "success",
            position: "top-right",
          });
          refetch();
          setShowQuotationForm(false);
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
    } else {
      const parsed = updateFlightRequestQuotationBody.safeParse(
        data.quotations[0]
      );
      debugger;
      if (parsed.error) {
        throw parsed.error;
      }

      const updateData = { ...parsed.data, id: editQuotation.id };

      updateQuotation.mutate(updateData, {
        onSuccess: () => {
          console.log("SUCCESS");
          toast({
            title: `Quotation has been updated`,
            status: "success",
            position: "top-right",
          });
          refetch();
          setShowQuotationForm(false);
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
    }
  };

  useEffect(() => {
    if (editQuotation) {
      setValue("quotations.0.airline_name", editQuotation?.airline_name, {
        shouldValidate: true,
      });
      setValue("quotations.0.arrival_time", editQuotation?.arrival_time, {
        shouldValidate: true,
      });
      setValue("quotations.0.departure_time", editQuotation?.departure_time, {
        shouldValidate: true,
      });
      setValue("quotations.0.fare", editQuotation?.fare, {
        shouldValidate: true,
      });
    }
  }, [editQuotation, setValue]);

  const onQuotationEdit = (data: FlightRequestQuotationRow) => {
    setShowQuotationForm(true);
    setValue("quotations", [
      {
        airline_name: "",
        arrival_time: "",
        departure_time: "",
        fare: 0,
      },
    ]);
    setEditQuotation(data);
  };

  const onQuotationDelete = (quotationId: string) => {
    deleteQuotation.mutate(quotationId, {
      onSuccess: () => {
        refetch();
        toast({
          title: `Quotation has been deleted`,
          status: "success",
          position: "top-right",
        });
      },
    });
  };

  return (
    <Container maxW="full" h="100%">
      {isLoading && (
        <Flex h="100%" justifyContent="center" alignItems="center">
          <Spinner />
        </Flex>
      )}
      {isError && (
        <Flex h="100%" justifyContent="center" alignItems="center">
          <Error message={error.message} />
        </Flex>
      )}
      {flightReq && !error && (
        <Box mt={10} className="animate__animated animate__fadeIn">
          <Box
            gap={5}
            shadow="lg"
            py={5}
            px={4}
            border="5px solid"
            borderRadius={20}
            borderColor="primary.50"
          >
            <Flex gap={3} mb={2} borderRadius={10} py={2}>
              <Avatar
                borderRadius="full"
                width="2.5rem"
                height="2.5rem"
                name="Dan Abrahmov"
                src={flightReq.user.profilePicURL}
              />
              <Box>
                <Text fontWeight={600}>{flightReq?.user?.name}</Text>
                <Text fontWeight={600} fontSize={12} color="gray.500">
                  26
                </Text>
              </Box>
            </Flex>
            <Divider />
            <Box borderRadius={10} py={2} mt={2}>
              <Flex
                alignItems="center"
                justifyContent="start"
                gap={4}
                fontWeight={700}
                fontSize={17}
              >
                <Flex alignItems="center" gap={1}>
                  <MdLocationOn size={20} color={primary200} />
                  {flightReq?.departure_city}
                </Flex>{" "}
                <HiOutlineArrowLongRight
                  size={30}
                  fontWeight={800}
                  color={primary600}
                />{" "}
                <Flex alignItems="center" gap={1}>
                  <MdLocationOn size={20} color={primary200} />
                  {flightReq?.destination_city}
                </Flex>
              </Flex>
            </Box>
            <Box>
              <Flex alignItems="center" justifyContent="start" py={2}>
                <Box px={4}>
                  <Text fontWeight={400} color="gray.500" fontSize="sm">
                    Travel Date
                  </Text>
                  <Text color="gray.700" fontWeight={600} fontSize={16}>
                    4 April, 2025
                  </Text>
                </Box>
                <Box px={4}>
                  <Text fontWeight={400} color="gray.500" fontSize="sm">
                    Return Date
                  </Text>
                  <Text color="gray.700" fontWeight={600} fontSize={16}>
                    12 April, 2025
                  </Text>
                </Box>
                <Box px={4}>
                  <Text fontWeight={400} color="gray.500" fontSize="sm">
                    No. of Passengers
                  </Text>
                  <Text color="gray.700" fontWeight={600} fontSize={16}>
                    2
                  </Text>
                </Box>
              </Flex>
            </Box>
          </Box>
          {!showAddQuotationForm && (
            <Box>
              {flightReqQuotationLoading && <Loading />}

              {flightRequestQuotations && (
                <Box mt={8}>
                  <Flex justifyContent="space-between" mb={5}>
                    <Text as="h2" fontSize="2xl" fontWeight={700}>
                      Your Quotations
                    </Text>

                    <Button
                      onClick={() => {
                        setShowQuotationForm(true);
                        clearErrors();
                        setValue(
                          "quotations",
                          [
                            {
                              airline_name: "",
                              arrival_time: "",
                              departure_time: "",
                              fare: 0,
                            },
                          ],
                          { shouldValidate: true }
                        );
                      }}
                      fontWeight={600}
                      size="sm"
                      variant="solid"
                    >
                      Add Quotation
                    </Button>
                  </Flex>

                  {flightRequestQuotations &&
                    flightRequestQuotations.length <= 0 && (
                      <Flex
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        gap={5}
                        mt={10}
                      >
                        <Text textAlign="center" fontSize="3xl">
                          No quotations found
                        </Text>
                        <Button
                          onClick={() => {
                            setShowQuotationForm(true);
                          }}
                          fontWeight={600}
                          size="md"
                        >
                          Add Quotations
                        </Button>
                      </Flex>
                    )}
                  <FlightQuotationsList
                    data={flightRequestQuotations}
                    onQuotationEdit={onQuotationEdit}
                    onQuotationDelete={onQuotationDelete}
                  />
                </Box>
              )}
            </Box>
          )}

          {showAddQuotationForm && (
            <Box my={10}>
              <Flex justifyContent="space-between">
                <Text as="h2" fontSize="2xl" fontWeight={700}>
                  {editQuotation ? "Update quotation" : "Add quotations"}
                </Text>

                {!editQuotation && (
                  <Button
                    type="button"
                    onClick={() =>
                      append({
                        airline_name: "",
                        arrival_time: "",
                        departure_time: "",
                        fare: 0,
                      })
                    }
                    size="sm"
                  >
                    Add more quotations
                  </Button>
                )}
              </Flex>

              <Box
                mt={5}
                shadow="xl"
                borderRadius={10}
                bg="white"
                p={5}
                className="animate__animated animate__fadeIn"
              >
                <form onSubmit={handleSubmit(onQuotationSubmit)}>
                  <Box mt={5}>
                    {fields.map((field, index) => (
                      <Flex key={index} gap={4} alignItems="start">
                        {/* //TODO: Add select component for airlines */}
                        <Flex alignItems="center" width="full">
                          <CloseIcon
                            width={100}
                            onClick={() => {
                              if (index !== 0) {
                                remove(index);
                              } else {
                                toast({
                                  title: "Atleast 1 quotation is required",
                                  status: "error",
                                  position: "top-right",
                                });
                              }
                            }}
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
                          render={({
                            field: { onChange, onBlur, value, ref },
                          }) => {
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
                                    errors.quotations[index]["arrival_time"]
                                      ?.message}
                                </Text>
                              </FormControl>
                            );
                          }}
                        />
                        <Controller
                          control={control}
                          name={`quotations.${index}.departure_time`}
                          render={({
                            field: { onChange, onBlur, value, ref },
                          }) => {
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
                                    //   width: "100%",
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
                      onClick={() => {
                        setShowQuotationForm(false);
                        setEditQuotation(null);
                      }}
                    >
                      Cancel
                    </Button>

                    <Button
                      variant="solid"
                      size="sm"
                      type="submit"
                      textAlign="right"
                    >
                      {editQuotation ? "Update Quotation" : "Send Quotation"}
                    </Button>
                  </Flex>
                </form>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Container>
  );
}
