// Back button
document.getElementById('backBtn').addEventListener('click', () => {
  window.location.href = 'dashboard.html';
});

// Fetch habits
const habits = JSON.parse(localStorage.getItem('habits')) || [];

// Stats
const totalHabits = habits.length;
const completedHabits = habits.filter(h => h.completed).length;
const currentStreak = calculateStreak(habits);

// Update UI
document.getElementById('totalHabits').textContent = totalHabits;
document.getElementById('completedHabits').textContent = completedHabits;
document.getElementById('currentStreak').textContent = currentStreak;

// Streak logic (same as before)
function calculateStreak(habits) {
  let count = 0;
  for (let i = habits.length - 1; i >= 0; i--) {
    if (habits[i].completed) count++;
    else break;
  }
  return count;
}

// BAR CHART (same concept like your first version)
const labels = habits.map(h => h.name);
const data = habits.map(h => h.completed ? 1 : 0);

const ctx = document.getElementById('habitChart').getContext('2d');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{
      label: 'Habit Status',
      data: data,
      backgroundColor: '#4caf50',
      borderRadius: 6
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          callback: value => value === 1 ? 'Done' : 'Not Done'
        }
      }
    }
  }
});