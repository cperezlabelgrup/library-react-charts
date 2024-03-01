import React, { useEffect } from "react";
import Tooltip from "./components/Tooltip";
import CirclePoint from "./components/CirclePoint";
import LinePaths from "./components/LinePaths";
import useLineChart from "./hooks/useLineChart";
import LabelsY from "./components/LabelsY/LabelsY";
import LabelsXAxis from "./components/LabelsX";
import { LineChartProps } from "./types";
import HorizontalGuides from "./components/HorizontalGuides";
const STROKE = 1.8;

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
  fontSize,
  height,
  xAxisLabels = [],
  hideXlabels = false,
  lineToShowPointInfo = 0,
  showPoints = true,
  showTooltip = true,
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
    setDimensiones,
  } = useLineChart(lineSets, lineToShowPointInfo, precision, refContainer);

  useEffect(() => {
    if(refContainer.current && !width) {
      const { width, height } = refContainer.current.getBoundingClientRect();
      setDimensiones({
        width: width,
        height: height || 200,
      });
    }
  }
  , [refContainer]);

  useEffect(() => {
    if(width) {
      setDimensiones({
        width: width,
        height: height || 200,
      });
    }
  } , [width, height])


  return (
    <div
      ref={refContainer}
      style={{
        width: width,
        height: height,
        maxWidth: "100%",
        maxHeight: "100%",
      }}
    >
      <svg
        id="line-chart-component"
        viewBox={` 0 0 ${width || dimensiones.width} ${
          height || dimensiones.height
        }`}
        overflow={"visible"}
        onMouseMove={handleMouseMovePoint}
        onMouseLeave={handleMouseLeavePoint}
      >
        {!hideXlabels && <LabelsXAxis
          FONT_SIZE={FONT_SIZE}
          fontSize={fontSize}
          padding={padding}
          dimensiones={dimensiones}
          labels={xAxisLabels}
        />}
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
            stroke={STROKE}
            generateBackgroundPath={generateBackgroundPath}
          />
        ))}
        {hoverPoint.visible && showPoints && (
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
