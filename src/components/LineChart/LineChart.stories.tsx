import type { Meta, StoryObj } from "@storybook/react";
import LineChart from "./LineChart";
import React from "react";
import { LABELS, LINE_SETS } from "../constants/moockData";
import { LineChartProps } from "./types";

const meta: Meta<typeof LineChart> = {
  title: "Charts/LineChart",
  component: LineChart,
};
export default meta;
type Story = StoryObj<typeof LineChart>;
export const Default: Story = (args: LineChartProps) => (
  <div
    style={{
      margin: "0 auto",
      width: "90%",
      marginTop: 50,
      fontFamily: "Arial, sans-serif",
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
    }}
  >
    <div
     style={{
      width: "600px",
      height: "230px",
      margin: "0 auto",
      border: "1px solid #E0E0E0",
      
     }}
    className="">
    <LineChart
      {...args}
     />
     </div>
  </div>
);
Default.args = {
  lineSets: LINE_SETS,
  xAxisLabels: LABELS,
  lineToShowPointInfo: 1,
  horizontalGuides: {
    dashed: true,
    color: "#E0E0E0",
    stroke: 1,
    count: 5,
  },
};
