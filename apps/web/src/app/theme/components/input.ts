import { defineStyle, defineStyleConfig } from "@chakra-ui/react";
import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  field: {
    px: 4,
    py: 3,
    border: "1px solid",
    borderColor: "gray.300",
    borderRadius: 10,
    _focus: {
      borderColor: "gray.300",
    },
    _placeholder: {
      fontSize: 14,
      fontWeight: 400,
    },
    _focusVisible: {
      borderColor: "gray.300",
    },
  },
});

const xl = defineStyle({
  fontSize: "lg",
  px: "4",
  h: "12",
});

const lg = defineStyle({
  fontSize: "md",
  px: "4",
  h: "12",
  fontWeight: 500,
  _focusVisible: {
    borderColor: "gray.300",
  },

  _hover: { borderColor: "purple.500 !important" },
  _focus: {
    borderColor: "purple.600 !important",
    boxShadow: "0 0 0 1px purple.600 !important",
  },
});

const md = defineStyle({
  fontSize: "md",
  px: "4",
  h: "12",
  fontWeight: 500,
  _focusVisible: {
    borderColor: "gray.300",
  },
  _hover: { borderColor: "purple.500 !important" },
  _focus: {
    borderColor: "purple.600 !important",
    boxShadow: "0 0 0 1px purple.600 !important",
  },
});

const sm = defineStyle({
  fontSize: "sm",
  px: "4",
  h: "10",
  fontWeight: 500,
  _focusVisible: {
    borderColor: "gray.300",
  },
  _hover: { borderColor: "purple.500 !important" },
  _focus: {
    borderColor: "purple.600 !important",
    boxShadow: "0 0 0 1px purple.600 !important",
  },
});

const sizes = {
  xl: definePartsStyle({ field: xl, addon: xl }),
  lg: definePartsStyle({ field: lg, addon: lg }),
  md: definePartsStyle({ field: md, addon: md }),
  sm: definePartsStyle({ field: sm, addon: sm }),
};

export const Input = defineMultiStyleConfig({ baseStyle, sizes });
