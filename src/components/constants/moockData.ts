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
export const LINE_SETS: LineSet[] = [
  {
    data: createRandomData(),
    strokeColor: "rgba(226, 226, 226, 1)",
    label: "2022",
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
