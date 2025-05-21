import React from "react";
import {
    Controller,
    type RegisterOptions,
    type FieldValues,
    type Control,
    type Path,
} from "react-hook-form";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

interface TextFieldProps<T extends FieldValues> {
    name: Path<T>;
    label?: React.ReactNode;
    control: Control<T>;
    rules?: Omit<
        RegisterOptions<T, Path<T>>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
    >;
    disabled?: boolean;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    type?: string;
}

const TextFieldController = <T extends FieldValues>({
    name,
    label,
    control,
    rules,
    disabled,
    prefix,
    suffix,
    type = "text",
}: TextFieldProps<T>) => (
    <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
            <TextField
                {...field}
                type={type}
                sx={{
                    width: "100%",
                    "& .MuiInputBase-input": {
                        padding: "0.75rem",
                        paddingBottom: "1rem",
                    },
                    "& .MuiInputBase-input.Mui-disabled": {
                        backgroundColor: "#F5F5F5",
                        borderColor: "#F0F0F0",
                        color: "#BFBFC5",
                    },
                }}
                value={field.value || ""}
                onChange={field.onChange}
                label={label}
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!error}
                helperText={error?.message}
                disabled={disabled}
                InputProps={{
                    startAdornment: prefix ? (
                        <InputAdornment position="start">
                            {prefix}
                        </InputAdornment>
                    ) : null,
                    endAdornment: suffix ? (
                        <InputAdornment position="end">{suffix}</InputAdornment>
                    ) : null,
                }}
            />
        )}
    />
);

export default TextFieldController;
