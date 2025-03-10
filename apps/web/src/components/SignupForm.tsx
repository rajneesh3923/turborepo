// src/components/SignupForm.tsx
"use client";

import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import InputField from "./forms/InputField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

interface SignupFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

const signUpFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(16),
  confirmPassword: z.string().min(6).max(16),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // Set error path to `confirmPassword`
});

interface SignupFormProps {
  Signup : (formData : FormData ) => Promise<void>;
}

const SignupForm: React.FC<SignupFormProps> = ({Signup }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signUpFormSchema),
  });

  const onSubmit = async (data: SignupFormInputs) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    await Signup(formData); // call server action via the prop
  }

 

  return (
    <VStack
      spacing={4}
      align="center"
      justify="center"
      minH="100vh"
      bg="white67826782"
      w="full"
    >
      <Box bg="white" p={8} borderRadius="md" minW={{ base: "sm", md: "md" }}>
        <Heading as="h3" size="lg" fontWeight={600} textAlign="left" mb={2}>
          Create an Account
        </Heading>
        <Text textAlign="left" fontSize="14" color="gray.500" mb={6}>
          Please fill in the details to create your account.
        </Text>

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            register={register}
            error={errors.email}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            register={register}
            error={errors.password}
          />
          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            register={register}
            error={errors.confirmPassword}
          />
          <Button type="submit" variant="solid" w="full" mt={4}>
            Sign Up
          </Button>
        </form>
        <Text mt={8} fontSize={14} textAlign="center">
          Have an account?
          <ChakraLink
            as={Link}
            color="teal.500"
            href="/auth/login"
            textDecoration="underline"
            _hover={{ color: "primary.400" }}
            sx={{ color: "black", fontWeight: 700 }}
          >
            {" "}
            Log in
          </ChakraLink>
        </Text>
      </Box>
    </VStack>
  );
};

export default SignupForm;
