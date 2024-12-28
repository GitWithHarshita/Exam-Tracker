// Countdown Timer
const examDate = new Date("2025-05-25");
function updateCountdown() {
  const now = new Date();
  const diff = examDate - now;
  const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
  document.getElementById("countdown").innerText = `${daysLeft} days left until exams!`;
}
updateCountdown();

// Pomodoro Timer
let timer;
let isTimerRunning = false;
document.getElementById("start-timer").addEventListener("click", () => {
  if (isTimerRunning) return; // Prevent multiple timers
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
