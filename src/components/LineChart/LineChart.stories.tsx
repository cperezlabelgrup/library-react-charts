import type { Meta, StoryObj } from "@storybook/react";
import LineChart, { LineChartProps } from "./LineChart";
import React from "react";
import { LABELS, LINE_SETS } from "../constants/moockData";

const meta: Meta<typeof LineChart> = {
  title: "Charts/LineChart",
  component: LineChart,
};
export default meta;
type Story = StoryObj<typeof LineChart>;
export const Default: Story = (args: LineChartProps) => (
  <div
    style={{
      width: "100%",
      height: "",
      margin: "0 auto",
      padding: "20px",
      marginTop: 50,
      backgroundColor: "grey",
      fontFamily: "Arial, sans-serif",
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "50px",
    }}
  >
    <div style={{
      width: '600px',
      height: '250px'
    }}>
    <LineChart {...args} />
    </div>
    <div>
    <LineChart {...args} />
    </div>
    <div>
    <LineChart {...args} />
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
