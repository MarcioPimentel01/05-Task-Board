document.addEventListener(`DOMContentLoaded`, function() {
    
    // const myModal = document.getElementById('myModal')
    // const myInput = document.getElementById('myInput')
    const btnSaveTask = document.getElementById(`btn-close`);
    const _createCardTask = document.querySelectorAll(`.create-task-card`);
    const _draggableDiv = document.querySelectorAll (`.draggableDiv`);
    const _dropDraggableDiv = document.querySelectorAll(`.main-columns`);
    
    
    objTask = [];
    
    
    btnSaveTask.addEventListener(`click`, () => {
        console.log(`ok`)
        getTask()
    });

    _draggableDiv.forEach(draggable => {
        draggable.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', draggable.id); 
        });
    });
    
    _dropDraggableDiv.forEach(dropArea => {
        dropArea.addEventListener('dragover', (event) => {
            event.preventDefault(); 
        });
        
        dropArea.addEventListener('drop', (event) => {
            event.preventDefault();
            const draggableId = event.dataTransfer.getData('text/plain');
            const draggableElement = document.getElementById(draggableId);
            dropArea.appendChild(draggableElement); 
        });
    });
    
    
    function getTask () {
        const taskTitle = document.querySelector('#exampleModal input[name="task-title"]').value;
        const taskDate = document.querySelector('#exampleModal input[type="date"]').value;
        const taskDescription = document.querySelector('#exampleModal textarea').value;
        
        const task = {
            title: taskTitle,
            date: taskDate,
            description: taskDescription
        };
        
        // Normally, the order would be to use setItem. However, the line below parses the 'objTask' object from localStorage and initializes an empty array if no tasks exist.
        // In other words, this line parses the stored tasks from localStorage into JSON format so they can later be added to the 'objTask' array. Only after that, the tasks are stringified and set into localStorage.
        const objTask = JSON.parse(localStorage.getItem('tasks')) || [];

        objTask.push(task);
        
        const objTaskJson = JSON.stringify(objTask);
        
        localStorage.setItem('tasks', objTaskJson);

        createCards()
    }
    
    function createCards () {


        const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Retrieve tasks from localStorage and parse as JSON
        console.log(tasks);

        tasks.forEach(task => {
            const createTaskCard = document.createElement(`div`);
            createTaskCard.classList.add(`task`);
            
            createTaskCard.innerHTML = `
            <div class="card text-bg-primary mb-3 draggableDiv" draggable="true" style="max-width: 22rem;">
                <div class="card-header">${task.date}</div>
                    <div class="card-body">
                    <h5 class="card-title">${task.title}</h5>
                        <p class="card-text">${task.description}</p>
                    <div class="btn-card"><button type="button" class="btn btn-light">Delete Task</button></div>
                </div>
            </div>`

            _createCardTask[0].appendChild(createTaskCard);
        });
        
    }
})


