let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

function renderTasks() {
  // Your renderTasks function code here
}

function showReminder(task, daysRemaining) {
  // Create a reminder modal dynamically
  const reminderModal = document.createElement('div');
  reminderModal.classList.add('modal-container');

  const reminderContent = document.createElement('div');
  reminderContent.classList.add('modal-content');

  reminderContent.innerHTML = `
    <p>Task "${task}" added! It's due in ${daysRemaining} days.</p>
    <button onclick="closeReminder()">Okay</button>
  `;

  reminderModal.appendChild(reminderContent);
  document.body.appendChild(reminderModal);
}

function closeReminder() {
  const reminderModal = document.querySelector('.modal-container');
  if (reminderModal) {
    reminderModal.remove();
  }
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
