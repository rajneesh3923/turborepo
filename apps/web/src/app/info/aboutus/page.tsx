import React from "react";
import {
    Box,
    Button,
    Heading,
    Text,
    VStack,
    Link as ChakraLink,
    Flex,
  } from "@chakra-ui/react";

  

export default function Aboutus(){

    return(
        <VStack
      spacing={4}
      align="center"
      justify="center"
      minH="100vh"
      bg="white"
      w="full"
    >
         <Heading as="h3" size="lg" fontWeight={600} textAlign="left" mb={2}>
          About Us
        </Heading>

        <Text textAlign="left" fontSize="16" color="gray.800" mb={6}>
        Welcome to TravelEaseIn! We are a one-stop platform designed to make travel planning simple, accessible, and enjoyable. At TravelEaseIn, you can raise booking requests for flights and hotels, and our network of trusted partner agents will respond with the best options and prices tailored to your needs. For those looking for something extra special, we also offer exclusive packages curated by agents for popular destinations, allowing you to choose the perfect fit for your next adventure.
        </Text>

        <Text textAlign="left" fontSize="16" color="gray.800" mb={6}>
        Our mission at TravelEaseIn is to create a seamless connection between travelers and agents, giving users access to a wide array of travel options in just a few clicks. We believe that travel planning should be convenient and free from hassle, which is why we’ve built a platform where you can explore, compare, and select—all without leaving our site. Plus, our service is entirely free for users, meaning no hidden fees or charges for accessing these fantastic options.
        </Text>

        <Text textAlign="left" fontSize="16" color="gray.800" mb={6}>
        Whether you’re booking a quick getaway or a detailed vacation plan, TravelEaseIn is here to make the journey smooth and the planning effortless. Our platform combines efficiency with transparency, allowing you to make well-informed choices and focus on what matters most: your journey. Let TravelEaseIn be your travel companion and help turn your travel dreams into reality!
            </Text>


            
    

    </VStack>
    )
}