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

export const Stadistic: React.FC<StadisticProps> = ({ showcase, warehouse, sales, in_delivery }) => {
    const values = [showcase, warehouse, sales, in_delivery];
    const total = values.reduce((acc, value) => acc + value, 0);

    const chartData = {
        labels: ["Vitrina", "Bodega", "Ventas", "En camino"],
        datasets: [
            {
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(255, 255, 86, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 255, 86, 0.5)'
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
                            hidden: chart.getDatasetMeta(0).data[index].hidden || false, // Respetar el estado oculto
                            index,
                        }));
                    },
                    boxWidth: 20, // Ajustar el tamaño de los cuadros de color
                    padding: 10, // Espaciado entre elementos
                },
                // position: "top", // Posición del legend
                // align: "start", // Justificar el legend al inicio
                onClick: (e: any, legendItem: any, legend: any) => {
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