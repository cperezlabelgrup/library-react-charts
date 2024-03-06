import React, { useEffect } from "react";
import { CustomToolTipData, LineSet } from "../../types";


interface ToolTipProps {
  targetPoint: {
    x: number;
    y: number;
    visible: boolean;
    index: number;
  };
  hoverPoint: {
    x: number;
    y: number;
    visible: boolean;
  };
  lineSets: LineSet[];
  lineToShowPointInfo: number;
  xAxisLabels: string[];
  limitSvg: {
    width: number;
    height: number;
  };
  customToolTip?: (data: CustomToolTipData) => JSX.Element;
}



const ToolTip = ({targetPoint,customToolTip, lineSets, lineToShowPointInfo, xAxisLabels, hoverPoint, limitSvg }: ToolTipProps) => {
  const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0, y: 0 });
  useEffect(() => {
    // si el tooltip se sale del límite del svg, se ajusta su posición
    if (hoverPoint.x > limitSvg.width - 20) {
      setTooltipPosition({ x: hoverPoint.x - 100, y: hoverPoint.y + 20 });
    } else {
      setTooltipPosition({ x: hoverPoint.x, y: hoverPoint.y + 20 });
    }
  }
  , [hoverPoint, limitSvg.width]);

  if(customToolTip) {
    const value = lineSets[lineToShowPointInfo].data[targetPoint.index];
    const label = lineSets[lineToShowPointInfo].label || `Line ${lineToShowPointInfo + 1}`;
    const xLabel = xAxisLabels[targetPoint.index] || `X: ${targetPoint.index}`;

    return (
      <foreignObject
      x={tooltipPosition.x}
      y={tooltipPosition.y}
        width="100"
        height="100"
        overflow={"visible"}
        className="tooltip-chart"
        style={{
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        {customToolTip({ value, label, xLabel })}
      </foreignObject>
    )
  }

   return (
    <foreignObject
            x={tooltipPosition.x}
            y={tooltipPosition.y}
            width="100"
            height="100"
            overflow={"visible"}
            className="tooltip-chart"
            style={{
                transition : "opacity 0.3s ease, transform 0.3s ease",
            }}
          >
              <div style={{
                backgroundColor: '#ffffff',
                fontSize: '10px',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                display: 'flex',
                zIndex: 100,
                flexDirection: 'column',
                boxShadow: '0 0 5px 0 rgba(0,0,0,0.2)',
                borderRadius: '3px',
                overflow: 'hidden',
                fontWeight: 'bold',
              }}
              >
                <span
                 style={{
                 backgroundColor: '#cacaca',
                 display: 'flex',
                 gap: '5px',
                 paddingBlock: '5px',
                  paddingInline: '5px',
                 }}
                >
                  {lineSets[lineToShowPointInfo].label || `Line ${lineToShowPointInfo + 1}`}
                  <span>
                   {xAxisLabels[targetPoint.index] || `X: ${targetPoint.index}`}
                </span>
                </span>
                 <div style={{
                  padding: '5px',
                  
                 }}>
                <span className="tooltip-text">
                  x:{lineSets[lineToShowPointInfo].data[targetPoint.index].x}
                </span>
                <span>
                  y:{lineSets[lineToShowPointInfo].data[targetPoint.index].y}
                </span>
                </div>
              </div>
          </foreignObject>
   )
}

export default ToolTip;