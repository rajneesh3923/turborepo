"use client";

import React, { useState, useEffect } from "react";
import {
  VStack,
  HStack,
  Button,
  Box,
  useColorModeValue,
  Flex,
  Text,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import GeneralInfo from "./components/GeneralInfo";
import PersonalInfo from "./components/PersonalInfo";
import PaymentInfo from "./components/PaymentInfo";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CheckIcon } from "@chakra-ui/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createApiClient } from "frontend/utils/axios";
import { useRouter } from "next/navigation";
import SuccessModal from "frontend/components/common/SuccessModal";

const GeneralInfoSchema = z.object({
  agent_name: z.string().min(1, "Agent Name is required"),
  phone_number: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9]+$/, "Phone number must only contain digits"),
  email: z.string().email("Invalid email address"),
  agency_name: z.string().min(1, "Agency Name is required"),
  logo: z.string().min(1, "Logo is required"),
});

const PersonalInfoSchema = z.object({
  aadhar_number: z
    .string()
    .min(12, "Aadhaar Card must be 12 digits")
    .max(12, "Aadhaar Card must be 12 digits")
    .regex(/^[0-9]+$/, "Aadhaar Card must only contain digits"),
  pan_number: z
    .string()
    .min(10, "PAN Number must be 10 characters")
    .max(10, "PAN Number must be 10 characters")
    .regex(
      /^[A-Z0-9]+$/,
      "PAN Number must contain uppercase letters and digits"
    ),
  address: z.string().min(1, "Address is required"),
  aadhar_image: z.string().min(1, "Aadhar image is required"),
  pan_image: z.string().min(1, "PAN image is required"),
  address_image: z.string().min(1, "Address image is required"),
});

const PaymentInfoSchema = z.object({
  primary_payment: z
    .object({
      option: z.enum(["bank_transfer", "upi"], {
        errorMap: () => ({ message: "Primary payment option is required" }),
      }),
      upi_id: z.string().optional(),
      account_holder: z.string().optional(),
      bank_account_number: z.string().optional(),
      ifsc_code: z.string().optional(),
    })
    .refine(
      (data) =>
        data.option === "upi"
          ? data.upi_id !== ""
          : data.account_holder && data.bank_account_number && data.ifsc_code,
      {
        message:
          "Complete primary payment information is required based on the selected option",
      }
    ),
  secondary_payment: z
    .object({
      option: z.enum(["bank_transfer", "upi"], {
        errorMap: () => ({ message: "Secondary payment option is required" }),
      }),
      upi_id: z.string().optional(),
      account_holder: z.string().optional(),
      bank_account_number: z.string().optional(),
      ifsc_code: z.string().optional(),
    })
    .refine(
      (data) =>
        data.option === "upi"
          ? data.upi_id !== ""
          : data.account_holder && data.bank_account_number && data.ifsc_code,
      {
        message:
          "Complete secondary payment information is required based on the selected option",
      }
    ),
});

const BecomeAgentSchema = z.object({
  ...GeneralInfoSchema.shape,
  ...PersonalInfoSchema.shape,
  ...PaymentInfoSchema.shape,
});

type BecomeAgentFormData = z.infer<typeof BecomeAgentSchema>;

