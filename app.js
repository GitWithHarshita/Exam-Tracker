// Countdown Timer
const examDate = new Date("2025-05-25");
function updateCountdown() {
  const now = new Date();
  const diff = examDate - now;
  const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
  document.getElementById("countdown").innerText = `${daysLeft} days left until exams!`;
}
updateCountdown();
setInterval(updateCountdown, 86400000); // Update every 24 hours

// Pomodoro Timer
let timer;
let isTimerRunning = false;
document.getElementById("start-timer").addEventListener("click", () => {
  if (isTimerRunning) return;
  isTimerRunning = true;
  let minutes = 25, seconds = 0;
  document.getElementById("timer").innerText = `${minutes}:00`;
  timer = setInterval(() => {
    if (seconds === 0) {
      seconds = 59;
      minutes--;
    } else {
      seconds--;
    }
    document.getElementById("timer").innerText = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    if (minutes === 0 && seconds === 0) {
      clearInterval(timer);
      isTimerRunning = false;
    }
  }, 1000);
});

document.getElementById("stop-timer").addEventListener("click", () => {
  clearInterval(timer);
  isTimerRunning = false;
  document.getElementById("timer").innerText = "25:00";
});

// Break Suggestions
const breakIdeas = [
  "Go grab a glass of water!",
  "Listen to your favorite song!",
  "Take a 5-minute walk!",
  "Do a quick stretch!",
  "Look out the window and relax!",
  "Make yourself a cup of coffee and enjoy it!"
];
document.getElementById("break-idea-btn").addEventListener("click", () => {
  const idea = breakIdeas[Math.floor(Math.random() * breakIdeas.length)];
  document.getElementById("break-idea").innerText = idea;
});

// ------------------ problem yehi pe tha ------------------
// // Progress Tracking
// function updateProgress() {
//   const checkboxes = document.querySelectorAll("#subjects input[type='checkbox']");
//   const total = checkboxes.length;
//   const completed = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
//   const progressPercentage = Math.floor((completed / total) * 100);
//   document.getElementById("progress").innerText = `Progress: ${progressPercentage}%`;
// }

// Add event listeners to checkboxes
const checkboxes = document.querySelectorAll("#subjects input[type='checkbox']");
checkboxes.forEach(checkbox => {
  checkbox.addEventListener("change", updateProgress);
});

// Initialize progress on page load
// updateProgress();

document.addEventListener("DOMContentLoaded", function() {
  // Variables for tracking the progress
  const logStudyButton = document.getElementById('log-study');
  const studyHoursInput = document.getElementById('study-hours');
  const studyTimeDisplay = document.getElementById('study-time');
  const progressBar = document.getElementById('progress-bar-fill');
  const progressPercentageDisplay = document.getElementById('progress-percentage');
  const countdownTimerDisplay = document.getElementById('countdown-timer');

  const maxStudyGoal = 8; // Goal of 8 hours of study

  let studyTime = 0; // Stores the total study time logged today
  let countdownInterval;

  // Function to update progress bar and countdown timer
  function updateStudyProgress() {
    // Calculate progress as a percentage
    let progress = Math.min((studyTime / maxStudyGoal) * 100, 100); 

    // Update progress bar and percentage display
    progressBar.style.width = `${progress}%`;
    progressPercentageDisplay.textContent = `${Math.round(progress)}%`;

    // Update the countdown timer (remaining time to reach the goal)
    let remainingTime = (maxStudyGoal - studyTime) * 60; // in minutes
    startCountdown(remainingTime);
  }

  // Function to start countdown
  function startCountdown(remainingTime) {
    // Clear existing countdown interval
    clearInterval(countdownInterval);

    countdownInterval = setInterval(function() {
      if (remainingTime <= 0) {
        clearInterval(countdownInterval);
        countdownTimerDisplay.textContent = "00:00";
        return;
      }

      let hours = Math.floor(remainingTime / 60);
      let minutes = remainingTime % 60;
      hours = hours < 10 ? '0' + hours : hours;
      minutes = minutes < 10 ? '0' + minutes : minutes;

      countdownTimerDisplay.textContent = `${hours}:${minutes}`;

      remainingTime--;
    }, 60000); // Update every minute
  }

  // Event listener for "Log Study Time" button
  logStudyButton.addEventListener('click', function() {
    const enteredStudyHours = parseFloat(studyHoursInput.value);

    if (isNaN(enteredStudyHours) || enteredStudyHours < 0 || enteredStudyHours > 24) {
      alert('Please enter a valid number of hours (0 to 24).');
      return;
    }

    // Add the entered study hours to the total study time
    studyTime += enteredStudyHours;

    // Update the study time display and progress
    studyTimeDisplay.textContent = studyTime.toFixed(1);

    // Update the progress bar and countdown
    updateStudyProgress();
    console.log("testing", studyTime);
    // Reset input field after logging
    studyHoursInput.value = '';
  });
});
