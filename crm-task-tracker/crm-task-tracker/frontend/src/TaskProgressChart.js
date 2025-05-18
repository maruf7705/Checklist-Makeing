import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const TaskProgressChart = ({ tasks }) => {
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  const data = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        label: 'Task Progress',
        data: [completedTasks, pendingTasks],
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <h3>Task Completion Progress</h3>
      <Line data={data} />
    </div>
  );
};

export default TaskProgressChart;
