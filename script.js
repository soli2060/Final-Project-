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
      <h2>Welcome to ShubhaMegh LLC</h2>
      <p>At ShubhaMegh LLC, we are dedicated to providing you with valuable guidance and suggestions to help you achieve your future goals. With a commitment to excellence and a passion for your success, we are your trusted partner on the journey towards realizing your dreams.</p>
        
      <p>Our experienced team is here to offer tailored solutions and expert advice that empower you to make informed decisions for a brighter tomorrow. Whether you're striving for personal growth, professional success, or business expansion, we're here to support you every step of the way.</p>
        
      <p>Thank you for choosing ShubhaMegh LLC as your partner in shaping a successful future. Together, we'll navigate the path to your aspirations and bring your goals within reach.</p>
    </main>
  </div>
  <footer>
    <p>&copy; ShubhaMegh LLC 2023</p>
  </footer>

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
        // Your updated addTask function
    }

    // Your existing toggleComplete, deleteTask, calculateDaysRemaining, findNearestTask, and window.onload functions
    // ...

    window.onload = renderTasks;
  </script>
</body>
</html>
