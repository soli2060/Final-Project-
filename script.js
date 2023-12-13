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

        // Calculate the number of days remaining until the task is due
        const daysRemaining = calculateDaysRemaining(dueDate);
        if (daysRemaining > 0) {
            alert(`Reminder: ${task} is due in ${daysRemaining} days!`);
        } else if (daysRemaining === 0) {
            alert(`Reminder: ${task} is due today!`);
        } else {
            alert(`Reminder: ${task} is overdue by ${Math.abs(daysRemaining)} days!`);
        }

        renderTasks();
    } else {
        alert('Please enter both a task and a due date');
    }
}

function calculateDaysRemaining(dueDate) {
    const now = new Date();
    const dueDateTime = new Date(dueDate);

    // Calculate the difference in days
    const timeDifference = dueDateTime.getTime() - now.getTime();
    const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return daysRemaining;
}
