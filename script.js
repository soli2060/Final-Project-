let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear existing tasks
    tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.textContent = task;
        // Additional functionalities like delete or toggle can be added here
        taskList.appendChild(taskDiv);
    });
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const newTask = taskInput.value.trim();
    if (newTask) {
        tasks.push(newTask);
        saveTasks();
        taskInput.value = ''; // Clear the input field after adding the task
    } else {
        showCustomModal('Please enter a task');
    }
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

// Other functions (toggleComplete, deleteTask, calculateDaysRemaining, findNearestTask) go here

window.onload = renderTasks;
