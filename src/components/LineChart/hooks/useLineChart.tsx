import { useState } from "react";
import { DataPoint, LineSet } from "../types";


const useLineChart = (lineSets: LineSet[], lineToShowPointInfo: number, precision: number = 2, refContainer: React.RefObject<HTMLDivElement>) => {
  const [dimensiones, setDimensiones] = useState({ width: 600, height: 200 });
  const [hoverPoint, setHoverPoint] = useState({ x: 0, y: 0, visible: false, lineIndex: 0});
  const [targetPoint, setTargetPoint] = useState({
    x: 0,
    y: 0,
    visible: false,
    index: 0,
  });

  console.log({hoverPoint})


  const getMaxX = () =>
    Math.max(
      ...lineSets.flatMap((lineSet) => lineSet.data.map((point) => point.x))
    );
    const getMinY = () => {
      // Obtener todos los valores de Y de todos los conjuntos de datos
      const allYValues = lineSets.flatMap((lineSet) =>
        lineSet.data.map((point) => point.y)
      );
      // Calcular el mínimo real de los datos
      const actualMinY = Math.min(...allYValues);
      // Asegurarse de incluir 0 si el mínimo actual es mayor que 0
      return actualMinY > 0 ? 0 : actualMinY;
    };
    const getMaxY = () => {
      // Obtener todos los valores de Y de todos los conjuntos de datos
      const allYValues = lineSets.flatMap((lineSet) =>
        lineSet.data.map((point) => point.y)
      );
      // Calcular el máximo real de los datos
      const actualMaxY = Math.max(...allYValues);
      // Asegurarse de incluir 0 si el máximo actual es menor que 0
      return actualMaxY < 0 ? 0 : actualMaxY;
    };

  const maxX = getMaxX();
  const minY = getMinY();
  const maxY = getMaxY();
  const minX = Math.min(
    ...lineSets.flatMap((lineSet) => lineSet.data.map((point) => point.x))
  );

  const digits = parseFloat(maxY.toString()).toFixed(precision).length + 1;
  const padding = digits * 2;
  const chartWidth = dimensiones.width - padding * 2;
  const chartHeight = dimensiones.height - padding * 2;
  const FONT_SIZE = chartWidth / 60;

  const mapDataToPoints = (data: DataPoint[]) =>
    data.map((element) => {
      const x = ((element.x - minX) / (maxX - minX)) * chartWidth + padding;
      const y =
        chartHeight -
        ((element.y - minY) / (maxY - minY)) * chartHeight +
        padding;

      return {
        x,
        y,
        label: element.label,
        tooltip_data: element.tooltip_data,
      };
    });
  const pointsSets = lineSets.map((lineSet) => mapDataToPoints(lineSet.data));

  const generatePath = (
    points: { x: number; y: number }[],
    dashedParam: number
  ) => {
    let solidPath = "";
    let dashedPath = "";
    const dashedParams = dashedParam > 0 ? dashedParam - 1 : points.length;

    // Iterar sobre todos los puntos para construir ambos paths
    points.forEach((point, index) => {
      if (index <= dashedParams) {
        // Incluir el punto en el índice dashedParam en el solidPath
        if (index === 0) {
          solidPath = `M${point.x},${point.y}`;
        } else {
          solidPath += ` L ${point.x},${point.y}`;
        }
      }
      if (index === dashedParams) {
        // Asegurarse de que el dashedPath comience desde el mismo punto donde el solidPath termina
        dashedPath = `M${point.x},${point.y}`;
      } else if (index > dashedParams) {
        // Continuar con el dashedPath para los puntos restantes
        dashedPath += ` L ${point.x},${point.y}`;
      }
    });

    return { solidPath, dashedPath };
  };


  const handleMouseMovePoint = (e: React.MouseEvent<SVGSVGElement>) => {
    const svgRect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - svgRect.left; // Posición X del mouse relativa al SVG

    // Encuentra el punto más cercano al mouseX
    let closestPoint = null as null | { x: number; y: number };
    let minDistance = Infinity;
    // si lineToShowPointInfo no concuerda con algun index de lineSets, no se muestra el punto
    if (lineToShowPointInfo < 0 || lineToShowPointInfo >= pointsSets.length) {
      // retornar warning en la consola en inglés
      return console.warn(
        "The lineToShowPointInfo prop must be a valid index of the lineSets array."
      );
    }
    
    pointsSets[lineToShowPointInfo]?.forEach((point) => {
      const distance = Math.abs(point.x - mouseX);
      if (distance < minDistance) {
        closestPoint = point;
        minDistance = distance;
      }
    });

    if (closestPoint) {
      const indexPoint = pointsSets[lineToShowPointInfo].findIndex(
        (point) => point.x === closestPoint?.x
      );
      setTargetPoint({
        x: closestPoint.x,
        y: closestPoint.y,
        index: indexPoint,
        visible: true,
      });
      animateToPoint(closestPoint.x, closestPoint.y);
    }
  };

  const handleMouseLeavePoint = () => {
    setHoverPoint({ ...hoverPoint, visible: false });
    setTargetPoint({ ...targetPoint, visible: false });
  };
  
  const animateToPoint = (targetX: number, targetY: number) => {
    // Evita iniciar la animación si ya estás en el punto objetivo
    if (hoverPoint.x === targetX && hoverPoint.y === targetY) return;

    let currentX = hoverPoint.x;
    let currentY = hoverPoint.y;

    const step = () => {
      const dx = targetX - currentX;
      const dy = targetY - currentY;

      // Termina la animación si la distancia al objetivo es menor a un umbral
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {
        setHoverPoint({ x: targetX, y: targetY, visible: true, lineIndex: 0 });
        return;
      }

      // Realiza un pequeño paso hacia el objetivo
      currentX += dx * 0.1;
      currentY += dy * 0.1;

      setHoverPoint((prev) => ({
        ...prev,
        x: currentX,
        y: currentY,
        visible: true,
      }));

      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const generatePathWithSmoothVerticesUntilIndex = (
    points: { x: number; y: number }[],
    dashedParamater: number
  ) => {
    if (points.length < 2) return ""; // Necesita al menos dos puntos para dibujar una línea
    let pathD = `M${points[0].x},${points[0].y}`;
    let stopAtIndex = dashedParamater > 0 ? dashedParamater : points.length - 1;

    for (let i = 1; i <= stopAtIndex; i++) {
      if (i === 1 || i === stopAtIndex) {
        // Dibuja una línea directa para el segundo punto o hasta stopAtIndex
        pathD += ` L${points[i].x},${points[i].y}`;
      } else {
        // Para los demás puntos, introduce una pequeña curva
        const prevPoint = points[i - 1];
        const currPoint = points[i];
        const nextPoint = i + 1 < points.length ? points[i + 1] : currPoint;

        // Punto de control 1 (ligeramente antes del punto actual)
        const cp1x = prevPoint.x + (currPoint.x - prevPoint.x) * 0.9;
        const cp1y = prevPoint.y + (currPoint.y - prevPoint.y) * 0.9;

        // Punto de control 2 (ligeramente después del punto actual)
        const cp2x = currPoint.x + (nextPoint.x - currPoint.x) * 0.1;
        const cp2y = currPoint.y + (nextPoint.y - currPoint.y) * 0.1;

        // Dibuja la curva suave
        pathD += ` L${cp1x},${cp1y} Q${currPoint.x},${currPoint.y} ${cp2x},${cp2y}`;
      }

      // Si es el último punto requerido, detiene el bucle
      if (i === stopAtIndex) break;
    }

    return pathD;
  };

  const generateCompleteBackgroundPathWithSmoothVertices = (
    pointsSet: { x: number; y: number }[],
  ) => {
    if (pointsSet.length < 2) {
      return "";
    }

    let pathD = `M${pointsSet[0].x},${dimensiones.height - padding}`; // Empieza en el borde inferior en el primer punto

    // Añade la línea hasta el primer punto
    pathD += ` L${pointsSet[0].x},${pointsSet[0].y}`;

    for (let i = 1; i < pointsSet.length; i++) {
      if (i === 1 || i === pointsSet.length - 1) {
        // Dibuja una línea directa para el segundo punto y el último punto
        pathD += ` L${pointsSet[i].x},${pointsSet[i].y}`;
      } else {
        // Para los demás puntos, crea curvas suaves
        const prevPoint = pointsSet[i - 1];
        const currPoint = pointsSet[i];
        const nextPoint = pointsSet[i + 1];

        const cp1x = prevPoint.x + (currPoint.x - prevPoint.x) * 0.9;
        const cp1y = prevPoint.y + (currPoint.y - prevPoint.y) * 0.9;

        const cp2x = currPoint.x + (nextPoint.x - currPoint.x) * 0.1;
        const cp2y = currPoint.y + (nextPoint.y - currPoint.y) * 0.1;

        pathD += ` L${cp1x},${cp1y} Q${currPoint.x},${currPoint.y} ${cp2x},${cp2y}`;
      }
    }

    // Después del último punto, cierra el path dibujando una línea hacia el borde inferior del gráfico
    pathD += ` L${pointsSet[pointsSet.length - 1].x},${
      dimensiones.height - padding
    } Z`;

    return pathD;
  };


  return {
    setTargetPoint,
    setHoverPoint,
    setDimensiones,
    handleMouseMovePoint,
    handleMouseLeavePoint,
    generatePath: generatePathWithSmoothVerticesUntilIndex,
    generatePathDash: generatePath,
    generateBackgroundPath : generateCompleteBackgroundPathWithSmoothVertices,
    pointsSets,
    hoverPoint,
    targetPoint,
    dimensiones,
    padding,
    FONT_SIZE,
    chartHeight,
    minY,
    maxY,
    maxX,
    minX,

  };
};

export default useLineChart;
