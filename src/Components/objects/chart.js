import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement } from "chart.js";

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const ChildProgressChart = () => {
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    fetch("https://mathbuddyapi.com/get_child_progress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        token: accessToken,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setQuizData(data);
        } else {
          setQuizData([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching quiz data:", error);
        setQuizData([]);
      });
  }, []);

  // Data for the bar chart
  const barChartData = {
    labels: quizData.map((quiz) => quiz.quiz_title),
    datasets: [
      {
        label: "Quiz Scores",
        data: quizData.map((quiz) => (quiz.score !== null ? quiz.score : 0)),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Data for the line chart
  const lineChartData = {
    labels: quizData.map((quiz) => quiz.quiz_title),
    datasets: [
      {
        label: "Score Trend",
        data: quizData.map((quiz) => (quiz.score !== null ? quiz.score : 0)),
        fill: false,
        borderColor: "rgba(255, 99, 132, 1)",
        tension: 0.1, // Line smoothness
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow custom sizing
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Child's Quiz Progress",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Score",
        },
      },
      x: {
        title: {
          display: true,
          text: "Quiz Title",
        },
      },
    },
  };

  if (quizData.length === 0) {
    return <p>No quiz data available</p>;
  }

  return (
    <div className="chart-wrapper">
      {/* Bar Chart */}
      <div className="chart">
        <Bar data={barChartData} options={chartOptions} />
      </div>

      {/* Line Chart */}
      <div className="chart">
        <Line data={lineChartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default ChildProgressChart;
