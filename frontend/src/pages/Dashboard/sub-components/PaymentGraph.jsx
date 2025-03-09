import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PaymentGraph = () => {
  const { monthlyRevenue } = useSelector((state) => state.superAdmin);

  const data = {
    labels: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    datasets: [
      {
        label: "Total Payment Received",
        data: monthlyRevenue,
        backgroundColor: "rgba(214, 72, 43, 0.7)",
        borderColor: "#D6482B",
        borderWidth: 2,
        borderRadius: 5,
        hoverBackgroundColor: "rgba(214, 72, 43, 0.9)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 5000,
        ticks: {
          callback: (value) => value.toLocaleString(),
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Monthly Total Payments Received",
        font: { size: 19 },
        color: "#333",
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(0,0,0,0.8)",
        titleColor: "#fff",
        bodyColor: "#ddd",
      },
      legend: {
        labels: {
          font: { size: 14 },
          color: "#333",
        },
      },
    },
  };

  return (
    <div className="w-full h-96 p-4 bg-white rounded-xl shadow-lg">
      <Bar data={data} options={options} />
    </div>
  );
};

export default PaymentGraph;
