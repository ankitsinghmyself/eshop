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
        data: [activeProducts, inactiveProducts],
        backgroundColor: ['#4caf50', '#f44336'],
        hoverBackgroundColor: ['#66bb6a', '#ef5350'],
        borderWidth: 0,
        cutout: '70%',
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
