import { LineSet } from "../LineChart/types";

const createRandomData = () => {
  const data = [];
  let lastY = Math.random() * 50 + 50; // Inicializamos con un valor aleatorio entre 50 y 100

  for (let i = 0; i < 800; i++) {
    // Supongamos que generamos datos para cada minuto de un día
    const deltaY = (Math.random() - 0.5) * 10; // Variación aleatoria entre -5 y 5
    lastY += deltaY; // Añadimos la variación al último valor

    // Simulamos una corrección si el precio se desvía demasiado (para evitar valores negativos o excesivamente altos)
    if (lastY < 10) lastY += Math.random() * 10;
    if (lastY > 100) lastY -= Math.random() * 10;

    data.push({
      x: i, // Suponiendo 'i' como cada minuto del día
      y: Math.floor(lastY),
    });
  }
  return data;
};

const createYearlyRandomData = () => {
  const data = [];
  let lastY = Math.random() * 100 + 100; // Inicializamos con un valor aleatorio entre 100 y 200
  let trend = 0; // Inicializamos la tendencia en 0

  for (let i = 0; i < 365; i++) {
    // Cambiamos la tendencia de forma aleatoria cada día
    trend += (Math.random() - 0.5) * 0.2; // Ajuste fino para cambios suaves en la tendencia

    // Aseguramos que la tendencia se mantenga dentro de un rango para evitar crecimientos o caídas exponenciales
    if (trend > 1) trend = 1;
    if (trend < -1) trend = -1;

    // La variación diaria incluye tanto la tendencia como una variación aleatoria
    const deltaY = trend + (Math.random() - 0.5) * 5;
    lastY += deltaY;

    // Aplicamos una corrección suave para mantener el valor dentro de un rango razonable
    if (lastY < 50) lastY += 5; // Corrección suave si el precio cae demasiado
    if (lastY > 350) lastY -= 5; // Corrección suave si el precio sube demasiado

    data.push({
      x: i,
      y: Math.max(0, Math.floor(lastY)), // Evitamos valores negativos
    });
  }
  return data;
};
export const LINE_SETS: LineSet[] = [
  {
    data: [
      { x: 1, y: 180 },
      { x: 2, y: 100 },
      { x: 3, y: 90 },
      { x: 4, y: 100 },
      { x: 5, y: 125 },
      { x: 6, y: 140 },
      { x: 7, y: 145 },
      { x: 8, y: 160 },
      { x: 9, y: 120 },
      { x: 10, y: 130 },
      { x: 11, y: 170 },
      { x: 12, y: 220 },
    ],
    strokeColor: "rgba(226, 226, 226, 1)",
    label: "2022",
  },
  {
    data: [
      { x: 1, y: 200 },
      { x: 2, y: 140 },
      { x: 3, y: 120 },
      { x: 4, y: 130 },
      { x: 5, y: 98 },
      { x: 6, y: 160 },
      { x: 7, y: 205 },
      { x: 8, y: 25 },
      { x: 9, y: 130 },
      { x: 10, y: 160 },
      { x: 11, y: 180 },
      { x: 12, y: 250 },
    ],
    strokeColor: "rgba(175, 22, 133, 1)",
    label: "2023",
    backgroundColorLine: "rgba(175, 22, 133, 0.05)",
    dashedParamater: 10,
  },
];

export const LABELS = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

const strokeColor = (data: number) => {
  console.log(data);
  if (data <= 4000) {
    return "rgba(175, 22, 133, 1)";
  } else if (data <= 8000) {
    return "rgba(175, 22, 133, 0.4)";
  } else {
    return "rgba(175, 22, 133, 0.2)";
  }
};

export const BAR_SETS = [
  {
    name: "Net Profit",
    data: [3900, 7800, 10000],
    strokeColor: strokeColor,
  },
];

export const BAR_LABELS = ["C: 24% Dto.", "B: 19% Dto.", "A: 12% Dto."];
