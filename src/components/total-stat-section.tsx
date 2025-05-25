import { Paper, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PeopleIcon from "@mui/icons-material/People";
import { useSatisticTotalCustomer, useSatisticTotalOrder } from "@/client/services/satistic";
import { format } from "date-fns";
import { useSatisticTotalRevenue } from "@/client/services/satistic";
import { formatCurrency } from "@/lib/utils";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function TotalStatSection() {
  const { data: totalOrder, error: errorOrder } = useSatisticTotalOrder({
    startDate: format(new Date(1970, 0, 1), "yyyy-MM-dd"),
    endDate: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
  });
  const { data: totalRevenue, error: errorRevenue } = useSatisticTotalRevenue({
    startDate: format(new Date(1970, 0, 1), "yyyy-MM-dd"),
    endDate: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
  });
  const { data: totalCustomer, error: errorCustomer } = useSatisticTotalCustomer({
    startDate: format(new Date(1970, 0, 1), "yyyy-MM-dd"),
    endDate: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
  });

  useEffect(() => {
    if (errorOrder || errorRevenue || errorCustomer) {
      toast.error("Lỗi khi tải dữ liệu thống kê");
    }
  }, [errorOrder, errorRevenue, errorCustomer]);

  return (
    <>
      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "#e3f2fd",
            borderRadius: 2,
            "&:hover": {
              transform: "translateY(-5px)",
              transition: "transform 0.3s ease-in-out",
              boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
            },
          }}
        >
          <Box
            sx={{
              color: "#1976d2",
              mb: 2,
              p: 1.5,
              borderRadius: "50%",
              bgcolor: "rgba(25, 118, 210, 0.1)",
            }}
          >
            <ShoppingCartIcon sx={{ fontSize: 40 }} />
          </Box>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Tổng số đơn hàng
          </Typography>
          <Typography variant="h4" color="primary" fontWeight="bold">
            {totalOrder?.total}
          </Typography>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "#e8f5e9",
            borderRadius: 2,
            "&:hover": {
              transform: "translateY(-5px)",
              transition: "transform 0.3s ease-in-out",
              boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
            },
          }}
        >
          <Box
            sx={{
              color: "#2e7d32",
              mb: 2,
              p: 1.5,
              borderRadius: "50%",
              bgcolor: "rgba(46, 125, 50, 0.1)",
            }}
          >
            <AttachMoneyIcon sx={{ fontSize: 40 }} />
          </Box>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Tổng doanh thu
          </Typography>
          <Typography variant="h4" color="success.main" fontWeight="bold">
            {formatCurrency(totalRevenue?.total || 0)}
          </Typography>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "#fff3e0",
            borderRadius: 2,
            "&:hover": {
              transform: "translateY(-5px)",
              transition: "transform 0.3s ease-in-out",
              boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
            },
          }}
        >
          <Box
            sx={{
              color: "#f57c00",
              mb: 2,
              p: 1.5,
              borderRadius: "50%",
              bgcolor: "rgba(245, 124, 0, 0.1)",
            }}
          >
            <PeopleIcon sx={{ fontSize: 40 }} />
          </Box>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Tổng số khách hàng
          </Typography>
          <Typography variant="h4" color="warning.main" fontWeight="bold">
            {totalCustomer?.total}
          </Typography>
        </Paper>
      </Grid>
    </>
  );
}
