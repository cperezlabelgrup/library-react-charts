import { LineSet } from "../LineChart/types";

export const LINE_SETS: LineSet[] = [
  {
    data: [
      { x: 1, y: 0 },
      { x: 2, y: 18 },
      { x: 3, y: 20 },
      { x: 4, y: 21 },
      { x: 5, y: 22 },
      { x: 6, y: 23 },
      { x: 7, y: 20 },
      { x: 8, y: 25 },
      { x: 9, y: 22 },
      { x: 10, y: 30 },
      { x: 11, y: 27 },
      { x: 12, y: 35 },
    ],
    strokeColor: "rgba(226, 226, 226, 1)",
    label: "2022",
  },
  {
    data: [
      {
        x: 1,
        y: 10,
      },
      { x: 2, y: 15 },
      { x: 3, y: 15 },
      { x: 4, y: 30 },
      { x: 5, y: 40 },
      { x: 6, y: 35 },
      { x: 7, y: 43 },
      { x: 8, y: 20 },
      { x: 9, y: 66 },
      { x: 10, y: 10 },
      { x: 11, y: 52 },
      { x: 12, y: 67 },
    ],
    backgroundColorLine: "rgba(175, 22, 133, 0.05)",
    dashedParamater: 11,
  },
];

export const LABELS = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

const strokeColor = (data: number) => {
  console.log(data);
  if (data <= 4000) {
    return "rgba(175, 22, 133, 1)";
  } else if (data <= 8000) {
    return "rgba(175, 22, 133, 0.4)";
  } else {
    return "rgba(175, 22, 133, 0.2)";
  }
};

export const BAR_SETS = [
  {
    name: "Net Profit",
    data: [3900, 7800, 10000],
    strokeColor: strokeColor,
  },
];

export const BAR_LABELS = ["C: 24% Dto.", "B: 19% Dto.", "A: 12% Dto."];
