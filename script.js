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
        if (task.completed) {
            taskElement.classList.add('completed');
        }
        taskElement.innerHTML = `
            <span>${task.title} - Due: ${task.dueDate} - Priority: ${task.priority}</span>
            <div>
                <button onclick="toggleComplete(${index})">✓</button>
                <button onclick="deleteTask(${index})">delete </button>
                <button onclick="editTask(${index})">✏️</button>
            </div>
        `;
        taskList.appendChild(taskElement);
    });
}

function addTask() {
    const taskInput = document.getElementById('task-input');
    const dueDateInput = document.getElementById('task-due-date');
    const prioritySelect = document.getElementById('task-priority');

    const task = taskInput.value.trim();
    const dueDate = dueDateInput.value;
    const priority = prioritySelect.value;

    if (task) {
        tasks.push({ title: task, dueDate, priority, completed: false });
        taskInput.value = '';
        dueDateInput.value = '';
        prioritySelect.value = 'Medium';
        saveTasks();
    } else {
        alert('Please enter a task');
    }
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
}

function editTask(index) {
    const newTitle = prompt('Edit Task:', tasks[index].title);
    if (newTitle != null) {
        tasks[index].title = newTitle;
        saveTasks();
    }
}

window.onload = renderTasks;
