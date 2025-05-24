import { Typography, Paper, Box, Grid, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import PieChart from "./chart/PieChart";

export default function PieChartSection() {
  const [tab, setTab] = useState(0);

  // Dữ liệu mẫu cho các khoảng thời gian khác nhau
  const dataByPeriod = {
    daily: [
      { id: 0, value: 35, label: "Sản phẩm A" },
      { id: 1, value: 25, label: "Sản phẩm B" },
      { id: 2, value: 20, label: "Sản phẩm C" },
      { id: 3, value: 20, label: "Sản phẩm D" },
    ],
    weekly: [
      { id: 0, value: 40, label: "Sản phẩm A" },
      { id: 1, value: 30, label: "Sản phẩm B" },
      { id: 2, value: 15, label: "Sản phẩm C" },
      { id: 3, value: 15, label: "Sản phẩm D" },
    ],
    monthly: [
      { id: 0, value: 45, label: "Sản phẩm A" },
      { id: 1, value: 25, label: "Sản phẩm B" },
      { id: 2, value: 20, label: "Sản phẩm C" },
      { id: 3, value: 10, label: "Sản phẩm D" },
    ],
  };

  // Lấy dữ liệu dựa trên tab được chọn
  const getDataByTab = () => {
    switch (tab) {
      case 0:
        return dataByPeriod.daily;
      case 1:
        return dataByPeriod.weekly;
      case 2:
        return dataByPeriod.monthly;
      default:
        return dataByPeriod.daily;
    }
  };

  return (
    <Grid size={{ md: 12, lg: 5 }} width={"100%"}>
      <Paper sx={{ p: 2, height: "100%" }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Phân bố doanh thu theo sản phẩm
        </Typography>
        <Tabs
          value={tab}
          onChange={(event, newValue) => {
            setTab(newValue);
          }}
          sx={{ mb: 2 }}
        >
          <Tab label="Ngày" tabIndex={0} sx={{ fontFamily: "Inter" }} />
          <Tab label="Tuần" tabIndex={1} sx={{ fontFamily: "Inter" }} />
          <Tab label="Tháng" tabIndex={2} sx={{ fontFamily: "Inter" }} />
        </Tabs>
        <Box sx={{ height: "calc(100% - 8rem)" }}>
          <PieChart data={getDataByTab()} />
        </Box>
      </Paper>
    </Grid>
  );
}
