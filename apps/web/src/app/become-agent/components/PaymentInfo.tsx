import React from "react";
import {
  VStack,
  Select,
  FormControl,
  FormLabel,
  Box,
  Divider,
} from "@chakra-ui/react";
import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import InputField from "frontend/components/forms/InputField";

// Define the structure of the payment form values
interface PaymentFormValues {
  primary_payment: {
    option: "bank_transfer" | "upi";
    upi_id?: string | null;
    account_holder?: string | null;
    bank_account_number?: string | null;
    ifsc_code?: string | null;
  };
  secondary_payment: {
    option: "bank_transfer" | "upi";
    upi_id?: string | null;
    account_holder?: string | null;
    bank_account_number?: string | null;
    ifsc_code?: string | null;
  };
}

// Define the props for the PaymentInfo component
interface PaymentInfoProps {
  register: UseFormRegister<PaymentFormValues>; // Use PaymentFormValues for type safety
  errors: FieldErrors<PaymentFormValues>; // Use the correct error structure
  watch: UseFormWatch<PaymentFormValues>; // Use the correct watch type
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({
  register,
  errors,
  watch,
}) => {
  const secondaryPaymentOption = watch("secondary_payment.option");
  const primaryPaymentOption = watch("primary_payment.option");

  return (
    <VStack spacing={4} align="flex-start" width="100%">
      <Box
        as="h3"
        fontWeight="bold"
        fontSize="xl"
        mb={5}
        mt={4}
        color="gray.700"
      >
        Payment Information
      </Box>
      <Divider borderColor="gray.300" mb="4px" />

      {/* Primary Payment Option */}
      <FormControl isInvalid={!!errors.primary_payment?.option}>
        <FormLabel htmlFor="primary_payment_option">
          Primary Payment Option
        </FormLabel>
        <Select
          id="primary_payment_option"
          placeholder="Select primary payment option"
          {...register("primary_payment.option", {
            required: "Primary payment option is required",
          })}
        >
          <option value="bank_transfer">Bank Transfer</option>
          <option value="upi">UPI</option>
        </Select>
        {errors.primary_payment?.option && (
          <Box color="red.500" fontSize="sm">
            {errors.primary_payment.option.message}
          </Box>
        )}
      </FormControl>

      {/* Conditional Fields for Primary Payment Option */}
      {primaryPaymentOption === "upi" && (
        <InputField
          label="UPI ID"
          name="primary_payment.upi_id"
          register={register}
          error={errors.primary_payment?.upi_id} // Correct error access
          placeholder="Enter UPI ID"
        />
      )}

      {primaryPaymentOption === "bank_transfer" && (
        <>
          <InputField
            label="Account Holder Name"
            name="primary_payment.account_holder"
            register={register}
            error={errors.primary_payment?.account_holder} // Correct error access
            placeholder="Enter Full Name"
          />

          <InputField
            label="Bank Account Number"
            name="primary_payment.bank_account_number"
            register={register}
            error={errors.primary_payment?.bank_account_number} // Correct error access
            placeholder="Enter bank account number"
          />

          <InputField
            label="IFSC Code"
            name="primary_payment.ifsc_code"
            register={register}
            error={errors.primary_payment?.ifsc_code} // Correct error access
            placeholder="Enter IFSC code"
          />
        </>
      )}

      {/* Secondary Payment Option */}
      <FormControl isInvalid={!!errors.secondary_payment?.option}>
        <FormLabel htmlFor="secondary_payment_option">
          Secondary Payment Option
        </FormLabel>
        <Select
          id="secondary_payment_option"
          placeholder="Select secondary payment option"
          {...register("secondary_payment.option", {
            required: "Secondary payment option is required",
          })}
        >
          <option value="bank_transfer">Bank Transfer</option>
          <option value="upi">UPI</option>
        </Select>
        {errors.secondary_payment?.option && (
          <Box color="red.500" fontSize="sm">
            {errors.secondary_payment.option.message}
          </Box>
        )}
      </FormControl>

      {/* Conditional Fields for Secondary Payment Option */}
      {secondaryPaymentOption === "upi" && (
        <InputField
          label="Secondary UPI ID"
          name="secondary_payment.upi_id"
          register={register}
          error={errors.secondary_payment?.upi_id} // Correct error access
          placeholder="Enter secondary UPI ID"
        />
      )}

      {secondaryPaymentOption === "bank_transfer" && (
        <>
          <InputField
            label="Secondary Account Holder Name"
            name="secondary_payment.account_holder"
            register={register}
            error={errors.secondary_payment?.account_holder} // Correct error access
            placeholder="Enter Full Name"
          />

          <InputField
            label="Secondary Bank Account Number"
            name="secondary_payment.bank_account_number"
            register={register}
            error={errors.secondary_payment?.bank_account_number} // Correct error access
            placeholder="Enter secondary bank account number"
          />

          <InputField
            label="Secondary IFSC Code"
            name="secondary_payment.ifsc_code"
            register={register}
            error={errors.secondary_payment?.ifsc_code} // Correct error access
            placeholder="Enter secondary IFSC code"
          />
        </>
      )}
    </VStack>
  );
};

export default PaymentInfo;
