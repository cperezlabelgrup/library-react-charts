import React from "react";

interface LinePathsProps {
  points: { x: number; y: number }[];
  lineSets: any[];
  index: number;
  padding: number;
  dimensiones: { width: number; height: number };
  generatePath: (
    points: { x: number; y: number }[],
    dashedParamater: number
  ) => any;
  stroke: number;
  generateBackgroundPath: (points: { x: number; y: number }[]) => string;
  generatePathDash: (
    points: { x: number; y: number }[],
    dashedParamater: number
  ) => any;
}

const LinePaths = ({
  points,
  lineSets,
  index,
  generatePath,
  generatePathDash,
  stroke,
  generateBackgroundPath,
}: LinePathsProps) => {
  // si estamos manejando muchsiiimos datos, el stroke debe ser 0.6
  const isBigData = points.length >= 800;

 
  return (
    <React.Fragment key={index}>
      <path
        fill="none"
        role="line"
        stroke={lineSets[index].strokeColor || "grey"}
        strokeWidth={isBigData ? 1 : stroke}
        d={generatePath(
          points,
          lineSets[index].dashedParamater - 1 || 0
        )}
      />
      <path
        d={
          generatePathDash(points, lineSets[index].dashedParamater || 0).dashedPath
        }
        stroke={lineSets[index].strokeColor || "grey"}
        strokeWidth={stroke}
        fill="none"
        strokeDasharray="5,5" // Esto crea el efecto de línea punteada
      />
      <path
        key={index}
        fill={
          lineSets[index].backgroundColorLine
            ? lineSets[index].backgroundColorLine
            : "transparent"
        }
        d={generateBackgroundPath(
          points
        )}
      />
    </React.Fragment>
  );
};

export default LinePaths;
