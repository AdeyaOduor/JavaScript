// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

// src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

// src/components/GradeChart.js
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const GradeChart = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Student Performance by Subject',
      },
    },
  };

  const data = {
    labels: ['Math', 'English', 'Science', 'History', 'Geography'],
    datasets: [
      {
        label: 'Average Score',
        data: [85, 78, 92, 65, 70],
        backgroundColor: 'rgba(79, 70, 229, 0.5)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

// src/App.js
import React from 'react';
import { GradeChart } from './components/GradeChart';

function App() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">
        education Management System
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <GradeChart />
      </div>
    </div>
  );
}

export default App;
