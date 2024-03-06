export interface DataPoint {
  x: number;
  y: number;
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tooltip_data?: any;
}

export interface LineSet {
  data: DataPoint[];
  strokeColor?: string;
  showPoints?: boolean;
  label?: string;
  dashedParamater?: number;
  backgroundColorLine?: string;
}
export interface CustomToolTipData {
  value: {
    x: number;
    y: number;
  };
  label: string;
  xLabel: string;
}

export interface LineChartProps {
  lineSets: LineSet[];
  height?: number;
  width?: number;
  lineToShowPointInfo?: number;
  hideXlabels?: boolean;
  showPoints?: boolean;
  horizontalGuides?: {
    count?: number;
    color?: string;
    dashed?: boolean;
    stroke?: number;
  };
  verticalGuides?: boolean;
  precision?: number;
  stroke?: number;
  xAxisLabels?: string[];
  customToolTip?: (data: CustomToolTipData) => JSX.Element;
  fontSize?: number;
  showTooltip?: boolean;
}
