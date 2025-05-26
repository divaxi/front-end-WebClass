import React from "react";
import { Controller } from "react-hook-form";
import type {
  Control,
  FieldValues,
  RegisterOptions,
  UseFormSetValue,
  Path,
} from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";

interface Option {
  value: string | number;
  displayName: string;
}

interface SelectFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string | React.ReactNode;
  control: Control<T>;
  setValue: UseFormSetValue<T>;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  disabled?: boolean;
  loading?: boolean;
  options: Option[];
  setSubLocation?: (value: Option) => void;
  onInputChange?: (value: string) => void;
}

const SelectField = <T extends FieldValues>({
  name,
  label,
  control,
  setValue,
  options,
  rules,
  disabled,
  loading,
  setSubLocation,
  onInputChange,
}: SelectFieldProps<T>) => {
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
        const currentValue = field.value as Option | null;
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
            disabled={disabled || loading}
            onChange={(_, newValue: Option | null) => {
              setValue(name, newValue as any);
              if (setSubLocation && newValue) {
                setSubLocation(newValue);
              }
            }}
            onInputChange={(_, value) => {
              if (onInputChange) {
                onInputChange(value);
              }
            }}
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
