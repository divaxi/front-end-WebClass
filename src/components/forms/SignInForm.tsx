import React, { useState } from "react";
import { Button, Box, IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextInputController } from "../forms/input-components";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email không được để trống")
    .email("Email không hợp lệ"),
  password: z
    .string()
    .min(1, "Mật khẩu không được để trống")
    .min(4, "Mật khẩu phải có ít nhất 4 ký tự"),
});

type SignInFormData = z.infer<typeof signInSchema>;

interface SignInFormProps {
  onSubmit: (data: SignInFormData) => void;
  isLoading?: boolean;
}

const SignInForm: React.FC<SignInFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextInputController<SignInFormData>
          name="email"
          label="Email"
          control={control}
          disabled={isLoading}
          rules={{ required: "Email không được để trống" }}
        />

        <TextInputController<SignInFormData>
          name="password"
          label="Mật khẩu"
          control={control}
          type={showPassword ? "text" : "password"}
          disabled={isLoading}
          rules={{ required: "Mật khẩu không được để trống" }}
          suffix={
            <IconButton onClick={handleClickShowPassword}>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          }
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          sx={{
            width: "100%",
            maxWidth: "24rem",
            marginTop: "2.5rem",
            borderRadius: "9999px",
            padding: "0.75rem 1.5rem",
            backgroundColor: "#3b82f6",
            color: "white",
            fontWeight: 600,
            transition: "backgroundColor-color 0.2s",
            "&:hover": {
              backgroundColor: "#2563eb",
            },
          }}
        >
          {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
        </Button>
      </Box>
    </form>
  );
};

export default SignInForm;
