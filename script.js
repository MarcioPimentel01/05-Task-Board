const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')
const btnSaveTask = document.querySelector(`.btn-primary`)


addedTasks = []


btnSaveTask.addEventListener(`click`, () => {
    console.log(`ok`)
    getTask()
})

function getTask () {
    const taskTitle = document.querySelector('#exampleModal input[name="task-title"]').value;
    const taskDate = document.querySelector('#exampleModal input[type="date"]').value;
    const taskDescription = document.querySelector('#exampleModal textarea').value;
    
    const task = {
        title: taskTitle,
        date: taskDate,
        description: taskDescription
    };
    
    const addedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    addedTasks.push(task);
    
    const tasksJson = JSON.stringify(addedTasks);
    
    localStorage.setItem('tasks', tasksJson);
    
}


