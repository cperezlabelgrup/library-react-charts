import React, { useState } from 'react'
import { DataPoint, LineSet } from '../../LineChart'

interface TooltipProps {
  pointsSets: DataPoint[][]
  lineSets: LineSet[]
  renderToolTip?: (data: {
    dataX: number
    dataY: number
    label?: string
  }) => JSX.Element
  xAxisLabels: string[]
  lineToShowPointInfo?: number // Index of the line to show the point info
}
interface Point {
  x: number
  y: number
  label?: string
}

const Tooltip = ({
  pointsSets,
  lineSets,
  renderToolTip,
  lineToShowPointInfo
}: TooltipProps) => {
  const [tooltip, setTooltip] = useState<{
    visible: boolean
    x: number
    y: number
    content: number
    contentX: number
    label?: string
  }>({
    visible: false,
    x: 0,
    y: 0,
    content: 0,
    contentX: 0,
    label: ''
  })
  const [selectedPoint, setSelectedPoint] = useState<Point>({
    x: 0,
    y: 0
  })

  return (
    <>
      {pointsSets?.map((points: Point[], setIndex: number) => (
        <React.Fragment key={setIndex}>
          {lineToShowPointInfo === setIndex &&
            points.map((point: Point, pointIndex: number) => (
              <React.Fragment key={pointIndex}>
                <rect
                  x={point.x}
                  y={0}
                  width={50}
                  height={200}
                  fill='transparent'
                  onMouseMove={() => {
                    setTooltip({
                      visible: true,
                      x: point.x,
                      y: point.y,
                      content: lineSets[setIndex].data[pointIndex].y,
                      contentX: lineSets[setIndex].data[pointIndex].x,
                      label: lineSets[setIndex].label
                    })
                    setSelectedPoint(point)
                  }}
                  onMouseOut={() => {
                    setSelectedPoint({ x: 0, y: 0 })
                    setTooltip({
                      visible: false,
                      x: 0,
                      y: 0,
                      content: 0,
                      contentX: 0
                    })
                  }}
                />
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={10} // Radio mayor para la aureola
                  fill='none'
                  stroke={lineSets[setIndex].strokeColor} // Color correspondiente a la línea
                  strokeOpacity={0.3} // Opacidad más baja para la aureola
                  strokeWidth={3} // Grosor más ancho para crear el efecto de aureola
                  style={{
                    opacity:
                      selectedPoint.x === point.x && selectedPoint.y === point.y
                        ? 1
                        : 0,
                    transition: 'opacity 0.3s ease'
                  }}
                />
                {/* El círculo principal: más pequeño y oscuro */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={4.5} // Radio menor para el círculo principal
                  fill='white'
                  stroke={lineSets[setIndex].strokeColor} // Color correspondiente a la línea
                  strokeWidth={3.5} // Grosor estándar para el círculo principal
                  style={{
                    opacity:
                      selectedPoint.x === point.x && selectedPoint.y === point.y
                        ? 1
                        : 0,
                    transition: 'opacity 0.3s ease'
                  }}
                />
              </React.Fragment>
            ))}
        </React.Fragment>
      ))}
      {tooltip.visible && tooltip.content && (
        <foreignObject x={tooltip.x - 20} y={tooltip.y + 20} overflow='visible'>
          <div
            className={`tooltip-chart w-full ${
              tooltip.visible ? 'visible' : ''
            }`}
            style={{
              transition: 'opacity 0.3s ease, transform 0.3s ease'
            }}
          >
            <div>
              {renderToolTip ? (
                renderToolTip({
                  dataX: tooltip.contentX,
                  dataY: tooltip.content,
                  label: tooltip.label
                })
              ) : (
                <div
                  style={{
                    width: 'max-content',
                    minWidth: '40px',
                    backgroundColor: '#5b5b5bf7',
                    border: '0.0.7px solid #ffffff',
                    color: 'white',
                    overflow: 'hidden',
                    fontSize: `0.8 rem`,
                    borderRadius: '5px',
                    boxShadow: '0 0 5px rgba(63, 63, 63, 0.809)'
                  }}
                >
                  <div
                    style={{
                      padding: '3px',
                      width: '100%',
                      backgroundColor: '#1e1e1ecb',
                      fontWeight: 'bold',
                      fontSize: '0.8rem'
                    }}
                  >
                    {tooltip.label}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      padding: '3px',
                      gap: '2px',
                      justifyContent: 'center',
                      alignItems: 'center'
                      // fontSize: `${fontSize && fontSize}px`,
                    }}
                  >
                    <p
                      style={{
                        textAlign: 'center',
                        fontSize: '0.7rem'
                      }}
                    >
                      <strong>X:</strong>
                      {tooltip.contentX}
                    </p>
                    <p
                      style={{
                        textAlign: 'center',
                        fontSize: '0.7rem'
                      }}
                    >
                      <strong>Y:</strong>
                      {tooltip.content}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </foreignObject>
      )}
    </>
  )
}

export default Tooltip
