import {
  AppBar,
  Avatar,
  IconButton,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import styled from "@emotion/styled";
import { AvatarMenu } from "./avatar-menu";
const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

const MenuButton = styled(IconButton)`
  margin-right: 0.5rem;
`;

const FlexSpacer = styled.div`
  flex: 1;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
`;

const StyledAvatar = styled(Avatar)`
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar position="fixed">
      <StyledToolbar>
        {isMobile && (
          <MenuButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onMenuClick}
          >
            <MenuIcon />
          </MenuButton>
        )}
        <FlexSpacer />
        <UserSection>
          <AvatarMenu userName="John Doe" userRole="Admin" onLogout={() => {}} />
        </UserSection>
      </StyledToolbar>
    </AppBar>
  );
};

export default Header;
