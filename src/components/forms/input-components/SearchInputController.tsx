import React, { useCallback } from "react";
import {
    Controller,
    type Control,
    type FieldValues,
    type RegisterOptions,
} from "react-hook-form";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import debounce from "lodash.debounce";

interface SearchInputProps {
    name: string;
    label?: React.ReactNode;
    control?: Control<FieldValues>;
    rules?:
        | Omit<
              RegisterOptions<FieldValues, string>,
              "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
          >
        | undefined;
    disabled?: boolean;
    placeholder?: string;
    onSearch: (value: string) => void;
}

const SearchInputController: React.FC<SearchInputProps> = ({
    name,
    label,
    control,
    rules,
    disabled,
    placeholder,
    onSearch,
}) => {
    const debouncedSearch = useCallback(debounce(onSearch, 300), []);

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => (
                <TextField
                    {...field}
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
                    label={label}
                    placeholder={placeholder}
                    variant="outlined"
                    fullWidth
                    disabled={disabled}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    sx={{
                                        padding: "1rem",
                                        borderRadius: "50%",
                                    }}
                                    onClick={() => debouncedSearch(field.value)}
                                    edge="end"
                                    disabled={disabled}
                                >
                                    <SearchIcon fontSize="large" />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            )}
        />
    );
};

export default SearchInputController;
