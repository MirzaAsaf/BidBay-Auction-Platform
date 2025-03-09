import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const BiddersAuctioneersGraph = () => {
  const { totalAuctioneers, totalBidders } = useSelector(
    (state) => state.superAdmin
  );

  const data = {
    labels: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    datasets: [
      {
        label: "Number of Bidders",
        data: totalBidders,
        borderColor: "#D6482B",
        backgroundColor: "rgba(214, 72, 43, 0.2)",
        pointBackgroundColor: "#D6482B",
        pointBorderColor: "#fff",
        tension: 0.4,
      },
      {
        label: "Number of Auctioneers",
        data: totalAuctioneers,
        borderColor: "#fdba88",
        backgroundColor: "rgba(253, 186, 136, 0.2)",
        pointBackgroundColor: "#fdba88",
        pointBorderColor: "#fff",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max:50,
        ticks: {
          
          callback: (value) => value.toLocaleString(),
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Bidders vs Auctioneers Over the Year",
        font: { size: 18 },
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
      <Line data={data} options={options} />
    </div>
  );
};

export default BiddersAuctioneersGraph;