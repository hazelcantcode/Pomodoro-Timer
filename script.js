let interval;
let isFocus = true;
let totalTime = 0;
let remaining = 0;

const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const timeDisplay = document.getElementById("timeDisplay");
const timerCircle = document.getElementById("timerCircle");

startBtn.addEventListener("click", () => {
  if (interval) return; // Prevent double intervals
  const focus = parseInt(document.getElementById("focusTime").value) * 60;
  const breakTime = parseInt(document.getElementById("breakTime").value) * 60;

  totalTime = isFocus ? focus : breakTime;
  remaining = totalTime;

  interval = setInterval(() => {
    remaining--;

    updateTime();
    updateCircle();

    if (remaining <= 0) {
      clearInterval(interval);
      interval = null;
      isFocus = !isFocus;
      alert(isFocus ? "Focus Time!" : "Break Time!");
      startBtn.click();
    }
  }, 1000);
});

resetBtn.addEventListener("click", () => {
  clearInterval(interval);
  interval = null;
  remaining = isFocus
    ? parseInt(document.getElementById("focusTime").value) * 60
    : parseInt(document.getElementById("breakTime").value) * 60;
  updateTime();
  updateCircle(true);
});

function updateTime() {
  const mins = Math.floor(remaining / 60)
    .toString()
    .padStart(2, "0");
  const secs = (remaining % 60).toString().padStart(2, "0");
  timeDisplay.textContent = `${mins}:${secs}`;
}

function updateCircle(reset = false) {
  const circumference = 565;
  const progress = reset ? 0 : ((totalTime - remaining) / totalTime) * circumference;
  timerCircle.setAttribute("stroke-dashoffset", progress);
}

// Init timer
resetBtn.click();

// ------------------
// TO-DO LIST
// ------------------

const todoInput = document.getElementById("todoInput");
const addTodo = document.getElementById("addTodo");
const todoList = document.getElementById("todoList");

addTodo.addEventListener("click", () => {
  const task = todoInput.value.trim();
  if (!task) return;

  const li = document.createElement("li");
  li.textContent = task;

  li.addEventListener("click", () => {
    li.classList.toggle("checked");
  });

  const delBtn = document.createElement("button");
  delBtn.textContent = "❌";
  delBtn.style.marginLeft = "10px";
  delBtn.addEventListener("click", () => {
    li.remove();
  });

  li.appendChild(delBtn);
  todoList.appendChild(li);
  todoInput.value = "";
});
