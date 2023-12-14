<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Tasks</title>
  <style>
    /* Your existing styles here */

    /* Style for the modal */
    .modal-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.5);
    }

    .modal-content {
      background-color: white;
      padding: 20px;
      border-radius: 5px;
      text-align: center;
    }
  </style>
</head>
<body>
  <!-- Your existing HTML structure here -->

  <!-- Add this script section at the end of your body tag -->
  <script>
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    }

    function renderTasks() {
      // Your existing renderTasks function
    }

    function showCustomModal(message) {
      const modalContainer = document.createElement('div');
      modalContainer.classList.add('modal-container');
      modalContainer.setAttribute('id', 'reminder-modal');

      const modalContent = document.createElement('div');
      modalContent.classList.add('modal-content');
      modalContent.innerHTML = `
        <p>${message}</p>
        <button onclick="removeReminder()">Okay</button>
      `;

      modalContainer.appendChild(modalContent);
      document.body.appendChild(modalContainer);
    }

    function removeReminder() {
      const modalContainer = document.getElementById('reminder-modal');
      if (modalContainer) {
        modalContainer.remove();
      }
    }

    function addTask() {
      const taskInput = document.getElementById('task-input');
      const dueDateInput = document.getElementById('task-due-date');

      const task = taskInput.value.trim();
      const dueDate = dueDateInput.value;

      if (task && dueDate) {
        tasks.push({ title: task, dueDate, completed: false });
        taskInput.value = '';
        dueDateInput.value = '';
        saveTasks();

        // Trigger the reminder
        const daysRemaining = calculateDaysRemaining(dueDate);
        const reminderMessage = `New task added: ${task} is due in ${daysRemaining} days!`;

        // Display a custom modal with the calculated days remaining
        showCustomModal(reminderMessage);

        // Reload the page to display the updated task list and the new reminder
        renderTasks();
      } else {
        alert('Please enter both a task and a due date');
      }
    }

    // Your existing functions here

    // Call renderTasks when the page loads
    window.onload = renderTasks;
  </script>
</body>
</html>
