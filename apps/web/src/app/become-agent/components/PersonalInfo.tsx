"use client";

import { Box, Button, VStack, Text, HStack, Avatar, FormControl, FormLabel, Divider , IconButton , Input, Image  , useToast} from "@chakra-ui/react";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { UseFormRegister, FieldErrors, FieldError } from "react-hook-form";
import InputField from "@/components/forms/InputField";  // Importing your custom InputField component

interface PersonalInfoProps {
  register: UseFormRegister<any>;  // Specify the type based on your form data
  errors: FieldErrors<any>;        // Specify the type based on your form data
  setValue: UseFormSetValue<any>; // To update the form state
  watch: UseFormWatch<any>; // For dynamic value watching
}


const PersonalInfo: React.FC<PersonalInfoProps> = ({ register, errors , setValue , watch }) => {
  
  //  file strings
  const [aadharFile, setAadharFile] = useState<string | null>(null);
  const [panFile, setPanFile] = useState<string | null>(null);
  const [addressFile, setAddressFile] = useState<string | null>(null);

  //  file states

  const [AadharPic , setAadharPic ] = useState<File | null>(null);
  const [PanPic , setPanPic] = useState<File | null>(null);
  const [addressPic , setAddressPic] = useState<File | null>(null);

  const [uploading, setUploading] = useState({
    aadhar: false,
    pan: false,
    address: false,
  });
  
  const toast = useToast();

  const email = watch("email");
  
  const supabase = createClient();
   
  
  // Dynamic file upload handler for Aadhaar, PAN, and address files
const handleFileUpload = async ({ type }: { type: "aadhar" | "pan" | "address" }) => {
  try {
    setUploading((prev) => ({ ...prev, [type]: true }));
    let selectedFile: File | null;
    let folderPath: string;
    let fileName: string;
    let setFileURL: React.Dispatch<React.SetStateAction<string | null>>;

    // Determine which file is being uploaded based on 'type'
    if (type === "aadhar") {
      if (!AadharPic) return;
      selectedFile = AadharPic;
      fileName = "aadhar";
      
      setFileURL = setAadharFile;
    } else if (type === "pan") {
      if (!PanPic) return;
      selectedFile = PanPic;
      fileName = "pan";
      
      setFileURL = setPanFile;
    } else if (type === "address") {
      if (!addressPic) return;
      selectedFile = addressPic;
      fileName = "address";
      
      setFileURL = setAddressFile;
    } else {
      throw new Error("Invalid file type");
    }

    // Define the folder path using the dynamic email
    folderPath = `agent/${email}/${fileName}`;

    // Upload the file to Supabase
    const { data, error } = await supabase.storage
      .from("profilebucket") // Ensure this bucket exists in your Supabase project
      .upload(folderPath, selectedFile, { upsert: true });

    if (error) {
      throw error;
    }

    // Get the public URL of the uploaded file
    const publicURL = supabase.storage
      .from("profilebucket")
      .getPublicUrl(folderPath).data.publicUrl;

    // Update the corresponding file state with the URL
    setFileURL(publicURL);
    

    toast({
      title: `${type.toUpperCase()} uploaded successfully!`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    // Reset the file input after successful upload and setvalues 
    if (type === "aadhar") {
      setValue( "aadhar_image" , publicURL);
      setAadharPic(null);
       }
    if (type === "pan") {
      setValue( "pan_image" , publicURL);
      setPanPic(null)
    };
    if (type === "address"){
      setValue( "address_image" , publicURL);
      setAddressPic(null);
    }
    console.log(`${type.toUpperCase()} uploaded successfully:`, publicURL);
  } catch (error) {
    console.error(`Error uploading ${type}:`, error);
    toast({
      title: `Failed to upload ${type}.`,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  } finally {
    setUploading((prev) => ({ ...prev, [type]: false }));
  }
};



  return (
    <VStack spacing={4} align="flex-start" width="100%">
      <Text as="h3" fontWeight="bold" fontSize="xl" mb={5} mt={4} color="gray.700">
        Personal Information
      </Text>
      {/* Horizontal line */}
  <Divider borderColor="gray.300" mb="4px" />

      {/* Aadhaar Card Number and PAN Number in one line */}
      <HStack spacing={4} width="100%">
  <Box width="100%" position="relative">
    <InputField
      label="Aadhaar Card Number"
      name="aadhar_number"
      register={register}
      placeholder="Enter Aadhaar card number"
    />
    {errors.aadhar_number && (
      <Text color="red.500" position="absolute" bottom="-15px" left="0">
        {errors?.aadhar_number?.message}
      </Text>
    )}
  </Box>

  <Box width="100%" position="relative">
    <InputField
      label="PAN Number"
      name="pan_number"
      register={register}
      placeholder="Enter PAN number"
    />
    {errors.pan_number && (
      <Text color="red.500" position="absolute" bottom="-15px" left="0">
        {errors?.pan_number?.message}
      </Text>
    )}
  </Box>
</HStack>

      {/* Address */}
      <Box width="100%" position="relative">
  <InputField
    label="Address"
    name="address"
    register={register}
    placeholder="Enter address"
  />
  {errors.address && (
    <Text color="red.500" position="absolute" bottom="-15px" left="0">
      {errors?.address?.message}
    </Text>
  )}
</Box>

      {/* File Uploads for Aadhaar, PAN, and Address Proof */}
   
      <FormControl>
  <FormLabel htmlFor="aadhar_file">Upload Aadhaar Card</FormLabel>
  <HStack spacing={4} alignItems="center" justifyContent="space-between">
    <HStack spacing={4} alignItems="center">
      <Input
        type="file"
        id="aadhar_file"
        name="aadhar_image"
        accept="image/*"
        onChange={(e) => setAadharPic(e.target.files?.[0] || null)}
        display="none" // Hide the default input
      />
      <IconButton
        as="label"
        htmlFor="aadhar_file" // Link the label to the hidden input
        icon={<EditIcon />}
        size="sm"
        variant="outline"
        isLoading={uploading.aadhar}
        isDisabled={uploading.aadhar}
        aria-label="Choose Aadhaar file"
      />
      <Button
        size="sm"
        leftIcon={<CheckIcon />}
        variant="outline"
        isLoading={uploading.aadhar}
        onClick={() => handleFileUpload({ type: "aadhar" })}
        isDisabled={!AadharPic || uploading.aadhar}
      >
        {uploading.aadhar ? "Uploading..." : "Upload Aadhaar"}
      </Button>
      <IconButton
        size="sm"
        icon={<DeleteIcon />}
        colorScheme="red"
        variant="outline"
        aria-label="Delete Aadhaar file"
        onClick={() => setAadharFile(null)} // Reset the Aadhaar file on delete
      />
    </HStack>
    {aadharFile && (
      <Image
        src={aadharFile}
        alt="Aadhaar Preview"
        width="150px"
        height="150px"
        objectFit="cover"
        borderRadius="md"
        border="1px solid #ccc"
      />
    )}
  </HStack>
</FormControl>

<FormControl>
  <FormLabel htmlFor="pan_file">Upload PAN Card</FormLabel>
  <HStack spacing={4} alignItems="center" justifyContent="space-between">
    <HStack spacing={4} alignItems="center">
      <Input
        type="file"
        id="pan_file"
        name="pan_image"
        accept="image/*"
        onChange={(e) => setPanPic(e.target.files?.[0] || null)}
        display="none"
      />
      <IconButton
        as="label"
        htmlFor="pan_file"
        icon={<EditIcon />}
        size="sm"
        variant="outline"
        isLoading={uploading.pan}
        isDisabled={uploading.pan}
        aria-label="Choose PAN file"
      />
      <Button
        size="sm"
        leftIcon={<CheckIcon />}
        variant="outline"
        isLoading={uploading.pan}
        onClick={() => handleFileUpload({ type: "pan" })}
        isDisabled={!PanPic || uploading.pan}
      >
        {uploading.pan ? "Uploading..." : "Upload PAN"}
      </Button>
      <IconButton
        size="sm"
        icon={<DeleteIcon />}
        colorScheme="red"
        variant="outline"
        aria-label="Delete PAN file"
        onClick={() => setPanFile(null)} // Reset the PAN file on delete
      />
    </HStack>
    {panFile && (
      <Image
        src={panFile}
        alt="PAN Preview"
        width="150px"
        height="150px"
        objectFit="cover"
        borderRadius="md"
        border="1px solid #ccc"
      />
    )}
  </HStack>
</FormControl>

<FormControl>
  <FormLabel htmlFor="address_proof_file">Upload Address Proof</FormLabel>
  <HStack spacing={4} alignItems="center" justifyContent="space-between">
    <HStack spacing={4} alignItems="center">
      <Input
        type="file"
        id="address_proof_file"
        name="address_image"
        accept="image/*"
        onChange={(e) => setAddressPic(e.target.files?.[0] || null)}
        display="none"
      />
      <IconButton
        as="label"
        htmlFor="address_proof_file"
        icon={<EditIcon />}
        size="sm"
        variant="outline"
        isLoading={uploading.address}
        isDisabled={uploading.address}
        aria-label="Choose Address Proof file"
      />
      <Button
        size="sm"
        leftIcon={<CheckIcon />}
        variant="outline"
        isLoading={uploading.address}
        onClick={() => handleFileUpload({ type: "address" })}
        isDisabled={!addressPic || uploading.address}
      >
        {uploading.address ? "Uploading..." : "Upload Address Proof"}
      </Button>
      <IconButton
        size="sm"
        icon={<DeleteIcon />}
        colorScheme="red"
        variant="outline"
        aria-label="Delete Address Proof file"
        onClick={() => setAddressFile(null)} // Reset the Address file on delete
      />
    </HStack>
    {addressFile && (
      <Image
        src={addressFile}
        alt="Address Proof Preview"
        width="150px"
        height="150px"
        objectFit="cover"
        borderRadius="md"
        border="1px solid #ccc"
      />
    )}
  </HStack>
</FormControl>

</VStack>
  );
};

export default PersonalInfo;
