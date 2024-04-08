import { selectProject ,
        allProjectsArray ,
        removeTask,
        selectedProject
        } from ".";


const createDomStructure = () => {
    const content = document.createElement('div');
    content.id = 'content'
    document.body.appendChild(content)

    const header = document.createElement('header')
    header.id = 'header'
    header.textContent = 'My To-do App'
    content.appendChild(header)

    // SideBar
    const sideBar = document.createElement('div');
    sideBar.id = 'sidebar'

    const dateGroupContainer = document.createElement('div')
    dateGroupContainer.id = `date-group-container`
    sideBar.appendChild(dateGroupContainer)
    const customProjectsContainer = document.createElement('div')
    customProjectsContainer.id = 'custom-projects-container'
    sideBar.appendChild(customProjectsContainer)
    content.appendChild(sideBar)

    const mainDisplay = document.createElement('main')
    mainDisplay.id = 'main-display'

    // Create task container
    const taskContainer = document.createElement('div')
    taskContainer.id = 'task-container'

    // Create Tasks Header
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

    // Create existing tasks container
    const existingTasks = document.createElement('div')
    existingTasks.id = 'existing-tasks'
    taskContainer.appendChild(existingTasks)

    // Create new task button
    const newTaskButton = document.createElement('button')
    newTaskButton.classList = 'new-task-button'
    newTaskButton.textContent = '+ New Task'
    newTaskButton.addEventListener('click', createNewTaskForm)
    taskContainer.appendChild(newTaskButton)


    mainDisplay.appendChild(taskContainer)


    content.appendChild(mainDisplay)

}

function addProjectToDom(project, container) {
    const projectButton = document.createElement('button')
    projectButton.classList = 'project-button'
    projectButton.textContent = project.getTitle()
    projectButton.addEventListener('click', () => {
        selectProject(project)
    }
    )
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

    const deleteBtn = document.createElement('button')
    deleteBtn.classList = 'task-delete'
    deleteBtn.textContent = 'X'
    deleteBtn.addEventListener('click', () => {
        removeTask(task)
        console.log(allProjectsArray)
    })



    taskElement.appendChild(taskText)
    taskElement.appendChild(taskPriority)
    taskElement.appendChild(taskDueDate)
    taskElement.appendChild(deleteBtn)
    container.appendChild(taskElement)

}


function updateDateGroupDOM(dateGroup) {
    const groupContainer = document.querySelector('#date-group-container')
    for (let i = 0 ; i < dateGroup.length ; i++) {
        addProjectToDom(dateGroup[i], groupContainer)
    }
}

function updateCustomProjectsDOM(customProjects, addNewProjectFunction) {
    const groupContainer = document.querySelector('#custom-projects-container')
    groupContainer.innerHTML = ''
    for (let i = 0 ; i < customProjects.length ; i++) {
        addProjectToDom(customProjects[i], groupContainer)
    }
    const newProjectBtn = document.createElement('button')
    newProjectBtn.classList = 'project-button'
    newProjectBtn.textContent = '+ New Project'
    newProjectBtn.addEventListener('click', () => {
        addNewProjectFunction(['Proyectito', 'probando el proyectito',[]], customProjects)
        updateCustomProjectsDOM(customProjects, addNewProjectFunction)
    })
    groupContainer.appendChild(newProjectBtn)
}


function loadTasks(project) {
    
    const taskContainer = document.querySelector('#existing-tasks')
    taskContainer.innerHTML = ['']
    
    for (let i = 0 ; i < project.getTasks().length ; i++) {
        addTaskToDom(project.tasks[i], taskContainer)
    }
    
}

