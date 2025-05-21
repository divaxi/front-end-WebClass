import React from "react";
import {
    Controller,
    type Control,
    type FieldValues,
    type RegisterOptions,
} from "react-hook-form";
import { TextField } from "@mui/material";

interface TextAreaProps {
    name: string;
    label?: React.ReactNode;
    control: Control<FieldValues>;
    rules?: Omit<
        RegisterOptions<FieldValues, string>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
    >;
    disabled?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
    name,
    label,
    control,
    rules,
    disabled,
}) => (
    <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
            <TextField
                {...field}
                sx={{
                    width: "100%",
                    "& .MuiInputBase-root": {
                        height: "5rem",
                    },
                    "& .MuiInputBase-input": {
                        maxHeight: "60px",
                    },
                    "& .MuiInputBase-root.Mui-disabled": {
                        backgroundColor: "#F5F5F5",
                        borderColor: "#F0F0F0",
                        color: "#BFBFC5",
                    },
                }}
                value={field.value || ""} // ✅ Sử dụng field.value để tránh lỗi hiển thị đè
                onChange={field.onChange} // ✅ Đảm bảo giá trị cập nhật đúng
                disabled={disabled}
                label={label}
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                error={!!error}
                helperText={error?.message}
            />
        )}
    />
);

export default TextArea;
