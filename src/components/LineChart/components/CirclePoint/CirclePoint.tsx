import React from "react";
import { LineSet } from "../../types";

interface CirclePointProps {
    hoverPoint: {
        x: number;
        y: number;
    };
    targetPoint: {
        x: number;
        y: number;
    };
    lineToShowPointInfo: number;
    lineSets: LineSet[];
    }

const CirclePoint = ({ hoverPoint, targetPoint, lineToShowPointInfo, lineSets }: CirclePointProps) => {
    return (
        <>
        <circle
          cx={hoverPoint.x}
          className="hoverCircle"
          cy={hoverPoint.y}
          r={5} // Tamaño del círculo de hover
          fill={lineSets[lineToShowPointInfo].strokeColor || "grey"} // Color correspondiente a la línea
        />
        <circle
          cx={hoverPoint.x}
          cy={hoverPoint.y}
          r={10} // Radio mayor para la aureola
          fill="none"
          stroke={lineSets[lineToShowPointInfo].strokeColor || "grey"} // Color correspondiente a la línea
          strokeOpacity={0.3} // Opacidad más baja para la aureola
          strokeWidth={3} // Grosor más ancho para crear el efecto de aureola
          style={{
            opacity:
              hoverPoint.x === targetPoint.x &&
              hoverPoint.y === targetPoint.y
                ? 1
                : 0,
            transition: "opacity 0.3s ease",
          }}
        />
        <circle
          cx={hoverPoint.x}
          cy={hoverPoint.y}
          r={4.5} // Radio menor para el círculo principal
          fill="white"
          stroke={lineSets[lineToShowPointInfo].strokeColor || "grey"} // Color correspondiente a la línea
          strokeWidth={3.5} // Grosor estándar para el círculo principal
          style={{
            opacity:
              hoverPoint.x === targetPoint.x &&
              hoverPoint.y === targetPoint.y
                ? 1
                : 0,
            transition: "opacity 0.3s ease",
          }}
        />
      </>
    )
}
export default CirclePoint;
