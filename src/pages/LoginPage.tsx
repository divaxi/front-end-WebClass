import { Box, Paper, Typography } from "@mui/material";
import styled from "@emotion/styled";
// @ts-ignore
import AppIcon from "@/assets/AppIcon.svg?react";
import { SignInForm } from "@/components/forms";

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
  return (
    <PageContainer>
      <ContentWrapper>
        <InfoSection>
          <Title variant="h2" fontWeight="bold" gutterBottom>
            Chào mừng đến với
          </Title>
          <Subtitle variant="h3" fontWeight="bold" gutterBottom>
            Hệ thống quản lý đơn hàng
          </Subtitle>
          <Description variant="body1">
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
              onSubmit={(data) => {
                console.log(data);
              }}
            />
          </LoginCard>
        </LoginSection>
      </ContentWrapper>
    </PageContainer>
  );
}
