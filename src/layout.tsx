import { Outlet, useLocation } from "react-router-dom";
import Header from "@/components/header";
import Sider from "@/components/sider";
import { useState } from "react";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import { LoadingSpinner } from "@/components/loading-spinner";
import { useMatches } from "react-router-dom";

interface RouteHandle {
  crumb?: string;
}

export default function Layout() {
  const location = useLocation();
  const matches = useMatches() as { handle?: RouteHandle }[];

  const crumbs = matches
    .filter((match) => match.handle?.crumb)
    .map((match) => match.handle?.crumb || "");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div
      style={{
        overflow: "hidden",
        display: "flex",
        backgroundColor: "#f7f7f8",
      }}
    >
      <Sider
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        location={location.pathname}
      />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
          }}
        >
          <Header onMenuClick={handleDrawerToggle} />
        </div>
        <Box
          sx={{
            marginTop: "64px",
            height: "calc(100vh - 64px)",
            padding: 2,
          }}
        >
          <LoadingSpinner />
          <Breadcrumbs>
            {crumbs.map((crumb, index) => (
              <Typography key={index}>{crumb} </Typography>
            ))}
          </Breadcrumbs>
          <Box
            sx={{
              height: "100%",
              width: "100%",
              overflow: "auto",
              alignContent: "center",
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </div>
    </div>
  );
}
