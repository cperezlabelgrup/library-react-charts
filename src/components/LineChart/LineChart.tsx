import React, { useEffect, useState } from 'react'
import Tooltip from './components/Tooltip'

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
  dashedParamater?: number
  backgroundColorLine?: string
}

export interface LineChartProps {
  lineSets: LineSet[]
  height?: number
  width?: number
  lineToShowPointInfo?: number
  horizontalGuides?: {
    count?: number
    color?: string
    dashed?: boolean
    stroke?: number
  }
  precision?: number
  xAxisLabels?: string[]
  renderToolTip?: (data: {
    dataX: number
    dataY: number
    label?: string
  }) => JSX.Element
}

const STROKE = 2.8

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
    color: '#b5b3b38d',
    dashed: false,
    stroke: 1
  },
  width = 600,
  height = 300,
  precision = 0,
  xAxisLabels = [],
  lineToShowPointInfo = 0,
  renderToolTip
}: LineChartProps): JSX.Element => {
  const [dimensiones, setDimensiones] = useState<{
    width: number
    height: number
  }>({
    width: width,
    height: height
  })
  const [mousePosition, setMousePosition] = useState<{
    x: number
    y: number
  } | null>(null)
  const [isMouseInside, setIsMouseInside] = useState<boolean>(false)
  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    })
    setIsMouseInside(true)
  }

  const handleMouseLeave = () => {
    setIsMouseInside(false)
    setMousePosition(null)
  }

  const refContainer = React.useRef<HTMLDivElement>(null)
  const lineRef = React.useRef<SVGLineElement>(null)

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
  const padding = digits * 2
  const chartWidth = dimensiones.width - padding * 2
  const chartHeight = dimensiones.height - padding * 2
  const FONT_SIZE = chartWidth / 60

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

  const generatePath = (
    points: { x: number; y: number }[],
    dashedParam: number
  ) => {
    let solidPath = ''
    let dashedPath = ''
    const dashedParams = dashedParam > 0 ? dashedParam - 1 : points.length

    // Iterar sobre todos los puntos para construir ambos paths
    points.forEach((point, index) => {
      if (index <= dashedParams) {
        // Incluir el punto en el índice dashedParam en el solidPath
        if (index === 0) {
          solidPath = `M${point.x},${point.y}`
        } else {
          solidPath += ` L ${point.x},${point.y}`
        }
      }
      if (index === dashedParams) {
        // Asegurarse de que el dashedPath comience desde el mismo punto donde el solidPath termina
        dashedPath = `M${point.x},${point.y}`
      } else if (index > dashedParams) {
        // Continuar con el dashedPath para los puntos restantes
        dashedPath += ` L ${point.x},${point.y}`
      }
    })

    return { solidPath, dashedPath }
  }

  const generateBackgroundPath = (pointsSet: { x: number; y: number }[]) => {
    if (pointsSet.length < 2) {
      return ''
    }

    let path = `M${pointsSet[0].x},${dimensiones.height - padding}`

    // Crear el borde superior del fondo siguiendo los puntos del lineSet
    for (let i = 0; i < pointsSet.length; i++) {
      path += ` L ${pointsSet[i].x},${pointsSet[i].y}`
    }

    // Cerrar el path volviendo al inicio, en el borde inferior
    path += ` L ${pointsSet[pointsSet.length - 1].x},${dimensiones.height - padding} Z`

    return path
  }

  const HorizontalGuides: React.FC = () => {
    const startX = padding
    const endX = dimensiones.width - padding
    const countGuides = horizontalGuides?.count || 10
    let horizontalGuidesMax = countGuides
    if (countGuides > 6) {
      horizontalGuidesMax = 6
    }
    return new Array(horizontalGuidesMax).fill(0).map((_, index) => {
      const ratio = (index + 1) / horizontalGuidesMax
      const yCoordinate = chartHeight - chartHeight * ratio + padding + 2

      return (
        <React.Fragment key={index}>
          <polyline
            fill='none'
            strokeDasharray={horizontalGuides.dashed ? '4,4' : 'none'}
            strokeWidth='.6'
            points={`${startX},${yCoordinate} ${endX},${yCoordinate}`}
            style={{
              opacity: 0.5,
              stroke: horizontalGuides.color,
              strokeWidth: horizontalGuides.stroke
            }}
          />
        </React.Fragment>
      )
    })
  }

  const LabelsXAxis: React.FC<{ labels: string[] }> = ({ labels }) => {
    const y = dimensiones.height - padding + FONT_SIZE * 3
    const chartWidth = dimensiones.width - padding * 2
    // calcular el fontSize según el ancho del gráfico
    return labels.map((label, index) => {
      const x =
        (index / (labels.length - 1)) * chartWidth + padding - FONT_SIZE / 2
      return (
        <text
          key={index}
          x={x}
          y={y}
          style={{
            fill: 'rgba(177, 177, 177, 1)',
            fontSize: '0.8rem',
            fontFamily: 'Roboto',
            textAnchor: 'middle'
          }}
        >
          {label}
        </text>
      )
    })
  }

  const LabelsYAxis2: React.FC = () => {
    const x = FONT_SIZE * 0
    const countGuides = horizontalGuides?.count || 10
    let horizontalGuidesMax = countGuides
    if (countGuides > 6) {
      horizontalGuidesMax = 6
    }

    const labels = [
      { label: minY.toString(), y: chartHeight + padding + FONT_SIZE / 2 },
      ...new Array(horizontalGuidesMax).fill(0).map((_, index) => {
        const ratio = (index + 1) / horizontalGuidesMax
        const yCoordinate = chartHeight - chartHeight * ratio + padding
        const y = yCoordinate + FONT_SIZE / 4

        return {
          label: Math.round(minY + (maxY - minY) * ratio).toLocaleString(),
          y
        }
      })
    ]

    return labels.map((point, index) => (
      <text
        key={index}
        x={x - FONT_SIZE * 2}
        y={point.y}
        style={{
          fill: 'rgba(177, 177, 177, 1)',
          fontSize: '0.8rem',
          fontFamily: 'Roboto'
        }}
      >
        {point.label}
      </text>
    ))
  }

   useEffect(() => {
     if (refContainer.current) {
        setDimensiones({
          width: refContainer.current.offsetWidth,
          height: refContainer.current.offsetHeight
        })
    }
   }, [refContainer])

  return (
    <div ref={refContainer} style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      backgroundColor: 'transparent'
    
    }}>
      <svg
        viewBox={` `}
        overflow={'visible'}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {isMouseInside && mousePosition && (
          <>
            <line
              x1={0}
              y1={mousePosition.y}
              x2={dimensiones.width - padding}
              y2={mousePosition.y}
              stroke='#ccc'
              strokeWidth='1'
              strokeDasharray='3, 3'
            />
            <line
              ref={lineRef}
              x1={mousePosition.x}
              y1={0}
              x2={mousePosition.x}
              y2={dimensiones.height - padding}
              stroke='#ccc'
              strokeWidth='1'
              strokeDasharray='3, 3'
            />
          </>
        )}

        <LabelsXAxis labels={xAxisLabels} />
        <LabelsYAxis2 />
        <HorizontalGuides />
        {pointsSets.map((points, index) => (
          <React.Fragment key={index}>
            <path
              fill='none'
              role='line'
              stroke={lineSets[index].strokeColor}
              strokeWidth={STROKE}
              d={
                generatePath(points, lineSets[index].dashedParamater || 0)
                  .solidPath
              }
            />
            <path
              d={
                generatePath(points, lineSets[index].dashedParamater || 0)
                  .dashedPath
              }
              stroke={lineSets[index].strokeColor}
              strokeWidth={STROKE}
              fill='none'
              stroke-dasharray='5,5' // Esto crea el efecto de línea punteada
            />
            <path
              key={index}
              fill={
                lineSets[index].backgroundColorLine
                  ? lineSets[index].backgroundColorLine
                  : 'transparent'
              }
              d={generateBackgroundPath(points)}
            />
          </React.Fragment>
        ))}
        <Tooltip
          pointsSets={pointsSets}
          lineSets={lineSets}
          renderToolTip={renderToolTip && renderToolTip}
          lineToShowPointInfo={lineToShowPointInfo}
          xAxisLabels={xAxisLabels}
        />
      </svg>
    </div>
  )
}

export default LineChart
