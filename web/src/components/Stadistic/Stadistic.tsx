import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useTheme } from '../../hooks/useTheme';

ChartJS.register(ArcElement, Tooltip, Legend);

interface StadisticProps {
  showcase: number;
  warehouse: number;
  sales: number;
  in_delivery: number;
}

/**
 * Componente Stadistic que muestra un gráfico circular con las estadísticas de inventario.
 * @param {StadisticProps} props - Propiedades del componente Stadistic.
 * @returns El componente Stadistic que muestra un gráfico circular con las estadísticas de inventario.
 */
export const Stadistic: React.FC<StadisticProps> = ({ showcase, warehouse, sales, in_delivery }) => {
  const { theme } = useTheme();
  const values = [showcase, warehouse, sales, in_delivery];
  const total = values.reduce((acc, value) => acc + value, 0);

  const chartData = {
    labels: ["Vitrina", "Bodega", "Ventas", "En camino"],
    datasets: [
      {
        data: values,
        backgroundColor: [
          "#5a789c",
          "#9aa5c4",
          "#c7b8d6",
          "#7a6d91"
        ],
        borderColor: [
          "#5a789c",
          "#9aa5c4",
          "#c7b8d6",
          "#7a6d91"
        ],
        borderWidth: 1,
      }
    ],
  };

  interface ChartContext {
    raw: unknown;
  }

  const textColor = theme === 'dark' ? '#ffffff' : '#000000';

  const chartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: ChartContext) => {
            const value = (context.raw as number) || 0;
            return `${value}`;
          },
        },
      },
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
  };

  return (
    <div className='circle-chart'>
      <Pie data={chartData} options={chartOptions} />
      <p>Total: {total}</p>
    </div>
  );
};