import React, { ReactNode, useState } from 'react'
import './LineChart.css'

export interface DataPoint {
  x: number
  y: number
  label?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tooltip_data?: any
}

export interface LineSet {
  data: DataPoint[]
  strokeColor: string
  label?: string
}

export interface LineChartProps {
  lineSets: LineSet[]
  height?: number
  width?: number
  horizontalGuides?: number
  verticalGuides?: number | null
  precision?: number
  intermittentX?: number
  xAxisLabels?: string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderToolTip?: (tooltipData: any) => ReactNode
  options?: { value: string; label: string }[]
  onChange?: (value: string) => void
  title?: string
  fontSize?: number
  backgroundColorLine?: string
}

interface Point {
  x: number
  y: number
  label?: string
}

const STROKE = 1.3

/**
 * LineChartProps es una interfaz que define los props aceptados por el componente LineChart.
 * @typedef {Object} LineChartProps
 * @property {LineSet[]} lineSets - Conjuntos de datos que representan las líneas en el gráfico.
 * @property {number} [height=200] - Altura del gráfico.
 * @property {number} [width=500] - Ancho del gráfico.
 * @property {number} [horizontalGuides=5] - Número de guías horizontales en el gráfico.
 * @property {number | null} [verticalGuides=null] - Número de guías verticales en el gráfico.
 * @property {number} [precision=3] - Precisión para el redondeo de valores en el eje Y.
 * @property {number} [intermittentX=8] - Valor de la coordenada X donde comienza la línea intermitente.
 * @property {string[]} [xAxisLabels=[]] - Etiquetas para el eje X.
 * @property {function} [renderToolTip] - Función que renderiza el tooltip.
 * @property {Object} [options] - Opciones para el gráfico.
 * @property {function} [onChange] - Función que se ejecuta cuando se cambia el valor del input.
 * @property {string} [title] - Título del gráfico.
 * @property {number} [fontSize] - Tamaño de la fuente del gráfico.
 * @property {string} [backgroundColorLine] - Color de fondo de la línea graficada.
 */

/**
 * LineChart es un componente React que renderiza un gráfico de líneas interactivo.
 * @component
 * @param {LineChartProps} props - Los props del componente LineChart.
 * @returns {JSX.Element} - Retorna un elemento SVG que representa el gráfico de líneas.
 */

