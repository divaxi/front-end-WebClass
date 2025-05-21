import { Outlet, useLocation } from "react-router-dom";
import Header from "@/components/header";
import Sider from "@/components/sider";
import { Suspense, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Box } from "@mui/material";
import { LoadingSpinner } from "@/components/loading-spinner";
export default function Layout() {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      overflow: 'hidden',
      backgroundColor: '#f7f7f8'
    }}>
      <Sider open={drawerOpen} onClose={() => setDrawerOpen(false)} location={location.pathname} />
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10
        }}>
          <Header onMenuClick={handleDrawerToggle} />
        </div>
        <Box sx={{
          marginTop: '64px',
          height: 'calc(100vh - 64px)',
          overflow: 'auto',
          padding: 2
        }}>

      <LoadingSpinner />
          <Suspense>
            <Outlet />
          </Suspense>
        </Box>
      </div>
      <ToastContainer />
    </div>
  );
}
