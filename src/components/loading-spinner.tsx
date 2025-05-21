import { loadingState } from "@/state";
import { useAtomValue } from "jotai";
import { CircularProgress } from "@mui/material";
import styled from "@emotion/styled";

const LoadingOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
`;

const StyledCircularProgress = styled(CircularProgress)`
  height: 3rem;
  width: 3rem;
  animation: spin 1s linear infinite;
  color: #2563eb;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

interface LoadingSpinnerProps {
  className?: string;
}

function LoadingSpinner({ className }: LoadingSpinnerProps) {
  const isLoading = useAtomValue(loadingState);
  if (!isLoading) return null;

  return (
    <LoadingOverlay className={className}>
      <StyledCircularProgress />
    </LoadingOverlay>
  );
}

export { LoadingSpinner };
