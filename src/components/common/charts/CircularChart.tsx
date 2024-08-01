// components/CircularChart.tsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CircularChartProps {
  activeProducts: number;
  totalProducts: number;
}

const CircularChart: React.FC<CircularChartProps> = ({ activeProducts, totalProducts }) => {
  const data = {
    labels: ['Active Products', 'Inactive Products'],
    datasets: [
      {
        data: [activeProducts, totalProducts - activeProducts],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return <Doughnut data={data} />;
};

export default CircularChart;
