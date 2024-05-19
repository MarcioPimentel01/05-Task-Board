const _deleteButtons = document.querySelectorAll('.btn-card button');
const _btnClose = document.getElementById('btn-close')
const _cards = document.getElementById('todo-cards');
const _dynamicCards = document.querySelectorAll('.card');

const id = []
const tasks = []
const tasksPlusId = []

generateUniqueId()
function generateUniqueId() {
    const uniqueId = Math.floor(Math.random() * 1000);
    id.unshift(uniqueId);
    getModalData();
}

function getModalData(event) {
    event.preventDefault();
    const taskTitle = document.querySelector('#exampleModal input[name="task-title"]').value;
    const taskDate = document.querySelector('#exampleModal input[type="date"]').value;
    const taskDescription = document.querySelector('#exampleModal textarea').value;
    
    const task = {
        title: taskTitle,
        date: taskDate,
        description: taskDescription,
        id: id[0]
    };
    task.unshift(task);
    localStorage.setItem('taskCards', JSON.stringify(task));
}

function createTaskCards() {
    const taskCards = JSON.parse(localStorage.getItem('taskCards')) || [];
    tasksPlusId.unshift(...taskCards.map(task => ({ ...task, id: id[0] })));
    
    _cards.innerHTML = '';

    tasksPlusId.forEach((task) => {
        const taskCardContainer = document.createElement('div');
        taskCardContainer.classList.add('card');
        taskCardContainer.draggable = true;

        taskCardContainer.innerHTML = `
        <div class="card text-bg-primary mb-3 draggableDiv" id="${task.id}" style="max-width: 24rem;">
            <div class="card-header">${task.date}</div>
                <div class="card-body">
                    <h5 class="card-title">${task.title}</h5>
                    <p class="card-text">${task.description}</p>
                <div><button type="button" class="btn btn-light">Delete Task</button></div>
            </div>
        </div>`
        
        _cards.appendChild(taskCardContainer);
    }
)}

