import PieChartSection from "@/components/pie-chart-section";
import LineChartSection from "@/components/line-chart-section";
import { Grid } from "@mui/material";
import TotalStatSection from "@/components/total-stat-section";

export default function DasboardPage() {
  return (
    <Grid container spacing={2} size={{ md: 12, lg: 12 }} sx={{ py: 6 }}>
      <TotalStatSection />
      <PieChartSection />
      <LineChartSection />
    </Grid>
  );
}
