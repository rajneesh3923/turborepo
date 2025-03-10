import { defineStyleConfig } from "@chakra-ui/react";

export const Button = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {
    fontWeight: "medium",
    borderRadius: "lg", // <-- border radius is same for all variants and sizes
    fontSize: 14,
  },
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: "sm",
      px: 4, // <-- px is short for paddingLeft and paddingRight
      py: 5, // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      fontSize: "md",
      px: 6, // <-- these values are tokens from the design system
      py: 6, // <-- these values are tokens from the design system
    },
    xs: {
      fontSize: "xs",
      px: 4, // <-- these values are tokens from the design system
      py: 4,
      borderRadius: 5, // <-- these values are tokens from the design system
    },
  },
  // Two variants: outline and solid
  variants: {
    outline: {
      color: "gray.700",
      border: "1px solid",
      borderColor: "primary.100",
      _hover: {
        bg: "primary.100",
      },
      // bg: "transparent",
    },
    solid: {
      bg: "primary.400",
      color: "white",
      _hover: {
        bg: "primary.300",
      },
    },
  },
  // The default size and variant values
  defaultProps: {
    size: "md",
    variant: "outline",
  },
});
