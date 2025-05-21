import React from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, RegisterOptions } from "react-hook-form";
import {
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    FormLabel,
} from "@mui/material";

interface Option {
    value: string | number;
    displayName: string;
}

interface RadioButtonGroupProps {
    name: string;
    label?: React.ReactNode;
    control: Control<FieldValues>;
    rules?: Omit<
        RegisterOptions<FieldValues, string>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
    >;
    disabled?: boolean;
    options: Option[];
    onClick?: React.MouseEventHandler<HTMLLabelElement>;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
    name,
    label,
    control,
    options,
    rules,
    disabled,
    onClick,
}) => {
    if (!control) {
        console.error("Control prop is required for RadioButtonGroup component");
        return null;
    }

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState: { error } }) => (
                <FormControl 
                    component="fieldset" 
                    error={!!error}
                    disabled={disabled}
                >
                    <FormLabel>{label}</FormLabel>
                    <RadioGroup
                        {...field}
                        row
                        sx={{
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
                    >
                        {options.map(option => (
                            <FormControlLabel
                                key={option.value}
                                value={option.value}
                                control={<Radio disabled={disabled} />}
                                label={option.displayName}
                                onClick={onClick}
                                disabled={disabled}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            )}
        />
    );
};

export default RadioButtonGroup;
