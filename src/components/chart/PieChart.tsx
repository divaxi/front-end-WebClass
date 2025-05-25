import { PieChart as MuiPieChart } from "@mui/x-charts/PieChart";

interface PieChartData {
  id: number;
  value: number;
  label: string;
}

interface PieChartProps {
  data: PieChartData[];
  title?: string;
}

const CHART_COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEEAD",
  "#D4A5A5",
  "#9B59B6",
  "#3498DB",
  "#E67E22",
  "#2ECC71",
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEEAD",
  "#D4A5A5",
];

export default function PieChart({ data }: PieChartProps) {
  const placeholderData = [{ id: 1, value: 100, label: "Không có dữ liệu" }];

  const chartData =
    data.length === 0 ||
    data.map((item) => item.value).every((value) => value === 0)
      ? placeholderData
      : data;

  return (
    <MuiPieChart
      series={[
        {
          data: chartData,
          highlightScope: { fade: "global", highlight: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
        },
      ]}
      height={300}
      colors={CHART_COLORS}
      slotProps={{
        legend: {
          position: { vertical: "top", horizontal: "end" },
        },
      }}
    />
  );
}
