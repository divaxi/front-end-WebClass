import { Paper, Tab, Tabs, Box, Grid } from "@mui/material";
import { useState } from "react";
import LineChart from "./chart/LineChart";
import { useSatisticByTime } from "@/client/services/satistic";
import { addDays, format, startOfWeek, startOfYear, subYears } from "date-fns";
import type { SatisticControllerCountOrderByTimeV1Response } from "@/client/api";
import {
  placeholerDataForLineChartDayByDay,
  placeholerDataForLineChartMonthByMonth,
  placeholerDataForLineChartYearByYear,
} from "@/lib/constant";

const mapper = (
  data: SatisticControllerCountOrderByTimeV1Response | undefined,
  key: "day" | "month" | "year"
) => {
  if (!data) return [];
  let placeholderData;
  switch (key) {
    case "day":
      placeholderData = placeholerDataForLineChartDayByDay;
      data.data.forEach((item) => {
        const date = addDays(
          startOfYear(new Date(new Date().getFullYear(), 0, 1)),
          (item.day as any) - 1
        );
        item.day = format(date, "EEEE");
      });
      break;
    case "month":
      placeholderData = placeholerDataForLineChartMonthByMonth;
      break;
    case "year":
      placeholderData = placeholerDataForLineChartYearByYear;
      break;
  }
  const dataMap = new Map(
    data.data.map((item) => [
      item[key]?.toString() || "",
      {
        count: item.count || 0,
        revenue: item.revenue || 0,
      },
    ])
  );
  return placeholderData.map((item) => {
    const actualData = dataMap.get(item.label.toString());
    return {
      label: item.label.toString(),
      count: actualData?.count || 0,
      revenue: actualData?.revenue || 0,
    };
  });
};

export default function LineChartSection() {
  const [tab, setTab] = useState(0);
  const [startDate, setStartDate] = useState(
    format(
      startOfWeek(new Date(), { weekStartsOn: 1 }),
      "yyyy-MM-dd'T'HH:mm:ss"
    )
  );

  const [enumerateBy, setEnumerateBy] = useState<"day" | "month" | "year">(
    "day"
  );

  const { data: satisticStats } = useSatisticByTime({
    startDate,
    endDate: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
    enumerateBy,
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
    let newStartDate = startDate;

    switch (newValue) {
      case 0:
        newStartDate = format(
          startOfWeek(new Date(), { weekStartsOn: 1 }),
          "yyyy-MM-dd'T'HH:mm:ss"
        );
        setEnumerateBy("day");
        break;
      case 1:
        newStartDate = format(startOfYear(new Date()), "yyyy-MM-dd'T'HH:mm:ss");
        setEnumerateBy("month");
        break;
      case 2:
        newStartDate = format(subYears(new Date(), 7), "yyyy-MM-dd'T'HH:mm:ss");
        setEnumerateBy("year");
        break;
    }
    setStartDate(newStartDate);
  };

  const mappedData = mapper(satisticStats, enumerateBy);
  return (
    <>
      <Grid size={{ lg: 6, md: 12 }}>
        <Paper sx={{ height: "48vh", width: "100%", padding: "1rem" }}>
          <Tabs value={tab} onChange={handleTabChange}>
            <Tab label="Tuần" tabIndex={0} sx={{ fontFamily: "Inter" }}></Tab>
            <Tab label="Tháng" tabIndex={1} sx={{ fontFamily: "Inter" }}></Tab>
            <Tab label="Năm" tabIndex={2} sx={{ fontFamily: "Inter" }}></Tab>
          </Tabs>
          <Box sx={{ height: "calc(100% - 48px)", width: "100%" }}>
            <LineChart
              data={mappedData.map((item) => ({
                label: item.label,
                count: item.count,
              }))}
              labelsLegend={["Đơn hàng"]}
              color={"#2196f3"}
            />
          </Box>
        </Paper>
      </Grid>
      <Grid size={{ lg: 6, md: 12 }}>
        <Paper sx={{ height: "48vh", width: "100%", padding: "1rem" }}>
          <Tabs value={tab} onChange={handleTabChange}>
            <Tab label="Tuần" tabIndex={0} sx={{ fontFamily: "Inter" }}></Tab>
            <Tab label="Tháng" tabIndex={1} sx={{ fontFamily: "Inter" }}></Tab>
            <Tab label="Năm" tabIndex={2} sx={{ fontFamily: "Inter" }}></Tab>
          </Tabs>
          <Box sx={{ height: "calc(100% - 48px)", width: "100%" }}>
            <LineChart
              data={mappedData.map((item) => ({
                label: item.label,
                count: item.revenue,
              }))}
              labelsLegend={["Doanh thu"]}
              color={"#ff9800"}
            />
          </Box>
        </Paper>
      </Grid>
    </>
  );
}
