let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('tasks-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');

        taskElement.innerHTML = `
            <span>${task.title} - Due: ${task.dueDate}</span>
            <button onclick="toggleComplete(${index})">Complete</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;

        // Add the 'completed' class if the task is completed
        if (task.completed) {
            taskElement.classList.add('completed');
        }

        taskList.appendChild(taskElement);
    });

    // Find the task with the nearest due date
    const nearestTask = findNearestTask();

    // Close any existing reminder modal
    removeReminder();

    if (nearestTask && !nearestTask.completed) {
        const daysRemaining = calculateDaysRemaining(nearestTask.dueDate);
        const reminderMessage = `Next task: ${nearestTask.title} is due in ${daysRemaining} days!`;

        // Display a custom modal with the calculated days remaining
        showCustomModal(reminderMessage);
    }
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
    } else {
        alert('Please enter both a task and a due date');
    }

    // Show the reminder on page load after adding a task
    renderTasks();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function calculateDaysRemaining(dueDate) {
    const now = new Date();
    const dueDateTime = new Date(dueDate);

    // Calculate the difference in days
    const timeDifference = dueDateTime.getTime() - now.getTime();
    const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return daysRemaining;
}

function findNearestTask() {
    let nearestTask = null;
    let nearestDueDate = Infinity;

    tasks.forEach((task) => {
        const daysRemaining = calculateDaysRemaining(task.dueDate);

        if (daysRemaining >= 0 && daysRemaining < nearestDueDate) {
            nearestTask = task;
            nearestDueDate = daysRemaining;
        }
    });

    return nearestTask;
}

// Call renderTasks when the page loads
window.onload = renderTasks;
