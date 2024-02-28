import React from "react";


interface HorizontalGuidesProps {
    padding: number;
    dimensiones: { width: number; height: number };
    chartHeight: number;
    horizontalGuides: {
        count?: number;
        color?: string;
        dashed?: boolean;
        stroke?: number;
    };
  }
  

const HorizontalGuides = ({ padding, dimensiones, chartHeight, horizontalGuides }: HorizontalGuidesProps) => {
    const startX = padding;
    const endX = dimensiones.width - padding;
    const countGuides = horizontalGuides?.count || 10;
    let horizontalGuidesMax = countGuides;
    if (countGuides > 6) {
      horizontalGuidesMax = 6;
    }
    return new Array(horizontalGuidesMax).fill(0).map((_, index) => {
      const ratio = (index + 1) / horizontalGuidesMax;
      const yCoordinate = chartHeight - chartHeight * ratio + padding + 2;

      return (
        <React.Fragment key={index}>
          <polyline
            fill="none"
            strokeDasharray={horizontalGuides.dashed ? "4,4" : "none"}
            strokeWidth=".6"
            points={`${startX},${yCoordinate} ${endX},${yCoordinate}`}
            style={{
              opacity: 0.5,
              stroke: horizontalGuides.color,
              strokeWidth: horizontalGuides.stroke,
            }}
          />
        </React.Fragment>
      );
    });
  };

  export default HorizontalGuides;