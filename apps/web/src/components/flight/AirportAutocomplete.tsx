import React, { useState, useMemo, useEffect } from "react";
import Select from "react-select";
import {
  Box,
  FormLabel,
  FormErrorMessage,
  FormControl,
  useToken,
} from "@chakra-ui/react";
import { airports as airportsData } from "../../utils/airports";
import { FieldError } from "react-hook-form";
import debounce from "lodash.debounce";

interface Airport {
  name: string;
  city: string;
  country: string;
  IATA: string;
}

interface AirportAutocompleteProps {
  label: string;
  name: string;
  value: string | null;
  onChange: (value: string) => void;
  error?: FieldError;
  disabledOption?: string;
}

const airports: Airport[] = airportsData as Airport[];

const AirportAutocomplete: React.FC<AirportAutocompleteProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  disabledOption,
}) => {
  const [inputValue, setInputValue] = useState(""); // Default value
  const [primary200, primary300] = useToken("colors", [
    "primary.200",
    "primary.300",
  ]);
  const [shadowXl] = useToken("boxShadow", ["xl"]);

  // custom style

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      padding: "0.40rem",
      border: "1px solid",
      borderColor: state.isFocused ? primary300 : primary200,
      borderRadius: "0.375rem",
      boxShadow: state.isFocused ? primary300 : "none",
      "&:hover": {
        borderColor: primary300,
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "0rem",

      boxShadow: "3px 23px 45px 17px rgba(158,158,158,0.59)",
    }),
    option: (provided, state) => ({
      ...provided,
      fontWeight: state.isSelected ? "600" : "400",
      backgroundColor: state.isSelected ? primary300 : "white",
      color: state.isSelected ? "white" : "#000000",
      "&:hover": {
        backgroundColor: primary300,
        color: "white",
        cursor: "pointer",
      },
    }),
  };

  // Debounce input change to avoid frequent updates
  const debouncedInputChange = useMemo(
    () =>
      debounce((newValue: string) => {
        console.log("Debounced Input:", newValue);
        if (newValue.length > 2) {
          setInputValue(newValue);
        }
      }, 300),
    []
  );

  useEffect(() => {
    if (inputValue === "") {
      setInputValue("india");
    }
  }, [inputValue]);

  useEffect(() => {
    console.log("Input:", inputValue);
  }, [inputValue]);

  // Filter and memoize options to improve performance
  const airportOptions = useMemo(() => {
    return airports
      .filter((airport) =>
        `${airport.name} (${airport.IATA}) - ${airport.city}, ${airport.country}`
          .toLowerCase()
          .includes(inputValue.toLowerCase())
      )
      .filter((airport) => airport.IATA !== disabledOption)
      .slice(0, 20) // Limit the number of options to 20
      .sort((a, b) => {
        const inputLower = inputValue.toLowerCase();
        const aMatchesIATA = a.IATA.toLowerCase().startsWith(inputLower);
        const bMatchesIATA = b.IATA.toLowerCase().startsWith(inputLower);

        if (aMatchesIATA && !bMatchesIATA) return -1;
        if (!aMatchesIATA && bMatchesIATA) return 1;
        return a.IATA.localeCompare(b.IATA);
      })
      .map((airport) => ({
        label: `${airport.name} (${airport.IATA}) - ${airport.city}, ${airport.country}`,
        value: airport.IATA,
      }));
  }, [inputValue, disabledOption]);

  const handleSelectChange = (selectedOption: any) => {
    if (selectedOption) {
      onChange(selectedOption.value);
    } else {
      setInputValue("");
      onChange("");
    }
  };

  return (
    <Box w="100%" mb={4}>
      <FormControl isInvalid={!!error} mb={4}>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        <Select
          inputId={name}
          value={
            airportOptions.find((option) => option.value === value) || null
          }
          onInputChange={debouncedInputChange}
          onChange={handleSelectChange}
          options={airportOptions}
          placeholder={`Select ${label}`}
          isClearable
          styles={customSelectStyles}
        />
        <FormErrorMessage>{error && error.message}</FormErrorMessage>
      </FormControl>
    </Box>
  );
};

export default AirportAutocomplete;
