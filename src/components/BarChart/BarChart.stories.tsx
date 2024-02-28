import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { BAR_LABELS, BAR_SETS } from "../constants/moockData";
import BarChart, { BarChartProps } from "./BarChart";

const meta: Meta<typeof BarChart> = {
  title: "Charts/BarChart",
  component: BarChart,
};
export default meta;
type Story = StoryObj<typeof BarChart>;
export const Default: Story = (args: BarChartProps) => (
  <div
    style={{
      margin: "0 auto",
      width: "1000px",
      backgroundColor: "",
      marginTop: 50,
      fontFamily: "Arial, sans-serif",
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
    }}
  >
    <BarChart {...args} />
  </div>
);
Default.args = {
    series: BAR_SETS,
    xAxisLabels: BAR_LABELS,
    width: 220,
   
};
