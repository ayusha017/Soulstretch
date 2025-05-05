// public/script.js
document.getElementById("signupForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const msgDiv = document.getElementById("message");
  msgDiv.textContent = '';
  
  const formData = {
    name:           this.name.value.trim(),
    email:          this.email.value.trim(),
    password:       this.password.value,
    confirmPassword:this['confirm-password'].value,
    age:            +this.age.value,
    height:         +this.height.value,
    weight:         +this.weight.value,
    bloodGroup:     this['blood-group'].value.trim(),
  };

  try {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (!res.ok) {
      msgDiv.textContent = data.message;
      msgDiv.className = 'message error';
      return;
    }

    msgDiv.textContent = data.message;
    msgDiv.className = 'message success';
    this.reset();
  } catch (err) {
    console.error(err);
    msgDiv.textContent = 'Network error, please try again.';
    msgDiv.className = 'message error';
  }
});