export default function BecomeAgent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
    setValue,
  } = useForm<BecomeAgentFormData>({
    resolver: zodResolver(BecomeAgentSchema),
    defaultValues: {
      agent_name: "",
      phone_number: "",
      email: "",
      agency_name: "",
      aadhar_number: "",
      pan_number: "",
      address: "",
      primary_payment: {
        option: "bank_transfer",
        upi_id: "",
        account_holder: "",
        bank_account_number: "",
        ifsc_code: "",
      },
      secondary_payment: {
        option: "bank_transfer",
        upi_id: "",
        account_holder: "",
        bank_account_number: "",
        ifsc_code: "",
      },
    },
  });

  const router = useRouter();
  const [step, setStep] = useState(0); // Track the current step
  const [completedSteps, setCompletedSteps] = useState<number[]>([]); // Track completed steps
  const [isMounted, setIsMounted] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [AgentError, setAgentError] = useState<string | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);

    onClose();
  };

  useEffect(() => {
    // Mark the component as mounted
    setIsMounted(true);
  }, []);

  const validateStep = async () => {
    type BecomeAgentFields =
      | "agent_name"
      | "agency_name"
      | "email"
      | "phone_number"
      | "aadhar_number"
      | "pan_number"
      | "address"
      | "primary_payment"
      | "secondary_payment";

    let fieldsToValidate: BecomeAgentFields[] = [];

    if (step === 0) {
      fieldsToValidate = ["agent_name", "agency_name", "email", "phone_number"];
    } else if (step === 1) {
      fieldsToValidate = ["aadhar_number", "pan_number", "address"];
    } else if (step === 2) {
      fieldsToValidate = ["primary_payment", "secondary_payment"];
    }

    const isValid = await trigger(fieldsToValidate); // Validates current step's form fields
    return isValid;
  };

  const nextStep = async () => {
    const isStepValid = await validateStep();
    if (!isStepValid) return; // Stop progression if the current step is not valid

    if (step < steps.length - 1) {
      setCompletedSteps((prev) => [...prev, step]);
      setStep((prev) => prev + 1);
    } else {
      handleSubmit(onSubmit)(); // Submit the form if it's the final step
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 0)); // Decrement step
  };

  //  mutation for submitting the form data

  const mutation = useMutation({
    mutationFn: async (data: BecomeAgentFormData) => {
      const apiClient = await createApiClient();
      const response = await apiClient.post("/agent-registration", data);
      return response.data;
    },
    onSuccess: () => {
      setTimeout(() => {
        console.log("succeffully agent created"); // Show success message after 5 seconds
        setShowSuccessModal(true);
        // if (isMounted) {
        //   router.push('/');
        // }
      }, 3000);
    },
    onError: (error: any) => {
      console.error("Error submitting flight request:", error);
      // Handling different types of errors
      let errorMessage = "An unknown error occurred"; // Default error message

      if (error.response && error.response.data) {
        // If there's a response from the server with an error message
        errorMessage =
          error.response.data.message || "Error occurred during submission";
      } else if (error.message) {
        // If error has a message property
        errorMessage = error.message;
      }

      // Set the error message in state
      setAgentError(errorMessage);

      // if (isMounted) {
      //   router.push('/auth/login');
      // }
    },
  });

  const onSubmit = async (data: BecomeAgentFormData) => {
    try {
      console.log("Form submitted successfully:", data);
      await mutation.mutateAsync(data);
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  const steps = [
    { label: "General Information" },
    { label: "Personal Information" },
    { label: "Payment Information" },
  ];

  const stepperBgColor = useColorModeValue("gray.100", "gray.700");
  const buttonColorScheme = "teal";

  return (
    <Box
      minH="100vh"
      w={{ base: "70%", md: "50%" }}
      mx="auto"
      py={10}
      px={{ base: 4, md: 6 }}
    >
      <Heading mb={8} textAlign="center" size="lg">
        Become an Agent
      </Heading>
      <SuccessModal
        onClose={handleSuccessModalClose}
        isOpen={showSuccessModal}
      />

      {/* Stepper */}
      <Flex align="center" justify="center" mb={8}>
        {steps.map((stepItem, index) => (
          <React.Fragment key={index}>
            <Flex align="center">
              {/* Step icon: Number or CheckIcon */}
              <Box
                borderRadius="full"
                borderWidth={2}
                borderColor={
                  step === index || completedSteps.includes(index)
                    ? "teal.500"
                    : "gray.300"
                }
                bg={completedSteps.includes(index) ? "teal.500" : "white"}
                color={
                  completedSteps.includes(index)
                    ? "white"
                    : step === index
                      ? "teal.500"
                      : "gray.500"
                }
                w={8}
                h={8}
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontWeight="bold"
                mr={2}
              >
                {completedSteps.includes(index) ? <CheckIcon /> : index + 1}
              </Box>

              {/* Step label */}
              <Text
                fontSize="lg"
                fontWeight={step === index ? "bold" : "normal"}
                color={step === index ? "teal.500" : "gray.500"}
              >
                {stepItem.label}
              </Text>
            </Flex>

            {/* Render the horizontal line except after the last step */}
            {index < steps.length - 1 && (
              <Text mx={4} color="gray.500">
                ---
              </Text>
            )}
          </React.Fragment>
        ))}
      </Flex>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack
          border="2px solid"
          borderColor="gray.400"
          borderRadius="8px"
          p={6}
          spacing={6}
          width="100%"
        >
          {AgentError && (
            <Text color="red.500" mb={4}>
              {AgentError}
            </Text>
          )}

          {step === 0 && (
            <GeneralInfo
              register={register}
              watch={watch}
              setValue={setValue}
              errors={errors}
            />
          )}
          {step === 1 && (
            <PersonalInfo
              register={register}
              watch={watch}
              setValue={setValue}
              errors={errors}
            />
          )}
          {step === 2 && (
            <PaymentInfo register={register} watch={watch} errors={errors} />
          )}

          {/* Navigation Buttons */}
          <HStack justify="space-between" width="100%">
            <Button
              variant="outline"
              onClick={prevStep}
              isDisabled={step === 0}
            >
              Previous
            </Button>
            <Button colorScheme={buttonColorScheme} onClick={nextStep}>
              {step === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </HStack>
        </VStack>
      </form>
    </Box>
  );
}
