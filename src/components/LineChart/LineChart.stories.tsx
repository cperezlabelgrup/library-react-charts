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
      width: "60%",
      height: "350px",
      margin: "0 auto",
      backgroundColor: "",
      marginTop: 50,
      fontFamily: "Arial, sans-serif",
    }}
  >
    <LineChart {...args} />
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
  customToolTip: (data) => (
    <div
      style={{
        backgroundColor: "#424242",
        color: "white",
        padding: "4px",
        borderRadius: "5px",
        fontWeight: "bold",
        fontSize: "0.8rem",
      }}
    >
      <span>custom tooltip</span>
    </div>
  ),
};
