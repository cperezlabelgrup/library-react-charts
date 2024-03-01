import React, { useEffect, useState } from "react";

interface LabelsXProps {
  FONT_SIZE: number;
  padding: number;
  dimensiones: { width: number; height: number };
  labels: string[];
  fontSize?: number;
}

const LabelsXAxis = ({ FONT_SIZE, padding, dimensiones, labels, fontSize }: LabelsXProps) => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Limpiar el evento
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const chartWidth = dimensiones.width - padding * 2;

  return (
    <g>
      {labels.map((label, index) => {
        const x = (index / (labels.length - 1)) * chartWidth + padding;
        const yAdjustment = viewportWidth < 600 ? FONT_SIZE * 4 : FONT_SIZE * 3;
        const y = dimensiones.height - padding + yAdjustment;
        return (
          <text
            key={index}
            x={x}
            y={y}
            transform={`rotate(${viewportWidth < 600 ? '-80' : '0'},${x},${y})`}
            style={{
              fill: "rgba(177, 177, 177, 1)",
              fontSize: fontSize || '10px',
              fontFamily: "Roboto",
              textAnchor: "middle",
            }}
          >
            {label}
          </text>
        );
      })}
    </g>
  );
};

export default LabelsXAxis;
