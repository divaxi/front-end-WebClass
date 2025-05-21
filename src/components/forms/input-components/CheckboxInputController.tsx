import React from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, RegisterOptions } from "react-hook-form";
import { FormControlLabel, Checkbox } from "@mui/material";

interface CheckboxProps {
    name: string;
    label?: string;
    control: Control<FieldValues | any>;
    rules?: Omit<
        RegisterOptions<FieldValues, string>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
    >;
    disabled?: boolean;
    onClick?: (e: { target: { checked: boolean } }) => void;
}

const CheckBoxField: React.FC<CheckboxProps> = ({
    name,
    label,
    control,
    rules,
    disabled,
    onClick,
}) => (
    <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
            <FormControlLabel
                control={
                    <Checkbox
                        {...field}
                        checked={field.value ?? false}
                        onChange={e => {
                            field.onChange(e.target.checked);
                            if (onClick) onClick(e);
                        }}
                        disabled={disabled}
                    />
                }
                label={label}
            />
        )}
    />
);

export default CheckBoxField;
