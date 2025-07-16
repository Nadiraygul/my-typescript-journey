type Task = {
  id: string;
  name: string;
  duration: number;
  remaining: number;
  intervalId: number | null;
};

const taskForm = document.getElementById("task-form") as HTMLFormElement;
const taskInput = document.getElementById("task-input") as HTMLInputElement;
const taskList = document.getElementById("task-list") as HTMLUListElement;

const tasks: Task[] = [];

function createId(): string {
  return Math.random().toString(36).substring(2, 9);
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task-item";
    li.id = task.id;

    li.innerHTML = `
      <span>${task.name} - <strong>${formatTime(task.remaining)}</strong></span>
      <div>
        <button class="start-btn">${task.intervalId ? "Durdur" : "Başlat"}</button>
        <button class="delete-btn">Sil</button>
      </div>
    `;

    const startBtn = li.querySelector(".start-btn") as HTMLButtonElement;
    startBtn.addEventListener("click", () => toggleTimer(task.id));

    const deleteBtn = li.querySelector(".delete-btn") as HTMLButtonElement;
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    taskList.appendChild(li);
  });
}

function toggleTimer(taskId: string) {
  const task = tasks.find((t) => t.id === taskId);
  if (!task) return;

  if (task.intervalId) {
    clearInterval(task.intervalId);
    task.intervalId = null;
  } else {
    task.intervalId = window.setInterval(() => {
      if (task.remaining > 0) {
        task.remaining--;
        renderTasks();
      } else {
        clearInterval(task.intervalId!);
        task.intervalId = null;
        alert(`${task.name} süresi tamamlandı! 🎉`);
        task.remaining = task.duration;
        renderTasks();
      }
    }, 1000);
  }
  renderTasks();
}

function deleteTask(taskId: string) {
  const index = tasks.findIndex((t) => t.id === taskId);
  if (index === -1) return;

  if (tasks[index].intervalId) {
    clearInterval(tasks[index].intervalId!);
  }

  tasks.splice(index, 1);
  renderTasks();
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const taskName = taskInput.value.trim();
  if (!taskName) return;

  const newTask: Task = {
    id: createId(),
    name: taskName,
    duration: 1500,
    remaining: 1500,
    intervalId: null,
  };

  tasks.push(newTask);
  taskInput.value = "";
  renderTasks();
});
