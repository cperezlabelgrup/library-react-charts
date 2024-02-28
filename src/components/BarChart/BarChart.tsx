import React, { useRef, useState } from "react";
import "./styles.css";

// strokeColor puede ser un string o una funcion que recibe los datos y retorna un string
type strokeColor = string | ((data: number) => string);

export interface BarChartProps {
  series: { name?: string; data: number[]; strokeColor?: strokeColor }[];
  xAxisLabels: string[];
  width?: number;
  height?: number;
  showXAxisLabels?: boolean;
}

const BarChart = ({
  series,
  xAxisLabels,
  width,
  height,
  showXAxisLabels,
}: BarChartProps) => {
  const [chartDimensions] = useState({
    width: width || 300,
    height: height || 400,
  });
  const [tooltip, setTooltip] = useState({
    visible: false,
    content: {
        value: 0,
        label: "",
        serie: "",
    },
    x: 0,
    y: 0,
  });

  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  const refContainer = useRef<HTMLDivElement>(null);

  const marginBottom = 40; // Espacio para las etiquetas del eje X
  const marginLeft = 50; // Espacio para las etiquetas del eje Y
  const chartHeight = chartDimensions.height - marginBottom;
  const totalHeight = chartHeight + marginBottom;
  const barWidth = chartDimensions.width / xAxisLabels.length / 3
  const gapBetweenBars = 5; // Espacio entre barras de la misma categoría
  const gapBetweenGroups = 20; // Espacio entre grupos de barras

  // Calcular el valor máximo para escalar las barras
  const maxValue = Math.max(...series.flatMap((s) => s.data));
  const getBarHeight = (value: number) => (value / maxValue) * chartHeight;

  // Calcular el ancho total del gráfico basado en la cantidad de elementos y series
  const numGroups = xAxisLabels.length;
  const barsInGroup = series.length;
  const groupWidth =
    barsInGroup * barWidth + (barsInGroup - 1) * gapBetweenBars;
  const chartWidth =
    numGroups * groupWidth + (numGroups + 1) * gapBetweenGroups + marginLeft;
  // Calcular guías y etiquetas para el eje Y
  const yAxisLabelsCount = 5; // Número de etiquetas en el eje Y, incluyendo el cero
  const yAxisInterval = maxValue / (yAxisLabelsCount - 1);

  return (
    <div
      ref={refContainer}
      style={{ 
         width: chartDimensions.width,
         maxWidth: "100%", 
         maxHeight: "100%",
         backgroundColor: "",
         }}
    >
      <svg
        viewBox={`0 0 ${chartWidth} ${totalHeight}`}
        style={{ overflow: "visible" }}
      >
        {/* Dibujar las guías horizontales y las etiquetas del eje Y */}
        {Array.from({ length: yAxisLabelsCount }).map((_, index) => {
          const yValue = index * yAxisInterval;
          const yPosition = chartHeight - (yValue / maxValue) * chartHeight;
          return (
            <React.Fragment key={index}>
              <line
                x1={10}
                y1={yPosition}
                x2={chartWidth}
                y2={yPosition}
                stroke="#e0e0e0"
                strokeWidth={0.6}
                strokeDasharray={"6 6"}
              />
              <text
                x={0}
                y={yPosition + 5}
                fill="rgba(177, 177, 177, 1)"
                fontSize="12"
                textAnchor="end"
              >
                {yValue}
              </text>
            </React.Fragment>
          );
        })}

        {series.map((serie, serieIndex) =>
          serie.data.map((value, index) => {
            const x =
              index * (groupWidth + gapBetweenGroups) +
              serieIndex * (barWidth + gapBetweenBars) +
              marginLeft;
            const y = chartHeight - getBarHeight(value);
            return (
              <rect
                key={`${serieIndex}-${index}`}
                x={x}
                y={chartHeight}
                onMouseEnter={() => {
                  setHoveredBar(`${serieIndex}-${index}`);
                  setTooltip({
                    visible: true,
                    content: {
                        value,
                        label: xAxisLabels[index],
                        serie: serie.name || `Serie ${serieIndex + 1}`,
                    },
                    x: x + barWidth / 2, // Centra el tooltip sobre la barra
                    y: y - 10, // Posiciona el tooltip un poco arriba de la barra
                  });
                }}
                onMouseLeave={() => {
                  setHoveredBar(null);
                  setTooltip({ ...tooltip, visible: false });
                }}
                rx={10}
                ry={10}
                width={barWidth}
                style={{
                  opacity: hoveredBar === `${serieIndex}-${index}` ? 0.7 : 1,
                }}
                height={0}
                fill={
                  typeof serie.strokeColor === "function"
                    ? (serie.strokeColor as (data: number) => string)(value)
                    : serie.strokeColor || "rgba(0, 0, 0, 0.7)"
                }
              >
                <animate
                  attributeName="y"
                  from={chartHeight} // Desde la base del gráfico
                  to={chartHeight - getBarHeight(value)} // Hasta la altura calculada
                  dur="0.6s"
                  fill="freeze"
                />
                <animate
                  attributeName="height"
                  from="0" // De altura 0
                  to={getBarHeight(value)} // A la altura final calculada
                  dur="0.6s"
                  fill="freeze"
                />
              </rect>
            );
          })
        )}

        {/* Etiquetas del eje X */}
        {showXAxisLabels &&
          xAxisLabels.map((label, index) => (
            <text
              key={index}
              x={
                index * (groupWidth + gapBetweenGroups) +
                groupWidth / 2 +
                marginLeft
              }
              y={chartHeight + 20}
              style={{
                fill: "rgba(177, 177, 177, 1)",
                fontSize: "1rem",
                fontFamily: "Inter",
                textAnchor: "middle",
              }}
            >
              {label}
            </text>
          ))}
        {tooltip.visible && (
          <foreignObject
            x={tooltip.x - 50}
            y={tooltip.y - 20}
            overflow="visible"
            >
            <div
             style={{
                backgroundColor: "white",
                boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
                color: "",
                borderRadius: "5px",
                overflow: "hidden",
                width: "max-content",
                fontSize: "0.7rem",
                animation: "fadeIn 0.3s ease-out forwards",
             }}
            className="tooltip">
                <span
                 style={{
                    fontWeight: "bold",
                    padding: "3px",
                    display: "block",
                    textAlign: "center",
                    backgroundColor: "",
                 }}
                >
                    {tooltip.content.label}
                </span>
                <div
                    style={{
                        padding: "5px",
                        textAlign: "center",
                        display: "flex",
                        gap: "5px",
                    }}
                >
                    <div
                        style={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "100%",
                            backgroundColor: series ? (typeof series[0].strokeColor === "function" ? (series[0].strokeColor as (data: number) => string)(tooltip.content.value) : series[0].strokeColor) : "rgba(0, 0, 0, 0.7)",
                        }}
                    />
                    {tooltip.content.serie}: <span
                        style={{
                            fontWeight: "bold",
                        }}
                    >{tooltip.content.value}</span>
                </div>
                </div>
            </foreignObject>
        )}
      </svg>
    </div>
  );
};

export default BarChart;
