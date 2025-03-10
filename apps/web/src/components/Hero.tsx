"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  Button,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import FlightRequestForm from "@/components/FlightRequestForm";
import SuccessModal from "@/components/common/SuccessModal";
import { usePathname, useRouter } from "next/navigation";

export default function Hero() {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI hook for controlling modal state
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [isSuccess, setIsSuccess] = useState(false); // Success state
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const router = useRouter();
  
  
  const handleRequestSubmit = () => {
    setIsLoading(true);
    setIsSuccess(false);
  };

  const handleSuccess = () => {
    setIsLoading(false);
    setIsSuccess(true);
    setShowSuccessModal(true);
    
   
  
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    setIsSuccess(false);
    onClose();
  };



  return (
    <div className=" mt-32 mx-24  flex w-full   ">
      <div className="w-1/2 h-48 flex flex-col justify-center  items-center p-8 ">
        <div className="absolute top-32  left-0 ">
          <img
            src="/images/elements1.png"
            alt="icon1"
            className=" w-28 h-44 animate-vertical-bounce"
          />
        </div>
        {/* Main heading */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          Your Next Adventure Awaits
        </h1>

        {/* Subheading */}
        <p className="text-lg text-gray-600 mb-6">
          Discover amazing destinations and make your travel dreams a reality.
        </p>

        {/* Buttons */}
        <div className="flex space-x-4">
          {/* Button with background */}
          <button
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition duration-200"
            onClick={onOpen}
          >
            Book Request
          </button>
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            closeOnOverlayClick={false}
            isCentered
          >
            <ModalOverlay
              backdropFilter="auto"
              // backdropInvert='10%'
              backdropBlur="2px"
            />
            <ModalContent
              sx={{
                borderRadius: "20px", // Custom border radius

                boxShadow: "lg", // Custom shadow
                p: 4, // Custom padding
                transition: "transform 0.3s ease, opacity 0.3s ease", // Smooth transition effects
                maxHeight: "90vh", // Maximum height for the modal
                display: isSuccess?"none" : "block",
                overflowY: "auto", // Enable scrolling if content overflows
                maxWidth: "90vw", // Adjust max width for responsiveness
                width: "800px", // Set a specific width
              }}
            >
              <ModalBody>
              {isSuccess ? (
                  // <div className="text-center text-green-500">
                  //   Request Submitted Successfully!
                  // </div> // Display success message
                  <SuccessModal onClose={handleSuccessModalClose}  isOpen={showSuccessModal} />

                ) : (
                  <FlightRequestForm  
                  onloading = {handleRequestSubmit}
                  onSuccess={handleSuccess}
                  /> // Pass the submit handler
                )}
              </ModalBody>

              <ModalFooter>
              {!isSuccess && (
                  <HStack justify="space-between" width="100%">
                    <Button variant="outline" onClick={onClose} size="sm">
                      Cancel
                    </Button>
                    <Button
                      form="flight-request-form"
                      type="submit"
                      colorScheme="blue"
                      size="sm"
                      // onClick={handleRequestSubmit}
                      disabled={isLoading}
                      cursor={isLoading ? "not-allowed" : "pointer"} // Ensure cursor is "not-allowed" when loading
                      opacity={isLoading ? 0.6 : 1} 
                      onClick={(e) => {
                        if (isLoading) {
                          e.preventDefault(); // Prevent form submission when loading
                          return;
                        }
                      }}
                    >
                      {isLoading ? "Submitting..." : "Send Request"}
                    </Button>
                  </HStack>
                )}
              </ModalFooter>
            </ModalContent>
          </Modal>

          {/* Transparent button with border */}
          <button className="px-6 py-2 border border-indigo-600 text-indigo-600 font-semibold rounded hover:bg-blue-100 transition duration-200"
          onClick={() => {router.push("/become-agent")} }
          >
            Become an Agent
          </button>
        </div>
      </div>

      {/* second component */}

      <div className=" w-1/2 h-48  flex items-center justify-center   ">
        <Image
          src="/images/header-img1.png"
          alt="header_img1"
          width={500}
          height={300}
          className="   "
        />

        {/* SVG Icon 1 */}
        <div className="absolute top-1/4 left-2/4">
          <img
            src="/images/lite-icons1.svg"
            alt="icon1"
            className=" w-36  h-36 animate-vertical-bounce"
          />
        </div>

        {/* SVG Icon 2 */}
        <div className="absolute top-1/2 right-16">
          <img
            src="/images/sound-icons1.svg"
            alt="icon2"
            className="w-24 h-24 animate-vertical-bounce"
          />
        </div>
      </div>
    </div>
  );
}