const LineChart = ({
  lineSets,
  height = 200,
  width = 500,
  horizontalGuides = 5,
  verticalGuides = null,
  precision = 0,
  intermittentX = 10,
  xAxisLabels = [],
  options,
  fontSize,
  onChange,
  renderToolTip, // Agregar renderToolTip
  title,
  backgroundColorLine = '#AF168510'
}: LineChartProps): JSX.Element => {
  const [tooltip, setTooltip] = useState<{
    visible: boolean
    x: number
    y: number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content: any
  }>({
    visible: false,
    x: 0,
    y: 0,
    content: ''
  })

  const [selectedPoint, setSelectedPoint] = useState<Point>({
    x: 0,
    y: 0
  })

  const FONT_SIZE = fontSize || width / 65

  const getMaxX = () =>
    Math.max(
      ...lineSets.flatMap((lineSet) => lineSet.data.map((point) => point.x))
    )
  const getMinY = () => {
    // Obtener todos los valores de Y de todos los conjuntos de datos
    const allYValues = lineSets.flatMap((lineSet) =>
      lineSet.data.map((point) => point.y)
    )

    // Calcular el mínimo real de los datos
    const minY = Math.min(...allYValues)

    return minY
  }

  const getMaxY = () =>
    Math.max(
      ...lineSets.flatMap((lineSet) => lineSet.data.map((point) => point.y))
    )

  const maxX = getMaxX()
  const minY = getMinY()
  const maxY = getMaxY()
  const minX = Math.min(
    ...lineSets.flatMap((lineSet) => lineSet.data.map((point) => point.x))
  )

  const digits = parseFloat(maxY.toString()).toFixed(precision).length + 1
  const padding = (FONT_SIZE + digits) * 4
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  type DataPoint = {
    x: number
    y: number
    label?: string
    tooltip_data?: string // Add tooltip_data property
  }

  const mapDataToPoints = (data: DataPoint[]) =>
    data.map((element) => {
      const x = ((element.x - minX) / (maxX - minX)) * chartWidth + padding
      const y =
        chartHeight -
        ((element.y - minY) / (maxY - minY)) * chartHeight +
        padding

      return {
        x,
        y,
        label: element.label,
        tooltip_data: element.tooltip_data
      }
    })

  const pointsSets = lineSets.map((lineSet) => mapDataToPoints(lineSet.data))

  const generatePath = (points: { x: number; y: number }[]) => {
    if (points.length < 2) {
      return { solidPath: '', dashedPath: '' }
    }

    let solidPath = ''
    let dashedPath = ''

    points.forEach((point, pointIndex) => {
      if (pointIndex === 0) {
        solidPath = `M${point.x},${point.y}`
        dashedPath = `M${point.x},${point.y}`
      } else {
        solidPath += ` L ${point.x},${point.y}`
        dashedPath += ` L ${point.x},${point.y}`
      }
    })

    // Aplicar el estilo de líneas intermitentes solo si la coordenada x es mayor que intermittentX
    if (points[0].x > intermittentX) {
      dashedPath = `M${points[0].x},${points[0].y}` // Reiniciar la línea intermitente
      for (let i = 1; i < points.length; i++) {
        dashedPath += ` L ${points[i].x},${points[i].y}`
      }
    }

    return { solidPath, dashedPath }
  }

  const indexLastPoint = pointsSets?.length - 1

  const generateBackgroundPath = () => {
    if (pointsSets.length === 0 || pointsSets[indexLastPoint].length < 2) {
      return ''
    }

    let path = `M${pointsSets[indexLastPoint][0].x},${height - padding} L${
      pointsSets[0][0].x
    },${pointsSets[indexLastPoint][0].y}`

    for (let i = 1; i < pointsSets[indexLastPoint].length; i++) {
      path += ` L ${pointsSets[indexLastPoint][i].x},${pointsSets[indexLastPoint][i].y}`
    }

    path += ` L ${
      pointsSets[indexLastPoint][pointsSets[indexLastPoint].length - 1].x
    },${height - padding} Z`

    return path
  }

  const Axis: React.FC<{ points: string }> = () => (
    <polyline fill='none' stroke='#ccc' strokeWidth='.5' />
  )

  const XAxis: React.FC = () => (
    <Axis
      points={`${padding},${height - padding} ${width - padding},${
        height - padding
      }`}
    />
  )

  const YAxis: React.FC = () => (
    <Axis points={`${padding},${padding} ${padding},${height - padding}`} />
  )

  const VerticalGuides: React.FC = () => {
    const guideCount = verticalGuides || lineSets[0].data.length - 1
    const startY = padding
    const endY = height - padding

    return new Array(guideCount).fill(0).map((_, index) => {
      const ratio = (index + 1) / guideCount
      const xCoordinate = padding + ratio * (width - padding * 2)

      return (
        <React.Fragment key={index}>
          <polyline
            fill='none'
            stroke='#ccc'
            strokeWidth='.5'
            points={`${xCoordinate},${startY} ${xCoordinate},${endY}`}
          />
        </React.Fragment>
      )
    })
  }

  const HorizontalGuides: React.FC = () => {
    const startX = padding
    const endX = width - padding

    return new Array(horizontalGuides).fill(0).map((_, index) => {
      const ratio = (index + 1) / horizontalGuides
      const yCoordinate = chartHeight - chartHeight * ratio + padding

      return (
        <React.Fragment key={index}>
          <polyline
            fill='none'
            strokeDasharray={'4, 4'}
            strokeWidth='.6'
            points={`${startX},${yCoordinate} ${endX},${yCoordinate}`}
            style={{ opacity: 0.5, stroke: '#d8d8d8', strokeWidth: '0.6' }}
          />
        </React.Fragment>
      )
    })
  }

  const LabelsXAxis: React.FC<{ labels: string[] }> = ({ labels }) => {
    const y = height - padding + FONT_SIZE * 3

    return labels.map((label, index) => {
      const x =
        (index / (labels.length - 1)) * chartWidth + padding - FONT_SIZE / 2
      return (
        <text
          key={index}
          x={x}
          y={y}
          style={{
            fill: '#B1B1B1',
            fontSize: FONT_SIZE,
            textAnchor: 'middle' // Alineación centrada
          }}
        >
          {label}
        </text>
      )
    })
  }

  const generatePathFromIndex = (
    points: { x: number; y: number }[],
    startIndex: number
  ) => {
    if (points.length < 2 || startIndex >= points.length) {
      return ''
    }

    const pathPoints = points.slice(startIndex)

    const path = pathPoints.reduce((acc, point, index) => {
      return index === 0
        ? `M${point.x},${point.y}`
        : `${acc} L${point.x},${point.y}`
    }, '')

    return path
  }

  const LabelsYAxis2: React.FC = () => {
    const x = FONT_SIZE * 2

    const labels = [
      { label: minY.toString(), y: chartHeight + padding + FONT_SIZE / 2 },
      ...new Array(horizontalGuides).fill(0).map((_, index) => {
        const ratio = (index + 1) / horizontalGuides
        const yCoordinate = chartHeight - chartHeight * ratio + padding
        const y = yCoordinate + FONT_SIZE / 2

        return {
          label: Math.round(minY + (maxY - minY) * ratio).toLocaleString(),
          // eslint-disable-next-line object-shorthand
          y: y
        }
      })
    ]

    return labels.map((point, index) => (
      <text
        key={index}
        x={x}
        y={point.y}
        style={{
          fill: '#B1B1B1',
          fontSize: FONT_SIZE
        }}
      >
        {point.label}
      </text>
    ))
  }

  return (
    <div className='w-full rounded-xl border bg-white'>
      <div className={'flex items-center  justify-between  border-b px-6 py-4'}>
        <div className='flex gap-5'>
          {lineSets?.map((lineSet, index) => (
            <div className={'flex items-center gap-2'} key={index}>
              <div
                className={`h-[10px] w-[10px] rounded-full`}
                style={{
                  backgroundColor: lineSet.strokeColor
                }}
              ></div>
              <h6 className=''>{lineSet.label}</h6>
            </div>
          ))}
        </div>
      </div>
      <svg
        viewBox={`0 10 ${width - 20} ${height - 10}`}
        overflow='visible'
        onMouseLeave={() =>
          setTooltip({ visible: false, x: 0, y: 0, content: '' })
        }
      >
        {verticalGuides && <VerticalGuides />}
        <XAxis />
        <LabelsXAxis labels={xAxisLabels} />
        <LabelsYAxis2 />
        <YAxis />
        <HorizontalGuides />
        {pointsSets.map((points, index) => (
          <React.Fragment key={index}>
            <path
              fill='none'
              role='line'
              stroke={lineSets[index].strokeColor}
              strokeWidth={STROKE}
              d={generatePath(points).solidPath}
            />
            {intermittentX && (
              <path
                fill='none'
                stroke={'#ffffff'}
                strokeWidth={STROKE + 2}
                d={generatePathFromIndex(points, intermittentX)}
              />
            )}
            {intermittentX && (
              <path
                fill='none'
                stroke={lineSets[index].strokeColor}
                strokeWidth={STROKE}
                // strokeDasharray='5,5'
                // añadir stroke solo al primer lineSet
                strokeDasharray={index === indexLastPoint ? '3,6' : ''}
                d={generatePathFromIndex(points, intermittentX)}
              />
            )}
          </React.Fragment>
        ))}
        {generateBackgroundPath() && (
          <path fill={backgroundColorLine} d={generateBackgroundPath()} />
        )}
        {renderToolTip &&
          pointsSets?.map((points, setIndex) => (
            <React.Fragment key={setIndex}>
              {points.map((point, pointIndex) => (
                <React.Fragment key={pointIndex}>
                  <rect
                    x={point.x - 10} // Ajusta según sea necesario
                    y={point.y - 10} // Ajusta según sea necesario
                    width={30} // Ajusta según sea necesario
                    height={30} // Ajusta según sea necesario
                    fill='transparent'
                    onMouseOver={() => {
                      setSelectedPoint(point)
                      setTooltip({
                        visible: true,
                        x: point.x,
                        y: point.y,
                        content: point.tooltip_data // Agregar tooltip_data
                      })
                    }}
                    onMouseOut={() => {
                      setSelectedPoint({ x: 0, y: 0 })
                      setTooltip({ visible: false, x: 0, y: 0, content: '' })
                    }}
                  />
                  <circle
                    className='circle-transition'
                    cx={point.x}
                    cy={point.y}
                    r={5} // Puedes ajustar el tamaño del punto
                    fill={lineSets[setIndex].strokeColor}
                    style={{
                      opacity:
                        selectedPoint.x === point.x &&
                        selectedPoint.y === point.y
                          ? 1
                          : 0
                    }}
                  />
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        {tooltip.visible && tooltip.content && (
          <foreignObject
            x={tooltip.x > 400 ? tooltip.x - 120 : tooltip.x + 10}
            y={tooltip.y > 150 ? tooltip.y - 150 : tooltip.y + 10}
            width={1}
            height={1}
            overflow='visible'
          >
            <div
              className={`tooltip-chart w-full ${
                tooltip.visible ? 'visible' : ''
              }`}
              style={{
                transition: 'opacity 0.3s ease, transform 0.3s ease'
              }}
            >
              {renderToolTip && renderToolTip(tooltip.content)}
            </div>
          </foreignObject>
        )}
      </svg>
    </div>
  )
}

export default LineChart
