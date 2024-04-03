
import { createTask } from './todo-logic'

const refreshDOM = () => {
    
}

const createDomStructure = () => {
    const content = document.createElement('div');
    content.id = 'content'
    document.body.appendChild(content)

    const header = document.createElement('header')
    header.id = 'header'
    header.textContent = 'My To-do App'
    content.appendChild(header)

    const sideBar = document.createElement('div');
    sideBar.id = 'sidebar'
    content.appendChild(sideBar)

    const mainDisplay = document.createElement('main')
    mainDisplay.id = 'main-display'
    content.appendChild(mainDisplay)

}

function addProjectToDom(project, container) {
    const projectButton = document.createElement('button')
    projectButton.classList = 'project-button'
    projectButton.textContent = project.getTitle()
    container.appendChild(projectButton)
}

function addTaskToDom(task, container) {
    const taskElement = document.createElement('div')
    taskElement.classList = 'task-element'

    const taskText = document.createElement('div')
    taskText.classList = 'task-text'

    const taskTitle = document.createElement('p')
    taskTitle.classList = 'task-title'
    taskTitle.textContent = task.getTitle()
    taskText.appendChild(taskTitle)

    const taskDescription = document.createElement('p')
    taskDescription.classList = 'task-description'
    taskDescription.textContent = task.getDescription()
    taskText.appendChild(taskDescription)

    const taskPriority = document.createElement('p')
    taskPriority.classList = 'task-priority'
    taskPriority.textContent = task.getPriorityDisplay()

    const taskDueDate = document.createElement('p')
    taskDueDate.classList = 'task-duedate'
    taskDueDate.textContent = task.getDueDateDisplay()


    taskElement.appendChild(taskText)
    taskElement.appendChild(taskPriority)
    taskElement.appendChild(taskDueDate)
    container.appendChild(taskElement)

}

function loadGroup(group, groupName) {
    const groupContainer = document.createElement('div')
    groupContainer.classList = `${groupName}-container`
    document.getElementById('sidebar').appendChild(groupContainer)
    for (let i = 0 ; i < group.length ; i++) {
        addProjectToDom(group[i], groupContainer)
    }
}

function loadTasks(project) {
    // Create task container
    const taskContainer = document.createElement('div')
    taskContainer.id = 'task-container'

    // Create Header
    const taskHeader = document.createElement('header')
    taskHeader.id = 'task-header'
    taskHeader.classList = 'task-element'

    const taskTitle = document.createElement('p')
    taskTitle.classList = 'task-text'
    taskTitle.textContent = 'TO DO'

    const taskPriority = document.createElement('p')
    taskPriority.classList = 'task-priority'
    taskPriority.textContent = 'Priority'

    const taskDueDate = document.createElement('p')
    taskDueDate.classList = 'task-duedate'
    taskDueDate.textContent = 'Due Date'

    taskHeader.appendChild(taskTitle)
    taskHeader.appendChild(taskPriority)
    taskHeader.appendChild(taskDueDate)
    taskContainer.appendChild(taskHeader)

    // Add tasks to display
    document.getElementById('main-display').appendChild(taskContainer)
    for (let i = 0 ; i < project.getTasks().length ; i++) {
        addTaskToDom(project.tasks[i], taskContainer)
    }

    // Add new task button
    const newTaskButton = document.createElement('button')
    newTaskButton.classList = 'new-task-button'
    newTaskButton.textContent = '+'
    newTaskButton.addEventListener('click', createNewTaskForm)
    taskContainer.appendChild(newTaskButton)
    
}

function addNewTask() {
    createTask(prompt('titulo'), prompt('descripcion'), prompt('prioridad'), new Date())
}

function createNewTaskForm() {
    const overlay = document.createElement('div')
    overlay.id = 'overlay'


    const newTaskForm = document.createElement('div')
    newTaskForm.id = 'new-task-form'
    overlay.appendChild(newTaskForm)
    document.body.appendChild(overlay)
}


export {
    createDomStructure,
    loadGroup , 
    loadTasks
}