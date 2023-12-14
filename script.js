let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

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

function showReminder(task, daysRemaining) {
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
  const taskInput = document.querySelector('.task-input input[type="text"]');
  const dueDateInput = document.querySelector('.task-input input[type="date"]');
  const task = taskInput.value;
  const dueDate = dueDateInput.value;

  if (task.trim() !== '') {
    tasks.push({ task, dueDate, completed: false });
    taskInput.value = '';
    dueDateInput.value = '';
    saveTasks();

    const currentDate = new Date();
    const taskDueDate = new Date(dueDate);
    const daysRemaining = Math.ceil((taskDueDate - currentDate) / (1000 * 60 * 60 * 24));
    showReminder(task, daysRemaining);
  }
}

// Call renderTasks when the page loads
window.onload = renderTasks;
