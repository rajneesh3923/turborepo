"use client";
// import "@fontsource-variable/open-sans";
// import "@fontsource-variable/raleway";
import { extendTheme } from "@chakra-ui/react";
import { Button } from "./components/button";
import { Input } from "./components/input";
import { Select } from "./components/select";

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  components: {
    Button,
    Input,
    Select,
  },
  colors: {
    primary: {
      "50": "#edebff",
      "100": "#c7c7f0",
      "200": "#a3a1df",
      "300": "#7e7cd0",
      "400": "#5a57c2",
      "500": "#403da8",
      "600": "#313084",
      "700": "#232260",
      "800": "#13133b",
      "900": "#06061a",
    },
    secondary: {
      "50": "#f0f0fc",
      "100": "#d4d6e0",
      "200": "#b9bac6",
      "300": "#9d9fae",
      "400": "#818496",
      "500": "#686a7d",
      "600": "#515362",
      "700": "#3a3b47",
      "800": "#23232d",
      "900": "#0b0b16",
    },
  },
});
