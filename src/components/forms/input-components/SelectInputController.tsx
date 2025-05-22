import React from "react";
import { Controller } from "react-hook-form";
import type {
  Control,
  FieldValues,
  RegisterOptions,
  UseFormSetValue,
} from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";

interface Option {
  value: string | number;
  displayName: string;
}

interface SelectFieldProps {
  name: string;
  label?: string | React.ReactNode;
  control: Control<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  disabled?: boolean;
  loading?: boolean;
  options: Option[];
  setSubLocation?: (value: Option) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  control,
  setValue,
  options,
  rules,
  disabled,
  loading,
  setSubLocation,
}) => {
  if (!control || !setValue) {
    console.error(
      "Control and setValue props are required for SelectField component"
    );
    return null;
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        const currentValue = field.value || null;
        const selectedOption =
          options.find((opt) => opt.value === currentValue?.value) || null;

        return (
          <Autocomplete
            sx={{
              width: "100%",
              marginTop: "1rem",
              "& .MuiInputBase-input": {
                padding: "0.75rem",
                paddingBottom: "1rem",
              },
              "& .MuiInputBase-root.Mui-disabled": {
                backgroundColor: "#F5F5F5",
                borderColor: "#F0F0F0",
                color: "#BFBFC5",
              },
            }}
            disableClearable
            options={options}
            getOptionLabel={(option: Option) => option.displayName}
            value={selectedOption || undefined}
            onChange={(_, newValue: Option | null) => {
              setValue(name, newValue || null);
              if (setSubLocation && newValue) {
                setSubLocation(newValue);
              }
            }}
            disabled={disabled || loading}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                fullWidth
                error={!!error}
                helperText={error?.message}
                disabled={disabled || loading}
              />
            )}
          />
        );
      }}
    />
  );
};

export default SelectField;
