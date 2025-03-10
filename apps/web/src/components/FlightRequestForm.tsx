"use client";

import { z } from "zod";
import { Button, VStack, Text, HStack, Checkbox , Box} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import InputField from "../components/forms/InputField";
import SelectField from "../components/forms/SelectField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { createApiClient } from "../utils/axios";
import AirportAutocomplete from "@/components/flight/AirportAutocomplete";
import React, { useState , useEffect } from "react";
import dayjs from "dayjs";

// Define your Zod schema
const FlightRequestClassEnum = z.enum(["Economy", "Business"]);
const PreferedtimingEnum = z.enum([
  "Anytime",
  "Early Morning (6AM - 9AM) ",
  "Morning (9AM - 12PM) ",
  "Noon (12PM - 3PM)",
  "Evening (3PM - 7PM)",
  "Night (7PM - 12AM)",
  "Late Night (12AM - 6AM)",
]);

const flightReqSchema = z.object({
  departure_city: z
    .string({ message: "Departure city is required" })
    .min(3, "Departure city is invalid"),
  destination_city: z
    .string({ message: "Destination city is required" })
    .min(3, "Destination city is invalid"),
  travel_date: z.date(),
  num_passengers: z
    .number({ message: "Atleast 1 is required" })
    .min(1, "At least one passenger is required."),
  class_type: FlightRequestClassEnum,
  return_date: z.date().optional(),
  round_trip: z.boolean(),
  prefered_timing: PreferedtimingEnum.optional(),
});

type FlightRequestInput = z.infer<typeof flightReqSchema>;

const FlightRequestForm: React.FC<{  onloading: () => void; onSuccess: () => void; }> = ({ onloading , onSuccess }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FlightRequestInput>({
    defaultValues: {
      num_passengers: 1,
      round_trip: false,
    },
    resolver: zodResolver(flightReqSchema),
  });

  const fromStation = watch("departure_city");
  const toStation = watch("destination_city");
  const isRoundTrip = watch("round_trip");

  const today = new Date().toISOString().split("T")[0]; // Format date to YYYY-MM-DD

  // Set default values for travel and return dates
  const defaultTravelDate = today; // Default travel date as today
  const defaultReturnDate = isRoundTrip ? today : "";

  useEffect(() => {
    setValue("travel_date", defaultTravelDate);
    if (isRoundTrip) {
      setValue("return_date", defaultReturnDate);
    }
   
  
  }, [isRoundTrip, setValue]);

  // Mutation for submitting the form data
  const mutation = useMutation({
    mutationFn: async (data: FlightRequestInput) => {
      onloading(); // it will load sspiner
      const apiClient = await createApiClient();
      const response = await apiClient.post("/flight-request", data);
      return response.data;
    },
    onSuccess: () => {
      setTimeout(() => {
        onSuccess(); // Show success message after 5 seconds
      }, 3000);
      
    },
    onError: (error) => {
      console.error("Error submitting flight request:", error);
    },
  });

  const onSubmit: SubmitHandler<FlightRequestInput> = async (data) => {
    try {
      const date = dayjs(data.travel_date, "DD-MM-YYYY").toDate();
      data.travel_date = date;
      if (isRoundTrip) {
        const returndate = dayjs(data.return_date, "DD-MM-YYYY").toDate();
        data.return_date = returndate; // Set return date if round trip is true
      } else {
        delete data.return_date; // Remove return date if not a round trip
      }
      console.log("data", data);
      await mutation.mutateAsync(data); // Use mutateAsync for better error handling
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };



  return (
    <form id="flight-request-form" onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4} align="flex-start" width="100%">
        <Text as="h3" fontWeight={"bold"} fontSize="xl" mb={5} color="gray.700">
          Flight Request Form
        </Text>

        <HStack spacing={4} width="100%">
          {/* Departure City Autocomplete */}
          <Box width="100%" position="relative">
          <AirportAutocomplete
            label="Departure City"
            name="departure_city"
            value={fromStation || ""}
            onChange={(value: string) =>
              { setValue("departure_city", value , { shouldValidate: true })
                // clearErrors("departure_city");
              }
              }
            // error={errors.departure_city}
            disabledOption={toStation}
          />
           {errors.departure_city && (
           <Text color="red.500" position="absolute" bottom="-15px" left="0">
        {errors.departure_city.message}
           </Text>
          )}
         </Box>

          {/* Destination City Autocomplete */}
          <Box width="100%" position="relative">
          <AirportAutocomplete
            label="Destination City"
            name="destination_city"
            value={toStation || ""}
            onChange={(value: string) =>
              { setValue("destination_city", value  , { shouldValidate: true })
                // clearErrors("destination_city");
              }
              }
            // error={errors.destination_city}
            disabledOption={fromStation}
           
          />
           {errors.destination_city && (
          <Text color="red.500" position="absolute" bottom="-15px" left="0">
           {errors.destination_city.message}
         </Text>
         )}
          </Box>
        </HStack>
        {/* Return Date */}
        
        <InputField
          label="Travel Date"
          name="travel_date"
          type="date"
          register={register}
          error={errors.return_date} // Pass the entire FieldError object
        />
        

        {/* Round Trip Checkbox */}
        <HStack spacing={2} align="center">
          <Checkbox {...register("round_trip")}>Round Trip</Checkbox>
        </HStack>

        {/* Return Date - shown only if round trip is checked */}
        {isRoundTrip && (
          <InputField
            label="Return Date"
            name="return_date"
            type="date"
            register={register}
            error={errors.return_date} // Pass the entire FieldError object
          />
        )}

        <HStack spacing={4} mb="2rem" width="100%">
          {/* Number of Passengers */}
          <Box width="100%" position="relative">
          <InputField
            label="No. of Passengers"
            name="num_passengers"
            type="number"
            register={register}
           
          />
           {errors.num_passengers && (
           <Text color="red.500" position="absolute" bottom="-15px" left="0">
        {errors.num_passengers.message}
           </Text>
          )}
          </Box>

          {/* Class Type */}
          <SelectField
            label="Class Type"
            name="class_type"
            register={register}
            options={FlightRequestClassEnum.options}
            error={errors.class_type} // Pass the FieldError object
          />

          {/* preferred timing */}
          <SelectField
            label="Prefered Timing"
            name="prefered_timing"
            register={register}
            options={PreferedtimingEnum.options}
            error={errors.class_type} // Pass the FieldError object
          />
          
        </HStack>

        {/* Status */}

        {/* Show validation errors if any */}
        {/* {Object.keys(errors).length > 0 && (
          <Text color="red.500">Please fix the above errors</Text>
        )} */}
      </VStack>
    </form>
  );
};

export default FlightRequestForm;
