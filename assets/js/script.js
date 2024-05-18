let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));



let id = []
function generateUniqueId() {
    const uniqueId = Math.floor(Math.random() * 1000);
    id.unshift(uniqueId);
    createTaskCard();
}

function createTaskCard () {
    try {
        const _card = document.getElementById(`card`);
        if (!_card) {
            throw new Error('createTaskCard: document.getElementById("card") returns null');
        }

        const cardList = JSON.parse(localStorage.getItem(`card`)) || [];
        if (!Array.isArray(cardList)) {
            throw new Error('createTaskCard: localStorage.getItem("card") does not return an array');
        }

        id.forEach(cardId => {
            const createCard = document.createElement(`div`);
            createCard.classList.add(`card-body`);
            createCard.classList.add('draggableDiv');
            createCard.setAttribute(`draggable`, 'true');
            createCard.id = cardId;

            createCard.innerHTML = `
            <div class="card text-bg-primary mb-3 draggableDiv" draggable="true" style="max-width: 22rem;">
            <div class="card-header">header</div>
                <div class="card-body">
                <h5 class="card-title">title</h5>
                    <p class="card-text">task description</p>
                <div class="btn-card"><button type="button" class="btn btn-light">Delete Task</button></div>
            </div>
        </div>`;

            _card.appendChild(createCard);
        });
    } catch (error) {
        console.error(error.message);
        console.error(error.stack);
    }
}

// todo renderTaskList function
//? create a function to render the task list and make cards draggable

// todo handleAddTask function
//? create a function to handle adding a new task

// todo handleDeleteTask function
//? create a function to handle deleting a task

// todo handleDrop function
//? create a function to handle dropping a task into a new status lane

