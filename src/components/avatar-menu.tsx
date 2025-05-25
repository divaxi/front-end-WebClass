import { useState } from "react";
import {
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Typography,
  Box,
  alpha,
} from "@mui/material";
import {
  Logout as LogoutIcon,
  Person as PersonIcon,
} from "@mui/icons-material";

interface AvatarMenuProps {
  userName: string;
  userRole: string;
  onLogout: () => void;
}

export const AvatarMenu = ({
  userName,
  userRole,
  onLogout,
}: AvatarMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    onLogout();
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{
          ml: 2,
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "scale(1.1)",
            backgroundColor: "primary.main",
          },
        }}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: "#1976d2",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            },
          }}
        >
          {userName.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            borderRadius: 2,
            minWidth: 200,
            "& .MuiMenuItem-root": {
              px: 2,
              py: 1.5,
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: alpha("#1976d2", 0.08),
              },
            },
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Xin chào,
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: "primary.main" }}
          >
            {userName}
          </Typography>
        </Box>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonIcon fontSize="small" sx={{ color: "primary.main" }} />
          </ListItemIcon>
          <Typography variant="body2" sx={{ color: "text.primary" }}>
            {userRole}
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleLogout}
          sx={{
            color: "#d32f2f",
            "&:hover": {
              backgroundColor: alpha("#d33f2f", 0.08),
            },
          }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" sx={{ color: "error.main" }} />
          </ListItemIcon>
          Đăng xuất
        </MenuItem>
      </Menu>
    </>
  );
};
