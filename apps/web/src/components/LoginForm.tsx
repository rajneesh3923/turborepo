"use client";

import { z } from "zod";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Link as ChakraLink,
  Flex,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "./forms/InputField";
import Link from "next/link";
import { useRouter  } from "next/navigation";
import { useState } from "react";

interface LoginFormInputs {
  email: string;
  password: string;
}

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

interface LoginFormProps {
  login: (formData: FormData) => Promise<{ error?: string }>;
}

const LoginForm: React.FC<LoginFormProps> = ({ login }) => {
  
  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    
   
  const response =  await login(formData); // Call server action via the prop
    
  // console.log( "Resss" , response)
  if (response &&  response?.error) {
    setLoginError(response?.error); // Set the error if login fails
  }else {
    router.push('/dashboard'); // Navigate to dashboard if successful
  }
    
   
  };

  return (
    <VStack
      spacing={4}
      align="center"
      justify="center"
      minH="100vh"
      bg="white"
      w="full"
    >
      <Box bg="white" p={12} borderRadius="md" minW={{ base: "sm", md: "md" }}>
        <Heading as="h3" size="lg" fontWeight={600} textAlign="left" mb={2}>
          Welcome Back
        </Heading>
        <Text textAlign="left" fontSize="14" color="gray.500" mb={6}>
          Welcome back! Please enter your details.
        </Text>

        {loginError && (
          <Text color="red.500" mb={4}>
            {loginError}
          </Text>
        )}

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
          <Flex justifyContent="end">
            <ChakraLink
              href="/"
              color="primary.400"
              my={2}
              textAlign="right"
              fontSize="sm"
            >
              Forgot password?
            </ChakraLink>
          </Flex>
          <Button type="submit" variant="solid" w="full" mt={4}>
            Login
          </Button>
        </form>
        <Text mt={8} fontSize={14} textAlign="center">
          Don`&apos;t have an account?
          <ChakraLink
            as={Link}
            color="teal.500"
            href="/auth/signup"
            textDecoration="underline"
            _hover={{ color: "primary.400" }}
            sx={{ color: "black", fontWeight: 700 }}
          >
            {" "}
            Sign up for free
          </ChakraLink>
        </Text>
      </Box>
    </VStack>
  );
};

export default LoginForm;
