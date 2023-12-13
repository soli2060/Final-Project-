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
        
        // Check if the task is not completed and the due date is within the next 5 days
        if (!task.completed && isFutureDueDate(task.dueDate)) {
            alert(`Reminder: ${task.title} is due in the next 5 days!`);
        }

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
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
}

function isFutureDueDate(dueDate) {
    const now = new Date();
    const dueDateTime = new Date(dueDate);
    
    // Compare dueDateTime with a future time, e.g., 5 days from now
    const futureTime = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000); // 5 days in milliseconds
    
    return dueDateTime <= futureTime;
}

window.onload = renderTasks;
