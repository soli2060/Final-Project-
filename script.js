let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task) => {
        const taskDiv = document.createElement('div');
        taskDiv.textContent = `${task.description} - Due: ${task.dueDate}`;
        taskList.appendChild(taskDiv);
    });
    checkDueTasks();
}

function checkDueTasks() {
    const today = new Date().toISOString().split('T')[0];
    tasks.forEach(task => {
        if (!task.completed && new Date(task.dueDate) <= new Date(today)) {
            showCustomModal(`Task ${task.description} is due now!`);
        }
    });
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskDueDate = document.getElementById('taskDueDate');
    const newTask = {
        description: taskInput.value.trim(),
        dueDate: taskDueDate.value,
        completed: false // You can update this field when the task is completed
    };
    if (newTask.description && newTask.dueDate) {
        tasks.push(newTask);
        saveTasks();
        taskInput.value = '';
        taskDueDate.value = '';
    } else {
        showCustomModal('Please enter a task and due date');
    }
}

function showCustomModal(message) {
    // Modal implementation here
}

// Other functions here

window.onload = renderTasks;
