import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box, Typography, Paper } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CircularChartProps {
  activeProducts: number;
  totalProducts: number;
}

const CircularChart: React.FC<CircularChartProps> = ({ activeProducts, totalProducts }) => {
  const inactiveProducts = totalProducts - activeProducts;
  const activePercentage = totalProducts > 0 ? ((activeProducts / totalProducts) * 100).toFixed(1) : '0';
  
  const data = {
    labels: ['Active Products', 'Inactive Products'],
    datasets: [
      {
        data: [activeProducts, totalProducts - activeProducts],
        backgroundColor: ['#61a146', '#d3e3cc'],
        hoverBackgroundColor: ['#3d692c', '#b9d2ad'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.parsed;
            const percentage = totalProducts > 0 ? ((value / totalProducts) * 100).toFixed(1) : '0';
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <Box sx={{ position: 'relative', height: '100%' }}>
      <Doughnut data={data} options={options} />
      {/* Center text */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="primary">
          {activePercentage}%
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Active
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularChart;
