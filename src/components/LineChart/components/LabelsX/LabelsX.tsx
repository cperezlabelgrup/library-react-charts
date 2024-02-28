import React from "react";

interface LabelsXProps {
    FONT_SIZE: number;
    padding: number;
    dimensiones: { width: number; height: number };
    labels: string[];
  }
  

const LabelsXAxis = ({ FONT_SIZE, padding, dimensiones, labels }: LabelsXProps) => {
    const y = dimensiones.height - padding + FONT_SIZE * 3;
    const chartWidth = dimensiones.width - padding * 2;
    // calcular el fontSize según el ancho del gráfico
    return labels.map((label, index) => {
      const x =
        (index / (labels.length - 1)) * chartWidth + padding - FONT_SIZE / 2;
      return (
        <text
          key={index}
          x={x}
          y={y}
          style={{
            fill: "rgba(177, 177, 177, 1)",
            fontSize: "0.8rem",
            fontFamily: "Roboto",
            textAnchor: "middle",
          }}
        >
          {label}
        </text>
      );
    });
  };

  export default LabelsXAxis;