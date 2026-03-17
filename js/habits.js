const habitNameInput = document.getElementById("habitName");
const addHabitBtn = document.getElementById("addHabitBtn");
const habitList = document.getElementById("habitList");
const progressBar = document.getElementById("progressBar");
const completedCountEl = document.getElementById("completedCount");
const totalCountEl = document.getElementById("totalCount");
const backBtn = document.getElementById("backBtn");
const emptyMsg = document.getElementById("emptyMsg");
const motivationText = document.getElementById("motivationText");

let habits = JSON.parse(localStorage.getItem("habits")) || [];

/* -------------------------
   Render Habits
------------------------- */
function renderHabits() {
  habitList.innerHTML = "";
  let completedCount = 0;

  if (habits.length === 0) {
    emptyMsg.style.display = "block";
  } else {
    emptyMsg.style.display = "none";
  }

  habits.forEach((habit, index) => {
    const li = document.createElement("li");
    li.textContent = habit.name;

    if (habit.completed) {
      li.classList.add("completed");
      completedCount++;
    }

    // Toggle completed
    li.addEventListener("click", () => {
      habits[index].completed = !habits[index].completed;
      saveAndRender();
    });

    // Delete habit
    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      habits.splice(index, 1);
      saveAndRender();
    });

    li.appendChild(delBtn);
    habitList.appendChild(li);
  });

  updateProgress(completedCount);
}

/* -------------------------
   Save + Render
------------------------- */
function saveAndRender() {
  localStorage.setItem("habits", JSON.stringify(habits));
  renderHabits();
}

/* -------------------------
   Add Habit
------------------------- */
addHabitBtn.addEventListener("click", () => {
  const name = habitNameInput.value.trim();
  if (!name) return;

  habits.push({ name, completed: false });
  habitNameInput.value = "";
  saveAndRender();
});

/* ENTER key support */
habitNameInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addHabitBtn.click();
  }
});

/* -------------------------
   Progress + Motivation
------------------------- */
function updateProgress(completed) {
  const total = habits.length;
  const percent = total ? (completed / total) * 100 : 0;

  progressBar.style.width = percent + "%";
  completedCountEl.textContent = completed;
  totalCountEl.textContent = total;

  if (percent === 0) {
    motivationText.textContent = "Let's start strong 💪";
  } else if (percent < 50) {
    motivationText.textContent = "Good start, keep going 🔥";
  } else if (percent < 100) {
    motivationText.textContent = "Almost there 🚀";
  } else {
    motivationText.textContent = "All habits completed 🎉 Legend!";
  }
}

/* -------------------------
   Back Button
------------------------- */
backBtn.addEventListener("click", () => {
  window.location.href = "dashboard.html";
});

/* Initial Load */
renderHabits();