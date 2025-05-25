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
      slotProps={{
        legend: {
          position: { vertical: "top", horizontal: "end" },
        },
      }}
    />
  );
}
