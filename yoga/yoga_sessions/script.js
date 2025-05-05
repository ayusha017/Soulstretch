const images = [
    "images/cat-cow-2.webp",
    "images/Cat-Cow-Pose-scaled (1).jpg"
  ];
  
  let currentIndex = 0;
  let countdown = 5;
  let interval = null;
  let totalTime = 5;
  
  const slideImage = document.getElementById("slideImage");
  const countdownDisplay = document.getElementById("countdown");
  const ringBar = document.querySelector(".ring-bar");
  const timeInput = document.getElementById("timeInput");
  const timerRingContainer = document.querySelector(".timer-ring-container"); // NEW
  
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  ringBar.style.strokeDasharray = `${circumference}`;
  ringBar.style.strokeDashoffset = `${circumference}`;
  
  function setProgress(value) {
    const offset = circumference - (value / totalTime) * circumference;
    ringBar.style.strokeDashoffset = offset;
  }
  
  function showImage(index) {
    slideImage.src = images[index];
  }
  
  function startSlideshow() {
    if (interval) return;
  
    timerRingContainer.style.display = "block"; // Show timer when starting
    totalTime = 5;
    countdown = totalTime;
    countdownDisplay.textContent = countdown;
    setProgress(totalTime);
  
    interval = setInterval(() => {
      countdown--;
      countdownDisplay.textContent = countdown;
      setProgress(countdown);
  
      if (countdown <= 0) {
        currentIndex++;
  
        if (currentIndex >= images.length) {
          clearInterval(interval);
          interval = null;
          timerRingContainer.style.display = "none";
          slideImage.src = images[0] // Hide timer after end
          return;
        }
  
        showImage(currentIndex);
        countdown = totalTime;
        countdownDisplay.textContent = countdown;
        setProgress(totalTime);
      }
    }, 1000);
  }
  
  function resetSlideshow() {
    clearInterval(interval);
    interval = null;
    currentIndex = 0;
    countdown = 5;
    totalTime = countdown;
    showImage(currentIndex);
    countdownDisplay.textContent = countdown;
    setProgress(totalTime);
    slideImage.src = images[0];
    timerRingContainer.style.display = "block"; // Show timer after reset
  }
  
  document.getElementById("startBtn").addEventListener("click", startSlideshow);
  document.getElementById("resetBtn").addEventListener("click", resetSlideshow);
  
  // Init
  showImage(currentIndex);
  setProgress(totalTime);
  