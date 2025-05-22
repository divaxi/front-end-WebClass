import type { SxProps, Theme } from "@mui/material";

export const styles = {
  root: {
    minHeight: "100vh",
    background: "linear-gradient(90deg, #1976d2 0%, #2196f3 50%, #64b5f6 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  } as SxProps<Theme>,

  container: {
    maxWidth: "1400px",
    width: "100%",
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    gap: 4,
    margin: "auto",
  } as SxProps<Theme>,

  infoSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "white",
    padding: { xs: 2, md: 4 },
  } as SxProps<Theme>,

  title: {
    fontSize: { xs: "2rem", md: "3rem" },
    textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
  } as SxProps<Theme>,

  subtitle: {
    fontSize: { xs: "1.5rem", md: "2.5rem" },
    textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
  } as SxProps<Theme>,

  description: {
    mt: 3,
    opacity: 0.9,
    lineHeight: 1.6,
    maxWidth: "500px",
  } as SxProps<Theme>,

  formSection: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as SxProps<Theme>,

  paper: {
    width: "100%",
    maxWidth: "500px",
    padding: 4,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
  } as SxProps<Theme>,

  iconWrapper: {
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "220px",
      height: "220px",
      borderRadius: "50%",
      background:
        "linear-gradient(45deg, rgba(33, 150, 243, 0.1) 0%, rgba(25, 118, 210, 0.1) 100%)",
      zIndex: 0,
    },
  } as SxProps<Theme>,

  icon: {
    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
  } as React.CSSProperties,
};
