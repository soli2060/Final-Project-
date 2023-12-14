let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    checkDueTasks();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.innerHTML = `
            <span>${task.description} - Due: ${task.dueDate}</span>
            <button onclick="toggleComplete(${index})">${task.completed ? 'Completed' : 'Complete'}</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskDiv.className = task.completed ? 'task-completed' : '';
        taskList.appendChild(taskDiv);
    });
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskDueDate = document.getElementById('taskDueDate');
    const newTask = {
        description: taskInput.value.trim(),
        dueDate: taskDueDate.value,
        completed: false
    };
    if (newTask.description && newTask.dueDate) {
        tasks.push(newTask);
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
    tasks.forEach(task => {
        if (!task.completed && new Date(task.dueDate) <= new Date(today)) {
            alert(`Task ${task.description} is due now!`);
        }
    });
}

window.onload = () => {
    renderTasks();
    checkDueTasks();
};
