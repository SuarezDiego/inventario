import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

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

  const chartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw || 0;
            return `${value}`;
          },
        },
      },
      legend: {
        labels: {
          generateLabels: (chart: any) => {
            const data = chart.data;
            return data.labels.map((label: string, index: number) => ({
              text: `${label}: ${data.datasets[0].data[index]}`,
              fillStyle: data.datasets[0].backgroundColor[index],
              strokeStyle: data.datasets[0].borderColor[index],
              lineWidth: data.datasets[0].borderWidth,
              hidden: chart.getDatasetMeta(0).data[index].hidden || false,
              index,
            }));
          },
          boxWidth: 20,
          padding: 10,
        },
        onClick: (_e: any, legendItem: any, legend: any) => {
          const index = legendItem.index;
          const chart = legend.chart;
          const meta = chart.getDatasetMeta(0);
          meta.data[index].hidden = !meta.data[index].hidden;
          chart.update();
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