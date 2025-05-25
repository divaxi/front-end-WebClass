import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Receipt as ReceiptIcon,
} from "@mui/icons-material";
import styled from "@emotion/styled";
import { animated, useSpring } from "@react-spring/web";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// @ts-ignores
import AppIcon from "@/assets/AppIcon.svg?react";
const DRAWER_WIDTH = 240;

const StyledDrawer = styled(Drawer)`
  width: ${DRAWER_WIDTH}px;
  flex-shrink: 0;
  & .MuiDrawer-paper {
    width: ${DRAWER_WIDTH}px;
    box-sizing: border-box;
    border-radius: 0;
  }
`;

const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const AnimatedDrawer = styled(animated.div)`
  z-index: 20;
`;

interface SiderProps {
  open: boolean;
  onClose: () => void;
  location: string;
}

const menuItems = [
  { text: "Thống kê", icon: <DashboardIcon />, path: "/" },
  { text: "Khách hàng", icon: <PeopleIcon />, path: "/customers" },
  { text: "Đơn hàng", icon: <ReceiptIcon />, path: "/orders" },
];

const Sider = ({ open, onClose, location }: SiderProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!isMobile) {
      onClose();
    }
  }, [isMobile, onClose]);

  const drawerSpring = useSpring({
    transform: !isMobile ? "translateX(0)" : "translateX(-100%)",
    config: {
      tension: 300,
      friction: 30,
    },
  });

  const drawer = (
    <DrawerContent>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          gap: 1,
          p: 2,
        }}
      >
        <AppIcon width={40} height={40} style={{ margin: "1rem" }} />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {import.meta.env.VITE_APP_NAME}
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            onClick={() => {
              navigate(item.path);

              if (isMobile) onClose();
            }}
            sx={{
              backgroundColor:
                location === item.path
                  ? "rgba(230,244,255,255)"
                  : "transparent",
              color: location === item.path ? "rgb(22, 119, 255)" : "inherit",
              borderRight:
                location === item.path ? "4px solid rgb(22, 119, 255)" : "none",
            }}
          >
            <ListItemIcon
              sx={{
                color: location === item.path ? "rgb(22, 119, 255)" : "inherit",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </DrawerContent>
  );

  return (
    <>
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={open}
          onClose={onClose}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        <AnimatedDrawer style={drawerSpring}>
          <StyledDrawer variant="permanent">{drawer}</StyledDrawer>
        </AnimatedDrawer>
      )}
    </>
  );
};

export default Sider;
