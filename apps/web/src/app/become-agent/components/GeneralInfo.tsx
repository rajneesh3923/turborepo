"use client";

import {
  Box,
  Button,
  VStack,
  Text,
  HStack,
  Avatar,
  FormControl,
  FormLabel,
  Divider,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { createClient } from "frontend/utils/supabase/client";
import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  UseFormRegister,
  FieldErrors,
  FieldError,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import InputField from "frontend/components/forms/InputField"; // Importing your custom InputField component

interface GeneralInfoProps {
  register: UseFormRegister<any>; // Specify the type based on your form data
  errors: FieldErrors<any>; // Specify the type based on your form data
  setValue: UseFormSetValue<any>; // To update the form state
  watch: UseFormWatch<any>; // For dynamic value watching
}

const GeneralInfo: React.FC<GeneralInfoProps> = ({
  register,
  errors,
  setValue,
  watch,
}) => {
  const [logo, setLogo] = useState<string | null>(null);
  const [logoPic, setLogoPic] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const email = watch("email"); // Dynamically watch the "email" field

  const supabase = createClient();

  const handleImageUpload = async () => {
    if (!logoPic) return;

    try {
      setUploading(true);

      const folderPath = `agent/${email}`;
      const filename = `${folderPath}/logo`;

      const { data, error } = await supabase.storage
        .from("profilebucket")
        .upload(filename, logoPic, { upsert: true });

      if (error) {
        throw error;
      }

      // Get the public URL of the uploaded image
      const publicURL = supabase.storage
        .from("profilebucket")
        .getPublicUrl(filename).data.publicUrl;
      setLogo(publicURL);
      setLogoPic(null);

      // Update the form's "logo" field with the URL
      setValue("logo", publicURL);

      console.log("Image uploaded successfully:", publicURL);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <VStack spacing={4} align="flex-start" width="100%">
      <Text
        as="h3"
        fontWeight="bold"
        fontSize="xl"
        mb={5}
        mt={4}
        color="gray.700"
      >
        General Information
      </Text>

      {/* Horizontal line */}
      <Divider borderColor="gray.300" mb="4px" />

      {/* Agent Name and Agency Name in one line */}
      <HStack spacing={4} width="100%">
        <Box width="100%" position="relative">
          <InputField
            label="Agent Name"
            name="agent_name"
            register={register}
            // error={errors.agent_name as FieldError | undefined} // Pass FieldError object for validation messages
            placeholder="Enter agent name"
          />

          {errors.agent_name && (
            <Text color="red.500" position="absolute" bottom="-15px" left="0">
              {errors?.agent_name?.message}
            </Text>
          )}
        </Box>

        <Box width="100%" position="relative">
          <InputField
            label="Agency Name"
            name="agency_name"
            register={register}
            // error={errors.agency_name as FieldError | undefined}
            placeholder="Enter agency name"
          />

          {errors.agency_name && (
            <Text color="red.500" position="absolute" bottom="-15px" left="0">
              {errors?.agency_name?.message}
            </Text>
          )}
        </Box>
      </HStack>

      {/* Phone Number and Email ID in one line */}
      <HStack spacing={4} width="100%">
        <Box width="100%" position="relative">
          <InputField
            label="Phone Number"
            name="phone_number"
            type="tel"
            register={register}
            // error={errors.phone_number as FieldError | undefined}
            placeholder="Enter phone number"
          />
          {errors.phone_number && (
            <Text color="red.500" position="absolute" bottom="-15px" left="0">
              {errors?.phone_number?.message}
            </Text>
          )}
        </Box>

        <Box width="100%" position="relative">
          <InputField
            label="Email ID"
            name="email"
            type="email"
            register={register}
            // error={errors.email as FieldError | undefined}
            placeholder="Enter email address"
          />
          {errors.email && (
            <Text color="red.500" position="absolute" bottom="-15px" left="0">
              {errors?.email?.message}
            </Text>
          )}
        </Box>
      </HStack>

      {/* Upload Logo */}
      <FormControl>
        <FormLabel htmlFor="logo">Upload Logo</FormLabel>
        <HStack spacing={4}>
          <Avatar size="lg" src={logo || ""} />
          <Input
            type="file"
            id="fileInput"
            name="logo"
            accept="image/*"
            onChange={(e) => setLogoPic(e.target.files?.[0] || null)}
            display="none" // Hide the default input
          />
          <IconButton
            as="label"
            htmlFor="fileInput" // Link the label to the hidden input
            icon={<EditIcon />} // Add the icon here
            size="sm"
            variant="outline"
            isLoading={uploading}
            isDisabled={uploading}
            aria-label="Choose file"
          />
          <Button
            size="sm"
            leftIcon={<CheckIcon />}
            variant="outline"
            isLoading={uploading}
            onClick={handleImageUpload}
            isDisabled={!logoPic || uploading}
          >
            {uploading ? "Uploading..." : "Upload Image"}
          </Button>
          <IconButton
            size="sm"
            icon={<DeleteIcon />}
            colorScheme="red"
            variant="outline"
            aria-label="Delete profile picture"
            onClick={() => setLogo(null)} // Reset the logo on delete
          />
        </HStack>
      </FormControl>
    </VStack>
  );
};

export default GeneralInfo;
