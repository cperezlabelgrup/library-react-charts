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
  

  const HorizontalGuides = React.memo(({ padding, dimensiones, chartHeight, horizontalGuides }: HorizontalGuidesProps) => {
    const startX = padding;
    const endX = dimensiones.width - padding;
    const countGuides = horizontalGuides?.count || 10;
    let horizontalGuidesMax = Math.min(countGuides, 6); // Asegura que el máximo de guías sea 6 o el definido por el usuario si es menor
    
    return [...Array(horizontalGuidesMax + 1)].map((_, index) => { // +1 para incluir el borde superior
      const ratio = index / horizontalGuidesMax; // Ajuste aquí para incluir el borde superior
      const yCoordinate = chartHeight * (1 - ratio) + padding; // Ajuste en el cálculo de yCoordinate

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
});

  export default HorizontalGuides;