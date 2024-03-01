import { LineSet } from "../LineChart/types";

export const LINE_SETS: LineSet[] = [
  {
    data: [
      { x: 1, y: 20 },
      { x: 2, y: 18 },
      { x: 3, y: 10 },
      { x: 4, y: 10 },
      { x: 5, y: 22 },
      { x: 6, y: 33 },
      { x: 7, y: 32 },
      { x: 8, y: 22 },
      { x: 9, y: 34 },
      { x: 10, y: 20 },
      { x: 11, y: 20 },
      { x: 12, y: 20 },
      { x: 13, y: 20 },
      { x: 14, y: 18 },
      { x: 15, y: 10 },
      { x: 16, y: 10 },
      { x: 17, y: 22 },
      { x: 18, y: 33 },
      { x: 19, y: 32 },
      { x: 20, y: 22 },
      { x: 21, y: 34 },
      { x: 22, y: 20 },
      { x: 23, y: 20 },
      { x: 24, y: 20 },
      { x: 25, y: 20 },
      { x: 26, y: 18 },
      { x: 27, y: 10 },
      { x: 28, y: 10 },
      { x: 28, y: 22 },
      { x: 30, y: 33 },
      { x: 31, y: 32 },
      { x: 32, y: 22 },
      { x: 33, y: 34 },
      { x: 34, y: 20 },
      { x: 35, y: 20 },
      { x: 36, y: 20 },
    ],
    strokeColor: "rgba(226, 226, 226, 1)",
    backgroundColorLine: "rgba(7, 1, 1, 0.05)",
    label: "2022",
  },
  {
    data: [
      { x: 1, y: 30 },
      { x: 2, y: 23 },
      { x: 3, y: 45 },
      { x: 4, y: 34 },
      { x: 5, y: 23 },
      { x: 6, y: 56 },
      { x: 7, y: 43 },
      { x: 8, y: 42 },
      { x: 9, y: 34 },
      { x: 10, y: 22 },
      { x: 11, y: 23 },
      { x: 12, y: 27 },
      { x: 13, y: 27 },
      { x: 14, y: 19 },
      { x: 15, y: 18 },
      { x: 16, y: 21 },
      { x: 17, y: 22 },
      { x: 18, y: 33 },
      { x: 19, y: 39 },
      { x: 20, y: 22 },
      { x: 21, y: 34 },
      { x: 22, y: 23 },
      { x: 23, y: 18 },
      { x: 24, y: 27 },
      { x: 25, y: 23 },
      { x: 26, y: 12 },
      { x: 27, y: 19 },
      { x: 28, y: 11 },
      { x: 28, y: 28 },
      { x: 30, y: 30 },
      { x: 31, y: 42 },
      { x: 32, y: 42 },
      { x: 33, y: 24 },
      { x: 34, y: 30 },
      { x: 35, y: 40 },
      { x: 36, y: 50 },
      { x: 37, y: 42 },
      { x: 38, y: 34 },
      { x: 39, y: 22 },
      { x: 40, y: 23 },
      { x: 41, y: 27 },
      { x: 42, y: 27 },
      { x: 43, y: 19 },
      { x: 44, y: 18 },
      { x: 45, y: 21 },
      { x: 46, y: 22 },
      { x: 47, y: 33 },
      { x: 48, y: 39 },
      { x: 49, y: 22 },
      { x: 50, y: 34 },
      { x: 51, y: 23 },
    ],
    strokeColor: "rgba(175, 22, 133, 1)",
    label: "2023",
    backgroundColorLine: "rgba(135, 12, 102, 0.05)",
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
