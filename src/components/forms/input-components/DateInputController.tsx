import React from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, RegisterOptions } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { parseISO, isValid } from "date-fns";

interface DateSelectProps {
  name: string;
  label?: React.ReactNode;
  control: Control<FieldValues>;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  disabled?: boolean;
}

const DateSelect: React.FC<DateSelectProps> = ({
  name,
  label,
  control,
  rules,
  disabled,
}) => {
  if (!control) {
    console.error("Control prop is required for DateSelect component");
    return null;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => {
          const parsedDate = field.value ? parseISO(field.value) : null;
          const isValidDate = parsedDate && isValid(parsedDate);

          return (
            <DatePicker
              {...field}
              value={isValidDate ? parsedDate : null}
              onChange={(date: Date | null) => {
                const newDate = date ? date.toISOString() : null;
                field.onChange(newDate);
              }}
              sx={{
                marginTop: "1rem",
                width: "100%",
                "& .MuiInputBase-input": {
                  padding: "0.75rem",
                  paddingBottom: "1rem",
                },
                "& .Mui-disabled": {
                  backgroundColor: "#F5F5F5",
                  borderColor: "#F0F0F0",
                  color: "#BFBFC5",
                },
              }}
              disabled={disabled}
              label={label}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!error,
                  helperText: error?.message,
                },
              }}
            />
          );
        }}
      />
    </LocalizationProvider>
  );
};

export default DateSelect;
