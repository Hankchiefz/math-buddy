import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChildProgressChart = () => {
  const [quizData, setQuizData] = useState([]); // Initialize as an empty array

  useEffect(() => {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("access_token");

    // Send a POST request with the access token
    fetch("https://mathbuddyapi.com/get_child_progress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Include access token in the Authorization header
      },
      body: JSON.stringify({
        token: accessToken, // Include access token in the body
      }), // You can add a body if the API expects it
    })
      .then((response) => response.json())
      .then((data) => {
        // Ensure that data is an array
        if (Array.isArray(data)) {
          setQuizData(data);
        } else {
          setQuizData([]); // Handle the case where data is not an array
        }
      })
      .catch((error) => {
        console.error("Error fetching quiz data:", error);
        setQuizData([]); // Handle errors by setting an empty array
      });
  }, []);

  // Prepare data for Chart.js, only if quizData is an array
  const chartData = {
    labels: quizData.map((quiz) => quiz.quiz_title), // Quiz titles as labels
    datasets: [
      {
        label: "Quiz Scores",
        data: quizData.map((quiz) => (quiz.score !== null ? quiz.score : 0)), // Scores, default to 0 if null
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Bar color
        borderColor: "rgba(75, 192, 192, 1)", // Border color
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
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

  // If quizData is empty, show a message instead of rendering the chart
  if (quizData.length === 0) {
    return <p>No quiz data available</p>;
  }

  return (
    <div>
      <h2>Quiz Progress</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default ChildProgressChart;
