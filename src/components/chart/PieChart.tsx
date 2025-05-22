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

export default function PieChart({ data, title }: PieChartProps) {
  return (
    <MuiPieChart
      series={[
        {
          data: data,
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
