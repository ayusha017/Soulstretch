document.getElementById("loginForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  // Collect form data
  const formData = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  };

  // Send POST request to the backend
  try {
    const response = await fetch('http://localhost:5000/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    if (response.ok) {
      localStorage.setItem("token", result.token); // Store token in localStorage
      window.location.href = "../../../Home/Home.html"; // Redirect to the dashboard page
    } else {
      document.getElementById("message").textContent = result.message || "An error occurred.";
    }
  } catch (error) {
    console.error("Error during login:", error);
    document.getElementById("errorMsg").textContent = "Login failed. Please try again.";
  }
});
