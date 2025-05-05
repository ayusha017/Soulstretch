document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    window.location.href = 'login.html'; // Redirect to login page if no token
  }

  // Fetch user data from the backend
  fetch('/api/dashboard', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById('user-name').textContent = data.name;
      document.getElementById('user-email').textContent = data.email;
      document.getElementById('user-age').textContent = data.age;
      document.getElementById('user-height').textContent = data.height;
      document.getElementById('user-weight').textContent = data.weight;
      document.getElementById('user-blood-group').textContent = data.bloodGroup;
    })
    .catch((error) => {
      console.error('Error:', error);
      window.location.href = 'login.html'; // Redirect to login if error occurs
    });

  // Logout functionality
  document.getElementById('logout-button').addEventListener('click', () => {
    localStorage.removeItem('authToken');
    window.location.href = 'login.html'; // Redirect to login page
  });
});
