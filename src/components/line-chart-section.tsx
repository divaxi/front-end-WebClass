import { Grid, Paper, Tab, Tabs, Box } from "@mui/material";
import { useState } from "react";
import LineChart from "./chart/LineChart";

const sampleData = [
  { label: "Feb", revenue: 4000, cost: 2400 },
  { label: "March", revenue: 3000, cost: 1398 },
  { label: "April", revenue: 5000, cost: 3800 },
  { label: "May", revenue: 2780, cost: 3908 },
  { label: "June", revenue: 1890, cost: 4800 },
  { label: "July", revenue: 2390, cost: 3800 },
];

export default function LineChartSection() {
  const [tab, setTab] = useState(0);

  return (
    <Grid size={{ md: 12, lg: 7 }} height={"48vh "}>
      <Paper sx={{ height: "100%", width: "100%", padding: "1rem" }}>
        <Tabs
          value={tab}
          onChange={(event, newValue) => {
            setTab(newValue);
          }}
        >
          <Tab label="Tuần" tabIndex={0} sx={{ fontFamily: "Inter" }}></Tab>
          <Tab label="Tháng" tabIndex={1} sx={{ fontFamily: "Inter" }}></Tab>
          <Tab label="Năm" tabIndex={2} sx={{ fontFamily: "Inter" }}></Tab>
        </Tabs>
        <Box sx={{ height: "100%", width: "100%" }}>
          <LineChart
            data={sampleData}
            labelsLegend={["Doanh thu", "Đơn hàng"]}
          />
        </Box>
      </Paper>
    </Grid>
  );
}
