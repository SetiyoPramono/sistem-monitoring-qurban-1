
import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { QurbanData } from '@/types';

Chart.register(...registerables);

interface PieChartProps {
  data: QurbanData;
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Calculate values for the chart
    const totalAnimals = data.goats.total + data.sheep.total + data.cows.total;
    const goatsSlaughtered = data.goats.slaughtered;
    const sheepSlaughtered = data.sheep.slaughtered;
    const cowsSlaughtered = data.cows.slaughtered;
    const remaining = totalAnimals - goatsSlaughtered - sheepSlaughtered - cowsSlaughtered;

    // Cleanup previous chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create the chart
    const ctx = chartRef.current.getContext('2d');
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: [
            'Belum Disembelih',
            'Kambing Disembelih',
            'Domba Disembelih',
            'Sapi Disembelih'
          ],
          datasets: [{
            data: [remaining, goatsSlaughtered, sheepSlaughtered, cowsSlaughtered],
            backgroundColor: [
              '#9e9e9e',
              '#4caf50',
              '#ff9800',
              '#2196f3'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                font: {
                  size: 12
                }
              }
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  const datasetLabel = tooltipItem.dataset.label || '';
                  const rawValue = tooltipItem.raw as number;
                  const percentage = Math.round((rawValue / totalAnimals) * 100);
                  return `${datasetLabel} ${tooltipItem.label}: ${rawValue} (${percentage}%)`;
                }
              }
            }
          }
        }
      });
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default PieChart;
