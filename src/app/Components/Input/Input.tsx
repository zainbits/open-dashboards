import {
  FormControl,
  FormLabel,
  FormHelperText,
  InputProps as ChakraInputProps,
  InputRightElement,
  Input as ChakraInput,
  InputGroup,
  FormErrorMessage,
  Stack,
} from "@chakra-ui/react";
import { ReactNode, forwardRef } from "react";

interface InputProps {
  name: string;
  label?: string;
  rightElement?: ReactNode;
  type?: ChakraInputProps["type"];
  defaultValue?: ChakraInputProps["defaultValue"];
  value?: ChakraInputProps["value"];
  error?: string | boolean;
  onChange?: ChakraInputProps["onChange"];
  onFocus?: ChakraInputProps["onFocus"];
  onBlur?: ChakraInputProps["onBlur"];
  onClick?: ChakraInputProps["onClick"];
  inline?: boolean;
  warning?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      value,
      label,
      defaultValue,
      inline,
      warning,
      hint,
      error,
      type,
      rightElement,
      onChange,
      onFocus,
      onBlur,
      onClick,
      ...rest
    },
    ref
  ) => {
    return (
      <FormControl {...rest} isInvalid={Boolean(error)} display="initial">
        {label && <FormLabel>Email address</FormLabel>}
        <InputGroup size="sm">
          <ChakraInput
            name={name}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onClick={onClick}
            type={type}
            ref={ref}
          />
          {rightElement && (
            <InputRightElement>{rightElement}</InputRightElement>
          )}
        </InputGroup>
        {(error || warning || hint) && (
          <Stack spacing={0} mt={2} w={inline ? "100%" : "auto"}>
            {hint && (
              <FormHelperText data-testid={`${name}-hint-text`}>
                {hint}
              </FormHelperText>
            )}
            {typeof error === "string" && error && (
              <FormErrorMessage mt={-2} data-testid={`${name}-error-text`}>
                {error}
              </FormErrorMessage>
            )}
            {warning && (
              <FormHelperText
                color="state.warning"
                data-testid={`${name}-warning-text`}
              >
                {warning}
              </FormHelperText>
            )}
          </Stack>
        )}
      </FormControl>
    );
  }
);
