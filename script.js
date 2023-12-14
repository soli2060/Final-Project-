let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

function renderTasks() {
  // Your renderTasks function code here
}

function showReminder(task, daysRemaining) {
  const reminderModal = document.getElementById('reminder-modal');
  const reminderMessage = document.getElementById('reminder-message');

  reminderMessage.textContent = `Task "${task}" added! It's due in ${daysRemaining} days.`;
  reminderModal.style.display = 'block';
}

function closeReminder() {
  const reminderModal = document.getElementById('reminder-modal');
  reminderModal.style.display = 'none';
}

function addTask() {
  // Your addTask function code here

  // After adding the task, show the reminder
  const currentDate = new Date();
  const taskDueDate = new Date(dueDate);
  const daysRemaining = Math.ceil((taskDueDate - currentDate) / (1000 * 60 * 60 * 24));
  showReminder(task, daysRemaining);
}

// Call renderTasks when the page loads
window.onload = renderTasks;
