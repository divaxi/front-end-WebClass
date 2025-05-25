import { LineChart as MuiLineChart } from "@mui/x-charts/LineChart";

interface DataPoint {
  label: string;
  [key: string]: string | number;
}

interface LineChartProps {
  data: DataPoint[];
  title?: string;
  labelsLegend: string[];
  color?: string;
}

export default function LineChart({
  data,
  labelsLegend,
  color,
}: LineChartProps) {
  if (!data || data.length === 0) {
    return <div>Không có dữ liệu để hiển thị</div>;
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
        color,
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
