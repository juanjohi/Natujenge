

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/tasks');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            taskList.innerHTML = '';
            data.tasks.forEach(task => {
                const li = document.createElement('li');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = task.completed;
                checkbox.addEventListener('change', async () => {
                    try {
                        await fetch(`http://localhost:3000/api/v1/tasks/${task._id}`, {
                            method: 'PATCH',
                            mode: 'cors',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ completed: checkbox.checked })
                        });
                        fetchTasks();
                    } catch (error) {
                        console.error('Update error: ', error);
                    }
                });
                li.appendChild(checkbox);

                const taskName = document.createElement('span');
                taskName.textContent = task.name;
                if (task.completed) {
                    taskName.classList.add('task-completed');
                }
                li.appendChild(taskName);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.className = 'delete-task';
                deleteButton.addEventListener('click', async () => {
                    try {
                        await fetch(`http://localhost:3000/api/v1/tasks/${task._id}`, { method: 'DELETE' });
                        fetchTasks();
                    } catch (error) {
                        console.error('Delete error: ', error);
                    }
                });
                li.appendChild(deleteButton);

                taskList.appendChild(li);
            });
        } catch (error) {
            console.error('Fetch error: ', error);
        }
    };

    addTaskButton.addEventListener('click', async () => {
        const taskName = taskInput.value;
        if (taskName.trim()) {
            await fetch('http://localhost:3000/api/v1/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: taskName })
            });
            taskInput.value = '';
            fetchTasks();
        } else {
            alert('Please enter a task');
        }
    });

    fetchTasks();
});
