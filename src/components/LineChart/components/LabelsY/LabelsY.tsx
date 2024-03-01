import React from "react";


interface LabelsYProps {
    FONT_SIZE: number;
    fontSize?: number;
    padding: number;
    chartHeight: number;
    horizontalGuides: {
        count?: number;
        color?: string;
        dashed?: boolean;
        stroke?: number;

    };
    minY: number;
    maxY: number;
  }
  
const LabelsY = ({FONT_SIZE,fontSize, padding, chartHeight, horizontalGuides, minY, maxY}: LabelsYProps) => {
    const x = FONT_SIZE * 0;
    const countGuides = horizontalGuides?.count || 10;
    let horizontalGuidesMax = countGuides;
    if (countGuides > 6) {
      horizontalGuidesMax = 6;
    }

    const labels = [
      { label: minY.toString(), y: chartHeight + padding + FONT_SIZE / 2 },
      ...new Array(horizontalGuidesMax).fill(0).map((_, index) => {
        const ratio = (index + 1) / horizontalGuidesMax;
        const yCoordinate = chartHeight - chartHeight * ratio + padding;
        const y = yCoordinate + FONT_SIZE / 4;

        return {
          label: Math.round(minY + (maxY - minY) * ratio).toLocaleString(),
          y,
        };
      }),
    ];

    return labels.map((point, index) => (
      <text
        key={index}
        x={x - FONT_SIZE * 2}
        y={point.y}
        style={{
          fill: "rgba(177, 177, 177, 1)",
          fontSize: fontSize || "10px",
          fontFamily: "Roboto",
        }}
      >
        {point.label}
      </text>
    ));
  };

  export default LabelsY;