import {
  AppBar,
  IconButton,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import styled from "@emotion/styled";
import { AvatarMenu } from "./avatar-menu";
import { useAtom, useAtomValue } from "jotai";
import { authState } from "@/state";
import { logout } from "@/client/services/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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


interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [auth, setAuth] = useAtom(authState);
  const navigate = useNavigate();   
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
          <AvatarMenu userName={auth?.user.lastName || ""} userRole={auth?.user.role.name || "" } onLogout={() => {logout(
            () => {
              toast.success("Đăng xuất thành công");
              setAuth(null);
              navigate("/login");
            },
            () => {
              toast.error("Đăng xuất thất bại");
              }
          )}
        } 
          />
        </UserSection>
      </StyledToolbar>
    </AppBar>
  );
};

export default Header;
