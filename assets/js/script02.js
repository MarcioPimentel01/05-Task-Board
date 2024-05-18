document.addEventListener('DOMContentLoaded', function() {
    const btnSaveTask = document.getElementById('btn-close');
    const createCardTaskContainers = document.querySelectorAll('.create-task-card');
    const dropDraggableDivs = document.querySelectorAll('.main-columns');

    let objTask = [];

    btnSaveTask.addEventListener('click', () => {
        getTask();
    });

    function refreshDraggableEvents() {
        const draggableDivs = document.querySelectorAll('.draggableDiv');

        draggableDivs.forEach(draggable => {
            draggable.addEventListener('dragstart', (event) => {
                event.dataTransfer.setData('text/plain', draggable.id);
                event.dataTransfer.effectAllowed = 'move';
            });
        });

        dropDraggableDivs.forEach(dropArea => {
            dropArea.addEventListener('dragover', (event) => {
                event.preventDefault();
                event.dataTransfer.dropEffect = 'move';
            });

            dropArea.addEventListener('drop', (event) => {
                event.preventDefault();
                const draggableId = event.dataTransfer.getData('text/plain');
                const draggableElement = document.getElementById(draggableId);
                dropArea.querySelector('.create-task-card').appendChild(draggableElement);

                // Optionally, you can update the task's status in the localStorage here
            });
        });
    }

    function getTask() {
        const taskTitle = document.querySelector('#exampleModal input[name="task-title"]').value;
        const taskDate = document.querySelector('#exampleModal input[type="date"]').value;
        const taskDescription = document.querySelector('#exampleModal textarea').value;

        const task = {
            title: taskTitle,
            date: taskDate,
            description: taskDescription,
            id: Date.now().toString() // Unique ID for each task
        };

        objTask = JSON.parse(localStorage.getItem('tasks')) || [];
        objTask.push(task);

        localStorage.setItem('tasks', JSON.stringify(objTask));

        createCards();
    }

    function createCards() {
        createCardTaskContainers.forEach(container => container.innerHTML = '');

        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        console.log(tasks);

        tasks.forEach(task => {
            const createTaskCard = document.createElement('div');
            createTaskCard.classList.add('task');
            createTaskCard.id = task.id;
            createTaskCard.setAttribute('draggable', 'true');

            const currentDate = new Date();
            const taskDate = new Date(task.date);
            let cardClass = '';

            if (taskDate > currentDate) {
                cardClass = 'text-bg-success'; // On time
            } else if (taskDate < currentDate) {
                cardClass = 'text-bg-danger'; // Late
            } else {
                cardClass = 'text-bg-warning'; // Done
            }

            createTaskCard.innerHTML = `
            <div class="card ${cardClass} mb-3 draggableDiv" style="max-width: 22rem;">
                <div class="card-header">${task.date}</div>
                    <div class="card-body">
                    <h5 class="card-title">${task.title}</h5>
                        <p class="card-text">${task.description}</p>
                    <div class="btn-card"><button type="button" class="btn btn-light delete-task-btn" data-id="${task.id}">Delete Task</button></div>
                </div>
            </div>`;

            createCardTaskContainers[0].appendChild(createTaskCard);
        });

        refreshDraggableEvents();

        document.querySelectorAll('.delete-task-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const taskId = event.target.getAttribute('data-id');
                deleteTask(taskId);
            });
        });
    }

    function deleteTask(taskId) {
        objTask = JSON.parse(localStorage.getItem('tasks')) || [];
        objTask = objTask.filter(task => task.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(objTask));
        createCards();
    }

    createCards();
    refreshDraggableEvents();
});
