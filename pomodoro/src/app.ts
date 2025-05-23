let time = 25 * 60;
let timerId: number | null = null;

const timerDisplay = document.getElementById("timer")!;
const startBtn = document.getElementById("start")!;
const pauseBtn = document.getElementById("pause")!;
const resetBtn = document.getElementById("reset")!;

function updateDisplay() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function startTimer() {
  if (timerId) return;

  timerId = setInterval(() => {
    if (time > 0) {
      time--;
      updateDisplay();
    } else {
      clearInterval(timerId!);
      timerId = null;
      alert("Pomodoro complete!");
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerId!);
  timerId = null;
}

function resetTimer() {
  pauseTimer();
  time = 25 * 60;
  updateDisplay();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay();
