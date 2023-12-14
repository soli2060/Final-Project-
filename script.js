let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = task.completed ? 'task-completed' : 'task-item';
        taskDiv.innerHTML = `
            <span>${task.description} - Due: ${task.dueDate}</span>
            <button onclick="toggleComplete(${index})">${task.completed ? 'Mark Incomplete' : 'Complete'}</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
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
        checkDueTasks();
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
    let reminders = tasks.filter(task => !task.completed && task.dueDate === today);
    if (reminders.length > 0) {
        let reminderText = reminders.map(task => `Task '${task.description}' is due today!`).join('\n');
        showModal(reminderText);
    }
}

function showModal(text) {
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modalText');
    modalText.innerText = text;
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

window.onload = () => {
    renderTasks();
    checkDueTasks(); // Check for reminders on page load
};
