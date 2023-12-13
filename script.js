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

    if (nearestTask) {
        const daysRemaining = calculateDaysRemaining(nearestTask.dueDate);
        const reminderMessage = `Next task: ${nearestTask.title} is due in ${daysRemaining} days!`;

        // Display an alert with the calculated days remaining
        const userResponse = prompt(reminderMessage + "\n\nType 'Okay' to remove the reminder:");

        // Remove the reminder immediately if the user types 'Okay'
        if (userResponse && userResponse.toLowerCase() === 'okay') {
            alert('Reminder removed!');
        } else {
            // Automatically remove the reminder after 2 seconds (2000 milliseconds)
            setTimeout(() => {
                alert('Reminder removed!');
            }, 2000);
        }
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

        // Reload the page to display the updated task list and the new reminder
        renderTasks();
    } else {
        alert('Please enter both a task and a due date');
    }
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
