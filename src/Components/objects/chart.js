import React, { useEffect, useState, memo } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const ChildProgressChart = () => {
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);

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
      })
      .finally(() => {
        setLoading(false);
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
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false, // Disable animations to prevent overlapping during double rendering
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

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (quizData.length === 0) {
    return <p>No quiz data available.</p>;
  }

  return (
    <div className="chart-wrapper">
      <div className="chart">
        <Bar data={barChartData} options={chartOptions} />
      </div>
      <div className="chart">
        <Line data={lineChartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default memo(ChildProgressChart);
/*Rhianan Williams, MD Zuhayer Aousaf & Nathan Suryadi, 2024, MathBuddy FrontEnd Source code, npm 7.7.6 */