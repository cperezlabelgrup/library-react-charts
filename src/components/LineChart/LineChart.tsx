import React, { useEffect } from "react";
import Tooltip from "./components/Tooltip";
import CirclePoint from "./components/CirclePoint";
import LinePaths from "./components/LinePaths";
import useLineChart from "./hooks/useLineChart";
import LabelsY from "./components/LabelsY/LabelsY";
import LabelsXAxis from "./components/LabelsX";
import { LineChartProps } from "./types";
import HorizontalGuides from "./components/HorizontalGuides";
// const STROKE = 0.6;

/**
 * LineChart es un componente React que renderiza un gráfico de líneas interactivo.
 * @component
 * @param {LineChartProps} props - Los props del componente LineChart.
 * @returns {JSX.Element} - Retorna un elemento SVG que representa el gráfico de líneas.
 */

const LineChart = ({
  lineSets,
  horizontalGuides = {
    count: 10,
    color: "#b5b3b38d",
    dashed: false,
    stroke: 1,
  },
  precision = 0,
  width,
  stroke = 2.6,
  fontSize,
  height,
  xAxisLabels = [],
  hideXlabels = false,
  lineToShowPointInfo = 0,
  showTooltip = true,
  showAllPoints = false,
  customToolTip,
}: LineChartProps): JSX.Element => {
  const refContainer = React.useRef<HTMLDivElement>(null);
  const {
    dimensiones,
    hoverPoint,
    targetPoint,
    pointsSets,
    padding,
    FONT_SIZE,
    chartHeight,
    minY,
    maxY,
    generatePath,
    generatePathDash,
    generateBackgroundPath,
    handleMouseMovePoint,
    handleMouseLeavePoint,
    setHoverPoint,
    setTargetPoint,
    setDimensiones,
  } = useLineChart(lineSets, lineToShowPointInfo, precision, refContainer);
  const [showPoint, setShowPoint] = React.useState(true);

  // coger el height del contenedor padre

  const handleResize = () => {
    if(refContainer.current) {
      const height = refContainer.current.parentElement?.clientHeight;
      const width = refContainer.current.parentElement?.clientWidth;
      setDimensiones({
        width: width || 600,
        height: height || 200,
      });
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }
  , []);


  return (
    <div
      ref={refContainer}
      style={{
        width: dimensiones.width,
        height: dimensiones.height,
      }}
    >
      <svg
        id="line-chart-component"
        width='100%'
        height='100%'
        overflow={"visible"}
        onMouseMove={(e) => {
          if (showAllPoints) return;
          handleMouseMovePoint(e);
          setShowPoint(true);
        }}
        onMouseLeave={() => {
          if (showAllPoints) return;
          handleMouseLeavePoint();
          setShowPoint(false);
        }}
      >
        {!hideXlabels && (
          <LabelsXAxis
            FONT_SIZE={FONT_SIZE}
            fontSize={fontSize}
            padding={padding}
            dimensiones={dimensiones}
            labels={xAxisLabels}
          />
        )}
        <LabelsY
          FONT_SIZE={FONT_SIZE}
          fontSize={fontSize}
          padding={padding}
          chartHeight={chartHeight}
          horizontalGuides={horizontalGuides}
          minY={minY}
          maxY={maxY}
        />
        <HorizontalGuides
          padding={padding}
          dimensiones={dimensiones}
          chartHeight={chartHeight}
          horizontalGuides={horizontalGuides}
        />
        {pointsSets.map((points, index) => (
          <LinePaths
            dimensiones={dimensiones}
            padding={padding}
            key={index}
            points={points}
            lineSets={lineSets}
            index={index}
            generatePathDash={generatePathDash}
            generatePath={generatePath}
            stroke={stroke}
            generateBackgroundPath={generateBackgroundPath}
          />
        ))}
        {/* Renderizar todos los puntos */}
        {showAllPoints &&
          pointsSets.map((points, lineIndex) => (
            <g key={lineIndex}>
              {points.map((point, pointIndex) => (
                <circle
                  cursor="pointer"
                  key={`${lineIndex}-${pointIndex}`}
                  cx={point.x}
                  cy={point.y}
                  r={5}
                  fill={"#666666"}
                  onMouseEnter={(e) => {
                   setHoverPoint({
                      x: point.x,
                      y: point.y,
                      visible: true,
                      lineIndex,
                    });
                    setTargetPoint({
                      x: point.x,
                      y: point.y,
                      visible: true,
                      index: pointIndex,
                    });
                  }}
                  onMouseLeave={() => {
                    handleMouseLeavePoint();
                  }}
                />
              ))}
            </g>
          ))}
        {/* Renderizar punto cuando el mouse está sobre el gráfico */}
        {hoverPoint.visible && showPoint && !showAllPoints && (
          <CirclePoint
            hoverPoint={hoverPoint}
            targetPoint={targetPoint}
            lineToShowPointInfo={lineToShowPointInfo}
            lineSets={lineSets}
          />
        )}
        {/* Renderizar Tooltip cuando el punto objetivo es visible */}
        {targetPoint.visible && showTooltip && (
          <Tooltip
            limitSvg={dimensiones}
            showAllPoints={showAllPoints}
            customToolTip={customToolTip}
            hoverPoint={hoverPoint}
            targetPoint={targetPoint}
            lineSets={lineSets}
            lineToShowPointInfo={lineToShowPointInfo}
            xAxisLabels={xAxisLabels}
          />
        )}
      </svg>
    </div>
  );
};

export default LineChart;
