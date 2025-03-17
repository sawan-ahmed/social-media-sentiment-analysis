import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SentimentResults = () => {
  // Remove setSentimentData if not used
  const [sentimentData] = useState({
    labels: ['2025-03-10', '2025-03-11', '2025-03-12'],
    datasets: [
      {
        label: 'Sentiment Score',
        data: [0.5, 0.7, -0.3],
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  });

  return (
    <div className="sentiment-results">
      <div className="chart-container">
        <Line data={sentimentData} />
      </div>
    </div>
  );
};

export default SentimentResults;