function createNewProjectForm() {
    const overlay = document.createElement('div')
    overlay.id = 'project-overlay'
    overlay.addEventListener('click', (e) => {
        document.body.removeChild(overlay)
    })

    const newProjectFormContainer = document.createElement('div')
    newProjectFormContainer.id = 'new-project-form-container'
    newProjectFormContainer.addEventListener('click', (e) => {
        e.stopPropagation(); 
    })
    const form = document.createElement('form')
    form.id = 'new-project-form'

    // Add input and Label for Name
    const newProjectName = document.createElement('div')
    newProjectName.id = 'new-project-name'
    newProjectName.classList = 'form-input'
    const projectNameLabel = document.createElement('label')
    projectNameLabel.htmlFor = 'project-name'
    projectNameLabel.innerHTML = 'Project name'
    newProjectName.appendChild(projectNameLabel)
    const projectNameInput = document.createElement('input')
    projectNameInput.type = 'text'
    projectNameInput.name = 'project-name'
    projectNameInput.id = 'project-name'
    projectNameInput.placeholder = 'What is your new project about?'
    projectNameInput.required = true
    newProjectName.appendChild(projectNameInput)
    form.appendChild(newProjectName)

    // Add input and Label for Description
    const newProjectDescription = document.createElement('div')
    newProjectDescription.id = 'new-project-description'
    newProjectDescription.classList = 'form-input'
    const projectDescriptionLabel = document.createElement('label')
    projectDescriptionLabel.htmlFor = 'project-description'
    projectDescriptionLabel.innerHTML = 'Description'
    newProjectDescription.appendChild(projectDescriptionLabel)
    const projectDescriptionInput = document.createElement('textarea')
    projectDescriptionInput.id = 'project-description'
    projectDescriptionInput.name = 'project-description'
    projectDescriptionInput.placeholder = 'If you want, write something about this project'
    newProjectDescription.appendChild(projectDescriptionInput)
    form.appendChild(newProjectDescription)

}


