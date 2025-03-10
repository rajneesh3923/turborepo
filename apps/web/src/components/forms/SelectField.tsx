// src/components/SelectField.tsx
import {
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface SelectFieldProps {
  label: string;
  name: string;
  options: string[];
  register: UseFormRegister<any>;
  error?: FieldError;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  options,
  register,
  error,
}) => {
  return (
    <FormControl isInvalid={!!error} mb={4}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Select id={name} {...register(name)} size="lg">
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
};

export default SelectField;
