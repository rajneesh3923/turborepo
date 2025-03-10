import { selectAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(selectAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  field: {
    border: "1px solid",
    borderColor: "gray.400",
    fontSize: 14,
    _hover:{ borderColor: "purple.500 !important" },
    _focus:{
      borderColor: "purple.600 !important",
      boxShadow: "0 0 0 1px purple.600 !important",
    },
  },
  icon: {
    color: "gray.400",
  },
  defaultProps: {
    size: "lg",
  },
});

export const Select = defineMultiStyleConfig({ baseStyle });
