<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Website</title>
  <link rel="stylesheet" href="styles.css">
  <link rel="icon" href="logo.png" type="image/x-icon">
  <style>
    /* Your existing styles */

    /* Additional styling for modal */
    .modal-container {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      padding: 20px;
      border: 1px solid #333;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      z-index: 999;
    }
  </style>
</head>
<body>
  <nav>
    <div class="nav-container">
      <a href="index.html" style="color: white;">Go Back to Home Page</a>
      <a href="page7.html" style="color: white;">Page 7</a>
    </div>
  </nav>
  <div class="container">
    <main>
      <!-- Your existing content -->
    </main>
  </div>
  <footer>
    <p>&copy; ShubhaMegh LLC 2023</p>
  </footer>

  <script>
    // Your existing JavaScript code

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

        // Show the reminder for the new task
        const daysRemaining = calculateDaysRemaining(dueDate);
        const reminderMessage = `New task: ${task} is due in ${daysRemaining} days!`;
        showCustomModal(reminderMessage);
      } else {
        alert('Please enter both a task and a due date');
      }
      // Reload the page to display the updated task list
      renderTasks();
    }
  </script>
</body>
</html>
