import React from "react";
import CustomModal from "./Modal";
import { Box, Text, Button, Icon,   useDisclosure } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";


interface successprops {
    onClose: () => void;
    isOpen : boolean;
}


export default function SuccessModal ({onClose, isOpen }:successprops){
  
  const customModalStyles = {
    borderRadius: "20px", // Custom border radius
    boxShadow: "lg", // Custom shadow
    p: 4, // Custom padding
    transition: "transform 0.3s ease, opacity 0.3s ease", // Smooth transition effects
    maxHeight: "90vh", // Maximum height for the modal
    overflowY: "auto", // Enable scrolling if content overflows
    maxWidth: "90vw", // Adjust max width for responsiveness
    width: "800px", // Set a specific width
  };

   

    return (
      
       <CustomModal
            isOpen={isOpen}
            onClose={onClose}
            onCancelBtnClick={onClose}
            cancelBtnText="Close"
            onOkBtnClick={onClose}
            okBtnText="OK"
            sx={customModalStyles}
            
            


       >  
         {/* Modal Body: Green Tick and Success Message */}
      <Box textAlign="center" py={5} position="relative">
          {/* Semi-Circle Background */}
          <Box
    position="absolute"
    top={-20} // Adjust top position to overlap with modal
    left={0}
    right={0}
    height="100%" // Adjust height for semi-circle as needed
    bg="green.50" // Light green color
    borderTopRadius="sm" // Rounded top
    borderBottom="none" // No bottom border
    boxShadow="lg" // Optional shadow
    clipPath="ellipse(50% 100% at 50% 0%)" // Creates the semi-circle shape
    zIndex={0}
/>
        {/* Green Tick Icon */}
        <Icon
                    as={CheckCircleIcon}
                    w={16}
                    h={16}
                    color="green.500"
                    mb={4}
                    boxShadow="0 4px 30px rgba(0, 128, 0, 0.4)" // Shadow effect
                    borderRadius="full" // Make the icon circular
                    zIndex={1}
                    position="relative"
                />

        {/* Success Message */}
        <Text fontSize="lg" fontWeight="bold" mb={4} zIndex={1} position="relative" >
          Your request is  Successfully submitted!
        </Text>
       
      </Box>

        </CustomModal > 
      

    )


}




