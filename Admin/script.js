// Bar Chart
const barCtx = document.getElementById("barChart");
new Chart(barCtx, {
  type: "bar",
  data: {
    labels: ["May", "Jun", "Jul", "Aug", "Sep"],
    datasets: [{
      label: "Payments",
      data: [300, 500, 900, 600, 400],
      backgroundColor: "#f39c12"
    }]
  },
  options: {
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: { beginAtZero: true }
    }
  }
});

// Doughnut Chart
const doughnutCtx = document.getElementById("doughnutChart");
new Chart(doughnutCtx, {
  type: "doughnut",
  data: {
    labels: ["United States", "Canada", "Mexico", "Other"],
    datasets: [{
      data: [38.6, 22.5, 30.8, 8.1],
      backgroundColor: ["#2ecc71", "#e67e22", "#3498db", "#9b59b6"]
    }]
  },
  options: {
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "#fff" }
      }
    }
  }
});
