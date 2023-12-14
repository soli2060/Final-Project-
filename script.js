// Load tasks from localStorage or initialize an empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// Function to render tasks
function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    if (task.completed) {
      taskItem.classList.add('completed');
    }

    const taskText = document.createElement('div');
    taskText.textContent = task.task;

    const taskDueDate = document.createElement('div');
    const dueDate = new Date(task.dueDate);
    const currentDate = new Date();
    const daysRemaining = Math.ceil((dueDate - currentDate) / (1000 * 60 * 60 * 24));
    taskDueDate.textContent = `Due in ${daysRemaining} days`;

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.addEventListener('click', () => {
      tasks[index].completed = true;
      saveTasks();
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      tasks.splice(index, 1);
      saveTasks();
    });

    taskItem.appendChild(taskText);
    taskItem.appendChild(taskDueDate);
    taskItem.appendChild(completeButton);
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);
  });
}

// Function to show a reminder when a task is added
function showReminder(task, daysRemaining) {
  const reminderMessage = `Task "${task}" added! It's due in ${daysRemaining} days.`;

  // Display the reminder using an alert
  alert(reminderMessage);
}

// Function to add a task
function addTask() {
  const taskInput = document.querySelector('.task-input input[type="text"]');
  const dueDateInput = document.querySelector('.task-input input[type="date"]');
  const task = taskInput.value;
  const dueDate = dueDateInput.value;

  if (task.trim() !== '') {
    tasks.push({ task, dueDate, completed: false });
    taskInput.value = '';
    dueDateInput.value = '';
    saveTasks();

    // Calculate days remaining
    const dueDateObj = new Date(dueDate);
    const currentDate = new Date();
    const daysRemaining = Math.ceil((dueDateObj - currentDate) / (1000 * 60 * 60 * 24));

    // Show the reminder
    showReminder(task, daysRemaining);
  }
}

// Call renderTasks when the page loads
window.onload = renderTasks;
