"use client";
import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  VStack,
  HStack,
  Avatar,
  Text,
  Input,
  Divider,
  IconButton,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { EditIcon, CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import { FiUser, FiMapPin, FiCreditCard, FiSettings } from "react-icons/fi";
import React from "react";
import { createClient } from "frontend/utils/supabase/client";
import CustomModal from "frontend/components/common/Modal";
import { User } from "@supabase/supabase-js";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

type ProfileOption = "profile" | "address" | "payment" | "settings";

const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const [selectedOption, setSelectedOption] =
    useState<ProfileOption>("profile");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  const [name, setName] = useState(user.user_metadata?.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [profilePicURL, setProfilePicURL] = useState(
    user.user_metadata?.profilePicURL
  );

  const supabase = createClient();

  const updateUser = async () => {
    const { data, error } = await supabase.auth.updateUser({
      email: email,
      data: { phone: phone, name: name, profilePicURL: profilePicURL },
    });
    if (error) {
      console.error("Error updating user:", error);
    } else {
      console.log("User updated:", data);
    }
  };

  // Handle image upload
  const handleImageUpload = async () => {
    if (!profilePic) return;
    try {
      setUploading(true);
      const userId = user.id; // Get the user's ID
      const folderPath = `user/${userId}`;
      const fileName = `${folderPath}/profile_pic`;

      // Upload the image to Supabase storage
      const { data, error } = await supabase.storage
        .from("profilebucket")
        .upload(fileName, profilePic, { upsert: true });

      if (error) {
        throw error;
      }

      // Get the public URL of the uploaded image
      const publicURL = supabase.storage
        .from("profilebucket")
        .getPublicUrl(fileName).data.publicUrl;
      setProfilePic(null);

      // Update user's profile pic URL in Supabase Auth and local state
      const { error: updateError } = await supabase.auth.updateUser({
        data: { profilePicURL: publicURL },
      });

      if (updateError) {
        throw updateError;
      }

      // Reflect the new profile picture instantly
      setProfilePicURL(publicURL);

      console.log("Image uploaded successfully:", publicURL);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSaveChanges = () => {
    updateUser();
    setIsEditingName(false);
    setIsEditingEmail(false);
    setIsEditingPhone(false);
  };

  const renderContent = () => {
    switch (selectedOption) {
      case "profile":
        return (
          <Box>
            <HStack spacing={4} mb={4}>
              <Avatar
                size="xl"
                name={user?.user_metadata?.name}
                src={profilePicURL}
              />
              <VStack align="start">
                <Text fontWeight="bold">{user?.user_metadata?.name}</Text>
                <HStack>
                  <Input
                    type="file"
                    onChange={(e) => setProfilePic(e.target.files?.[0] || null)}
                    display="none" // Hide the default input
                    id="fileInput"
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
                    isDisabled={!profilePic || uploading}
                  >
                    {uploading ? "Uploading..." : "Upload Image"}
                  </Button>
                  <IconButton
                    size="sm"
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    variant="outline"
                    aria-label="Delete profile picture"
                  />
                </HStack>
              </VStack>
            </HStack>
            <VStack align="start" spacing={3}>
              <Box>
                <Text fontWeight="bold">Name</Text>
                <HStack>
                  <Input
                    placeholder={user?.user_metadata?.name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    isDisabled={!isEditingName}
                  />
                  <IconButton
                    size="sm"
                    icon={isEditingName ? <CheckIcon /> : <EditIcon />}
                    variant="outline"
                    onClick={() => {
                      setIsEditingName(!isEditingName);
                      if (isEditingName) handleSaveChanges();
                    }}
                    aria-label={isEditingName ? "Save name" : "Edit name"}
                  />
                </HStack>
              </Box>
              <Box>
                <Text fontWeight="bold">Email</Text>
                <HStack>
                  <Input
                    placeholder={user?.email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isDisabled={!isEditingEmail}
                  />
                  <IconButton
                    size="sm"
                    icon={isEditingEmail ? <CheckIcon /> : <EditIcon />}
                    variant="outline"
                    onClick={() => {
                      setIsEditingEmail(!isEditingEmail);
                      if (isEditingEmail) handleSaveChanges();
                    }}
                    aria-label={isEditingEmail ? "Save email" : "Edit email"}
                  />
                </HStack>
              </Box>
              <Box>
                <Text fontWeight="bold">Phone Number</Text>
                <HStack>
                  <Input
                    placeholder={user?.phone || "+1234567890"}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    isDisabled={!isEditingPhone}
                  />
                  <IconButton
                    size="sm"
                    icon={isEditingPhone ? <CheckIcon /> : <EditIcon />}
                    variant="outline"
                    onClick={() => {
                      setIsEditingPhone(!isEditingPhone);
                      if (isEditingPhone) handleSaveChanges();
                    }}
                    aria-label={
                      isEditingPhone ? "Save phone number" : "Edit phone number"
                    }
                  />
                </HStack>
              </Box>
            </VStack>
          </Box>
        );
      case "address":
        return <Text>Address Information</Text>;
      case "payment":
        return <Text>Payment Methods</Text>;
      case "settings":
        return <Text>Profile Settings</Text>;
      default:
        return <Text>Select an option</Text>;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="lg" minHeight={"40rem"} p={4}>
        <Flex alignItems="center" justifyContent="space-between">
          <ModalHeader fontWeight="bold" textTransform="uppercase">
            {selectedOption}
          </ModalHeader>

          <ModalCloseButton
            size="lg"
            fontSize="xl" // Makes the close button larger
            position="static" // Removes the default absolute positioning
          />
        </Flex>
        <Divider my={0} />
        <ModalBody display="flex">
          <Box width="20%">
            <VStack align="start" spacing={0}>
              <Button
                variant="ghost"
                width={"100%"}
                fontWeight={"bold"}
                leftIcon={<Icon as={FiUser} />}
                bg={selectedOption === "profile" ? "primary.50" : "transparent"}
                // color={selectedOption === 'profile' ? 'white' : 'inherit'}
                borderRadius="0"
                _hover={{ bg: "primary.50" }}
                onClick={() => setSelectedOption("profile")}
              >
                Profile
              </Button>
              <Button
                variant="ghost"
                width="100%"
                _hover={{ bg: "primary.50" }}
                fontWeight={"bold"}
                bg={selectedOption === "address" ? "primary.50" : "transparent"}
                //   color={selectedOption === 'address' ? 'white' : 'inherit'}
                borderRadius="0"
                leftIcon={<Icon as={FiMapPin} />}
                onClick={() => setSelectedOption("address")}
              >
                Address
              </Button>
              <Button
                variant="ghost"
                width="100%"
                _hover={{ bg: "primary.50" }}
                fontWeight={"bold"}
                bg={selectedOption === "payment" ? "primary.50" : "transparent"}
                //   color={selectedOption === 'payment' ? 'white' : 'inherit'}
                borderRadius="0"
                leftIcon={<Icon as={FiCreditCard} />}
                onClick={() => setSelectedOption("payment")}
              >
                Payment
              </Button>
              <Button
                variant="ghost"
                width="100%"
                _hover={{ bg: "primary.50" }}
                fontWeight={"bold"}
                bg={
                  selectedOption === "settings" ? "primary.50" : "transparent"
                }
                //   color={selectedOption === 'settings' ? 'white' : 'inherit'}
                borderRadius="0"
                leftIcon={<Icon as={FiSettings} />}
                onClick={() => setSelectedOption("settings")}
              >
                Settings
              </Button>
            </VStack>
          </Box>
          <Box
            width="1px" // Thickness of the vertical line
            bg="gray.200" // Color of the vertical line
            flexShrink={0} // Ensure it takes full height
            // Horizontal margin
          />

          <Box width="80%" p={4} ml={5}>
            {renderContent()}
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            _hover={{ bg: "primary.400", color: "white" }}
            mr={3}
            onClick={onClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
