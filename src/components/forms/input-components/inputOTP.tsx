import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, TextField, Stack, Typography } from "@mui/material";

const OTP_LENGTH = 6;

const OTPInput: React.FC = () => {
  const { control, handleSubmit, setValue } = useForm();

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const onSubmit = (data: any) => {
    console.log("OTP Entered:", data.otp.join(""));
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newValue = value.slice(-1); // Keep only last digit
    setValue(`otp.${index}`, newValue);

    if (newValue && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    const target = e.target as HTMLInputElement | null; //

    if (!target) return; // Ensure target exists

    if (e.key === "Backspace" && !target.value && index > 0) {
      setValue(`otp.${index}`, ""); // Clear current input
      inputRefs.current[index - 1]?.focus(); // Move to previous input
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          width: "100%",
        }}
      >
        <Typography
          variant="body2"
          style={{
            color: "GrayText",
            textAlign: "center",
          }}
        >
          Mã xác thực đã được gửi đến số điện thoại <strong>092****827</strong>
        </Typography>

        {/* OTP Input Fields */}
        <Stack direction="row" spacing={1}>
          {Array.from({ length: OTP_LENGTH }, (_, index) => (
            <Controller
              key={index}
              name={`otp.${index}`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  inputRef={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  variant="outlined"
                  size="small"
                  sx={{
                    width: "3rem",
                    textAlign: "center",
                    "& input": {
                      textAlign: "center",
                      fontSize: "1.5rem",
                    },
                  }}
                  inputProps={{
                    maxLength: 1,
                  }}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)} // ✅ FIXED
                />
              )}
            />
          ))}
        </Stack>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          sx={{
            width: "80%",
            backgroundColor: "#3b82f6",
            color: "white",
            fontWeight: 600,
            padding: "10px",
          }}
        >
          Xác thực
        </Button>

        {/* Resend Link */}
        <Typography
          variant="body2"
          style={{
            color: "GrayText",
            textAlign: "center",
            display: "flex",
          }}
        >
          Chưa nhận được mã?{" "}
          <Typography
            style={{
              color: "blue",
              textDecorationLine: "underline",
              marginLeft: "0.3rem",
            }}
            color="primary"
            onClick={() => console.log("Resend OTP")}
          >
            Gửi lại mã
          </Typography>
        </Typography>
      </Box>
    </form>
  );
};

export default OTPInput;
