import { Typography, Paper, Box, Grid, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import PieChart from "./chart/PieChart";
import { useSatisticTotalOrderEachStatus } from "@/client/services/satistic";
import { format, startOfDay, startOfWeek, startOfMonth } from "date-fns";
import type { SatisticControllerTotalOrderEachStatusV1Response } from "@/client/api";
import { ORDER_STATUS_LABEL } from "@/lib/constant";

const mapper = (
  data: SatisticControllerTotalOrderEachStatusV1Response | undefined
) => {
  if (!data) return [];
  return data.map((item, index) => ({
    id: index,
    value: item.total,
    label: ORDER_STATUS_LABEL[item.status as keyof typeof ORDER_STATUS_LABEL],
  }));
};

export default function PieChartSection() {
  const [tab, setTab] = useState(0);
  const [startDate, setStartDate] = useState(
    format(startOfDay(startOfDay(new Date())), "yyyy-MM-dd'T'HH:mm:ss")
  );

  const { data: totalOrderEachStatus } = useSatisticTotalOrderEachStatus({
    startDate,
    endDate: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
    let newStartDate = startDate;

    switch (newValue) {
      case 0:
        newStartDate = format(startOfDay(new Date()), "yyyy-MM-dd'T'HH:mm:ss");
        break;
      case 1:
        newStartDate = format(
          startOfWeek(new Date(), { weekStartsOn: 1 }),
          "yyyy-MM-dd'T'HH:mm:ss"
        );

        break;
      case 2:
        newStartDate = format(
          startOfMonth(new Date()),
          "yyyy-MM-dd'T'HH:mm:ss"
        );
        break;
    }
    setStartDate(newStartDate);
  };

  return (
    <Grid size={12} width={"100%"}>
      <Paper sx={{ p: 2, height: "100%" }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Phân bố đơn hàng theo trạng thái
        </Typography>
        <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 2 }}>
          <Tab label="Ngày" tabIndex={0} sx={{ fontFamily: "Inter" }} />
          <Tab label="Tuần" tabIndex={1} sx={{ fontFamily: "Inter" }} />
          <Tab label="Tháng" tabIndex={2} sx={{ fontFamily: "Inter" }} />
        </Tabs>
        <Box sx={{ height: "calc(100% - 8rem)" }}>
          <PieChart data={mapper(totalOrderEachStatus)} />
        </Box>
      </Paper>
    </Grid>
  );
}
