<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Website</title>
  <style>
    /* Your existing styles here */

    /* Additional styles for the reminder modal */
    .modal-container {
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
    }

    .modal-content {
      background: white;
      padding: 20px;
      border-radius: 5px;
      text-align: center;
    }
  </style>
</head>
<body>
  <!-- Your existing HTML content here -->

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
      const modalContainer = document.querySelector('.modal-container');
      if (modalContainer) {
        modalContainer.remove();
      }
    }

    function addTask() {
      // Your updated addTask function
    }

    // Other functions (toggleComplete, deleteTask, calculateDaysRemaining, findNearestTask) go here

    // Call renderTasks when the page loads
    window.onload = renderTasks;
  </script>
</body>
</html>