function createNewTaskForm() {
    const overlay = document.createElement('div')
    overlay.id = 'overlay'
    overlay.addEventListener('click', (e) => {
        document.body.removeChild(overlay)
    })


    const newTaskFormContainer = document.createElement('div')
    newTaskFormContainer.id = 'new-task-form-container'
     newTaskFormContainer.addEventListener('click', (e) => {
        e.stopPropagation(); 
    })
    const form = document.createElement('form')
    form.id = 'new-task-form'

    // Add input and Label for Host Project
    const hostProject = document.createElement('div')
    hostProject.id = 'select-host-project'
    hostProject.classList = 'form-input'
    const hostProjectLabel = document.createElement('label')
    hostProjectLabel.htmlFor = 'host-project'
    hostProjectLabel.innerHTML = 'In wich project do yo want to create your new task?'
    hostProject.appendChild(hostProjectLabel)
    const hostProjectInput = document.createElement('select')
    hostProjectInput.id = 'host-project'
    hostProjectInput.name = 'host-project'
    for (let i=0 ; i < allProjectsArray.length ; i++) {
        const project = document.createElement('option')
        project.label = allProjectsArray[i].getTitle()
        project.value = allProjectsArray[i].getID()
        if (typeof selectedProject.getID === 'function' && project.value == selectedProject.getID()) {
            project.defaultSelected = true
        }
        hostProjectInput.appendChild(project)
    }
    hostProject.appendChild(hostProjectInput)
    form.appendChild(hostProject)

    // Add input and Label for Name
    const newTaskName = document.createElement('div')
    newTaskName.id = 'new-task-name'
    newTaskName.classList = 'form-input'
    const taskNameLabel = document.createElement('label')
    taskNameLabel.htmlFor = 'task-name'
    taskNameLabel.innerHTML = 'Task name'
    newTaskName.appendChild(taskNameLabel)
    const taskNameInput = document.createElement('input')
    taskNameInput.type = 'text'
    taskNameInput.name = 'task-name'
    taskNameInput.id = 'task-name'
    taskNameInput.placeholder = 'What is your new To-Do?'
    taskNameInput.required = true
    newTaskName.appendChild(taskNameInput)
    form.appendChild(newTaskName)

    // Add input and Label for Description
    const newTaskDescription = document.createElement('div')
    newTaskDescription.id = 'new-task-description'
    newTaskDescription.classList = 'form-input'
    const taskDescriptionLabel = document.createElement('label')
    taskDescriptionLabel.htmlFor = 'task-description'
    taskDescriptionLabel.innerHTML = 'Description'
    newTaskDescription.appendChild(taskDescriptionLabel)
    const taskDescriptionInput = document.createElement('textarea')
    taskDescriptionInput.id = 'task-description'
    taskDescriptionInput.name = 'task-description'
    taskDescriptionInput.placeholder = 'If you want, write something about this To-Do'
    newTaskDescription.appendChild(taskDescriptionInput)
    form.appendChild(newTaskDescription)
    

    // Add input and label for Priority
    const newTaskPriority = document.createElement('div')
    newTaskPriority.id = 'new-task-priority'
    newTaskPriority.classList = 'form-input'
    const taskPriorityLabel = document.createElement('label')
    taskPriorityLabel.htmlFor = 'task-priority'
    taskPriorityLabel.innerHTML = 'Priority'
    newTaskPriority.appendChild(taskPriorityLabel)
    const taskPriorityInput = document.createElement('select')
    taskPriorityInput.id = 'task-priority'
    taskPriorityInput.name = 'task-priority'
        const optNotDefined = document.createElement('option')
        optNotDefined.label = 'Not defined'
        optNotDefined.value = '0'
        taskPriorityInput.appendChild(optNotDefined)
        const optLow = document.createElement('option')
        optLow.label = 'Low'
        optLow.value = '1'
        taskPriorityInput.appendChild(optLow)
        const optMedium = document.createElement('option')
        optMedium.label = 'Medium'
        optMedium.value = '2'
        taskPriorityInput.appendChild(optMedium)
        const optHigh = document.createElement('option')
        optHigh.label = 'High'
        optHigh.value = '3'
        taskPriorityInput.appendChild(optHigh)       
    newTaskPriority.appendChild(taskPriorityInput)
    form.appendChild(newTaskPriority)
    
    // Add input and label for Due date
    const newTaskDueDate = document.createElement('div')
    newTaskDueDate.id = 'new-task-duedate'
    newTaskDueDate.classList = 'form-input'
    const taskDueDateLabel = document.createElement('label')
    taskDueDateLabel.htmlFor = 'due-date'
    taskDueDateLabel.innerHTML = 'Due date'
    newTaskDueDate.appendChild(taskDueDateLabel)
    const taskDueDateInput = document.createElement('input')
    taskDueDateInput.type = 'date'
    taskDueDateInput.name = 'due-date'
    taskDueDateInput.id = 'due-date'
    taskDueDateInput.min = new Date()
    taskDueDateInput.valueAsDate = new Date()
    newTaskDueDate.append(taskDueDateInput)
    form.appendChild(newTaskDueDate)

    // Add submit button
    const addTaskBtn = document.createElement('input')
    addTaskBtn.type = 'submit'
    addTaskBtn.textContent = '+'
    form.appendChild(addTaskBtn)

    newTaskFormContainer.appendChild(form)

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const allProjects = allProjectsArray
        const projectID = document.getElementById('host-project').value
        const project = allProjects.find((el) => {
            return el.getID() == projectID
        })
        const name = document.getElementById('task-name').value
        const descr = document.getElementById('task-description').value
        const prior = document.getElementById('task-priority').value
        const date = new Date(document.getElementById('due-date').value.split("-"))

        console.log(document.getElementById('due-date').value)
        
        project.addNewTask([name, descr, prior, date])
        loadTasks(project)
        document.body.removeChild(overlay)
        console.log(allProjectsArray)
    })

    overlay.appendChild(newTaskFormContainer)
    document.body.appendChild(overlay)
}


export {
    createDomStructure,
    updateDateGroupDOM , 
    updateCustomProjectsDOM ,
    loadTasks
}