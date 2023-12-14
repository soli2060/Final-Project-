let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    checkDueTasks(); // Check for reminders after saving tasks
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = task.completed ? 'task-completed' : '';
        taskDiv.innerHTML = `
            ${task.description} (Due: ${task.dueDate})
            <button onclick="toggleComplete(${index})">${task.completed ? 'Unmark' : 'Complete'}</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(taskDiv);
    });
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskDueDate = document.getElementById('taskDueDate');
    const newTask = taskInput.value.trim();
    const dueDate = taskDueDate.value;
    if (newTask && dueDate) {
        tasks.push({ description: newTask, dueDate: dueDate, completed: false });
        saveTasks();
        taskInput.value = '';
        taskDueDate.value = '';
    } else {
        alert('Please enter a task and due date');
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

function checkDueTasks() {
    const today = new Date().toISOString().split('T')[0];
    let upcomingTasks = tasks.filter(task => !task.completed && new Date(task.dueDate) <= new Date(today));
    if (upcomingTasks.length > 0) {
        let message = 'Reminder: The following tasks are due soon:\n' + upcomingTasks.map(task => task.description).join(', ');
        alert(message);
    }
}

window.onload = renderTasks;
