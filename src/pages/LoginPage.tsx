import { Box, Paper, Typography } from "@mui/material";
import styled from "@emotion/styled";
// @ts-ignore
import AppIcon from "@/assets/AppIcon.svg?react";
import { SignInForm } from "@/components/forms";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loginWithEmail } from "@/client/services/auth";
import { useSetAtom } from "jotai";
import { authState } from "@/state";

const PageContainer = styled(Box)`
  min-height: 100vh;
  background: linear-gradient(
    to right,
    rgb(33, 125, 218),
    rgb(56, 150, 228),
    rgb(140, 192, 235)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const ContentWrapper = styled(Box)`
  max-width: 1400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin: auto;

  @media (min-width: 900px) {
    flex-direction: row;
  }
`;

const InfoSection = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  padding: 16px;

  @media (min-width: 900px) {
    padding: 32px;
  }
`;

const Title = styled(Typography)`
  font-size: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

  @media (min-width: 900px) {
    font-size: 3rem;
  }
`;

const CompanyName = styled(Title)`
  background: linear-gradient(45deg, #ff1493, #ffa500);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 3rem;
  font-weight: 900;
  letter-spacing: 2px;
  text-transform: uppercase;
  animation: glow 2s ease-in-out infinite alternate;
  text-shadow: 0 0 10px rgba(248, 91, 175, 0.3);

  @keyframes glow {
    from {
      text-shadow:
        0 0 10px rgba(247, 94, 175, 0.3),
        0 0 20px rgba(255, 20, 147, 0.3),
        0 0 30px rgba(255, 20, 147, 0.3);
    }
    to {
      text-shadow:
        0 0 20px rgba(255, 165, 0, 0.5),
        0 0 30px rgba(255, 165, 0, 0.5),
        0 0 40px rgba(255, 165, 0, 0.5);
    }
  }

  @media (min-width: 900px) {
    font-size: 4.5rem;
  }
`;

const Subtitle = styled(Typography)`
  font-size: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const Description = styled(Typography)`
  margin-top: 24px;
  opacity: 0.9;
  line-height: 1.6;
  max-width: 500px;
`;

const LoginSection = styled(Box)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginCard = styled(Paper)`
  width: 100%;
  max-width: 500px;
  padding: 32px;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const StyledAppIcon = styled(AppIcon)`
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
  @media (max-width: 600px) {
    display: none;
  }
`;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const setAuthState = useSetAtom(authState);

  return (
    <PageContainer>
      <ContentWrapper>
        <InfoSection>
          <Title variant="h2" fontWeight="bold" gutterBottom>
            Chào mừng đến với
          </Title>
          <CompanyName variant="h2" gutterBottom>
            {import.meta.env.VITE_APP_NAME}
          </CompanyName>
          <Subtitle variant="h3" fontWeight="bold" gutterBottom>
            Hệ thống quản lý đơn hàng
          </Subtitle>
          <Description variant="h5">
            Giải pháp toàn diện cho việc quản lý và theo dõi đơn hàng của bạn.
            Tối ưu hóa quy trình, tăng hiệu suất và mang lại trải nghiệm tốt
            nhất cho khách hàng.
          </Description>
        </InfoSection>
        <LoginSection>
          <LoginCard>
            <StyledAppIcon width={180} height={180} />
            <Typography
              variant="h4"
              fontWeight="bold"
              color="primary"
              gutterBottom
            >
              Đăng nhập
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              align="center"
              sx={{ mb: 2 }}
            >
              Vui lòng đăng nhập để tiếp tục
            </Typography>
            <SignInForm
              isLoading={isLoading}
              onSubmit={(data) => {
                setIsLoading(true);
                loginWithEmail(
                  {
                    requestBody: {
                      email: data.email,
                      password: data.password,
                    },
                  },
                  (res) => {
                    toast.success("Đăng nhập thành công");
                    setAuthState(res);
                    navigate("/");
                  },
                  () => {
                    toast.error("Đăng nhập thất bại");
                  }
                );
                setIsLoading(false);
              }}
            />
          </LoginCard>
        </LoginSection>
      </ContentWrapper>
    </PageContainer>
  );
}
