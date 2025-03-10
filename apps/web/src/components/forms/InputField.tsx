// src/components/InputField.tsx
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  ChakraProps,
} from "@chakra-ui/react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  size?: string;
  step?: string; // For number inputs, like step="0.01"
  labelStyles?: ChakraProps;
  style?: ChakraProps;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  register,
  error,
  size,
  step,
  labelStyles,
  style,
}) => {
    
  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (type === "date") {
      e.currentTarget.showPicker(); // Open the date picker on click
    }
  };

  return (
    <FormControl isInvalid={!!error} mb={4}>
      <FormLabel htmlFor={name} {...labelStyles}>
        {label}
      </FormLabel>
      <Input
        {...style}
        _invalid={{
          borderColor: "red.400",
          borderWidth: "1px ",
        }}
        id={name}
        type={type}
        placeholder={placeholder}
        size={size || "md"}
        step={type === "number" ? step || "1" : undefined} // Adding step for number input
        {...register(name, {
          valueAsNumber: type === "number" ? true : undefined, // Ensure react-hook-form treats it as a number
          valueAsDate: type === "date"? true : undefined,
        })}
        onClick={handleClick}
       
      />
      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
};

export default InputField;
