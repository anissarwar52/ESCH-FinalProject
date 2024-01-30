import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

const SalesChart = ({ predictionData }) => {
  const chartRef = React.createRef();
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Destroy the existing chart if it exists
    if (chart) {
      chart.destroy();
    }

    // Create a new chart
    const newChart = new Chart(ctx, {
      type: 'line', // Use line chart to represent sales over time
      data: {
        labels: Object.keys(predictionData).map(date => new Date(date)), // Correct the format of date keys
        datasets: [
          {
            label: 'Predicted Sales',
            data: Object.values(predictionData),
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            pointRadius: 5, // Increase point radius for better visibility
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            fill: false, // Do not fill the area under the line
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              parser: 'yyyy-MM-dd', // Correct the date format
              unit: 'day',
              displayFormats: {
                day: 'MMM d',
              },
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Sales',
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Predicted Sales Over Time',
            font: {
              size: 18,
              weight: 'bold',
            },
          },
        },
        animation: {
          duration: 1000,
        },
      },
    });

    // Set the new chart in state
    setChart(newChart);

    // Cleanup function: Destroy the chart when the component unmounts
    return () => {
      if (newChart) {
        newChart.destroy();
      }
    };
  }, [chartRef.current, predictionData]);

  return <canvas ref={chartRef} />;
};

export default SalesChart;
