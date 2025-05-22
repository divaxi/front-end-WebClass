import { Paper, Typography } from "@mui/material";
import { LineChart as MuiLineChart } from "@mui/x-charts/LineChart";

interface DataPoint {
  label: string;
  [key: string]: string | number;
}

interface LineChartProps {
  data: DataPoint[];
  title?: string;
  labelsLegend: string[];
}

let colorArray = [
  "#2196f3",
  "#f44336",
  "#4caf50",
  "#ff9800",
  "#9c27b0",
  "#ffeb3b",
  "#795548",
  "#673ab7",
  "#2196f3",
  "#f44336",
  "#4caf50",
  "#ff9800",
  "#9c27b0",
  "#ffeb3b",
  "#795548",
  "#673ab7",
];
export default function LineChart({ data, labelsLegend }: LineChartProps) {
  if (data.length > colorArray.length) {
    colorArray = colorArray.concat(colorArray);
  }

  if (Object.keys(data[0]).length - 1 !== labelsLegend.length) {
    throw new Error(
      "Số lượng labelsLegend không khớp với số lượng cột dữ liệu"
    );
  }

  return (
    <MuiLineChart
      sx={{ height: "calc(100% - 1rem)", width: "100%" }}
      series={labelsLegend.map((label, index) => ({
        data: data.map((item) => Number(Object.values(item)[index + 1])),
        label: label,
        color: colorArray[index],
      }))}
      xAxis={[
        {
          scaleType: "point",
          data: data.map((item) => item.label),
        },
      ]}
      slotProps={{
        legend: {
          position: { vertical: "top", horizontal: "end" },
        },
      }}
    />
  );
}
