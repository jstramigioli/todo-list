import { 
        allProjectsArray ,
        
        storeData
        } from ".";


const createDomStructure = () => {
    const content = document.createElement('div');
    content.id = 'content'
    document.body.appendChild(content)

    const header = document.createElement('header')
    header.id = 'main-header'
    header.classList = 'header'

    const appTitle = document.createElement('h2')
    appTitle.textContent = 'My To-do App'
    header.appendChild(appTitle)
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

    // Create Project info
    const projectInfoContainer = document.createElement('div')
    projectInfoContainer.id = 'project-info-container'

    const projectTitle = document.createElement('h1')
    projectTitle.id = 'project-title'
    projectInfoContainer.appendChild(projectTitle)
    mainDisplay.appendChild(projectInfoContainer)


    // Create task container
    const taskContainer = document.createElement('div')
    taskContainer.id = 'task-container'

    // Create Tasks Header
    const taskHeader = document.createElement('header')
    taskHeader.id = 'task-header'
    taskHeader.classList = 'task-element'

    const taskTitle = document.createElement('button')
    taskTitle.classList = 'task-text'
    taskTitle.textContent = 'TO DO'
    taskTitle.addEventListener('click', () => {
        if (allProjectsArray.selectedProject.getTasks().length > 0)
        allProjectsArray.selectedProject.sortTasks('title')
        loadTasks(allProjectsArray.selectedProject)
    })

    const taskPriority = document.createElement('button')
    taskPriority.classList = 'task-priority'
    taskPriority.textContent = 'Priority'
    taskPriority.addEventListener('click', () => {
        if (allProjectsArray.selectedProject.getTasks().length > 0)
        allProjectsArray.selectedProject.sortTasks('priority')
        loadTasks(allProjectsArray.selectedProject)
    })

    const taskDueDate = document.createElement('button')
    taskDueDate.classList = 'task-duedate'
    taskDueDate.textContent = 'Due Date'
    taskDueDate.addEventListener('click', () => {
        if (allProjectsArray.selectedProject.getTasks().length > 0)
        allProjectsArray.selectedProject.sortTasks('dueDate')
        loadTasks(allProjectsArray.selectedProject)
    })

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
    newTaskButton.textContent = '+'
    addHoverListener(newTaskButton)
    newTaskButton.addEventListener('click', createNewTaskForm)
    taskContainer.appendChild(newTaskButton)
    mainDisplay.appendChild(taskContainer)
    content.appendChild(mainDisplay)

}

function addProjectToDom(project, container) {
    const projectDiv = document.createElement('div')
    projectDiv.classList = 'project-div'
    projectDiv.dataset.projID = project.ID
    if (project == allProjectsArray.selectedProject) {projectDiv.classList.add('proj-selected')}
    const projectButton = document.createElement('button')
    projectButton.classList = 'project-button'
    projectButton.textContent = project.getTitle()
    projectButton.addEventListener('click', () => {
        allProjectsArray.selectProject(project)
        DOMSelectProject(project)
    })
    
    if (container.id == 'custom-projects-container') {
        const deleteProjBtn = document.createElement('button')
        deleteProjBtn.classList = 'delete-proj-btn'
        deleteProjBtn.textContent = 'X'
        deleteProjBtn.addEventListener('click', () => {
            allProjectsArray.deleteProject(project)
            allProjectsArray.updateDateGroups()
            if (project.selected == true) {
                allProjectsArray.selectProject(allProjectsArray.dateGroups[0])
                DOMSelectProject(allProjectsArray.dateGroups[0])
            }   
            updateCustomProjectsDOM(allProjectsArray)
        })
        projectDiv.appendChild(deleteProjBtn)
    }
    addHoverListener(projectDiv)
    projectDiv.appendChild(projectButton)

    container.appendChild(projectDiv)
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

    const taskBtnContainer = document.createElement('div')
    taskBtnContainer.classList = 'task-btn-container'

    const editBtn = document.createElement('button')
    editBtn.classList = 'task-edit'
    addHoverListener(editBtn)
    editBtn.addEventListener('click', () => {
        createNewTaskForm('editing', task)
        allProjectsArray.updateDateGroups()
        loadTasks(allProjectsArray.selectedProject)
    })
    taskBtnContainer.appendChild(editBtn)

    const deleteBtn = document.createElement('button')
    deleteBtn.classList = 'task-delete'
    deleteBtn.addEventListener('click', () => {
        task.deleteTask(allProjectsArray)
        allProjectsArray.updateDateGroups()
        loadTasks(allProjectsArray.selectedProject)
    })
    taskBtnContainer.appendChild(deleteBtn)

    taskElement.appendChild(taskText)
    taskElement.appendChild(taskPriority)
    taskElement.appendChild(taskDueDate)
    taskElement.appendChild(taskBtnContainer)
    container.appendChild(taskElement)

}


function updateDateGroupDOM(dateGroup) {
    const groupContainer = document.querySelector('#date-group-container')
    for (let i = 0 ; i < dateGroup.length ; i++) {
        addProjectToDom(dateGroup[i], groupContainer)
    }
}

function updateCustomProjectsDOM(arr) {
    const customProjects = arr.getProjects()
    const groupContainer = document.querySelector('#custom-projects-container')
    groupContainer.innerHTML = ''
    for (let i = 0 ; i < customProjects.length ; i++) {
        addProjectToDom(customProjects[i], groupContainer)
    }
    const newProjectDiv = document.createElement('div')
    newProjectDiv.classList = 'project-div'
    const newProjectBtn = document.createElement('button')
    newProjectBtn.classList = 'project-button'
    newProjectBtn.textContent = '+ New Project'
    addHoverListener(newProjectBtn)
    newProjectBtn.addEventListener('click', () => {
        const newProject = allProjectsArray.createProject('New Project')
        allProjectsArray.selectProject(newProject)
        updateCustomProjectsDOM(arr)
        DOMSelectProject(newProject)
    })
    newProjectDiv.appendChild(newProjectBtn)
    groupContainer.appendChild(newProjectDiv)
    storeData()
}

function DOMSelectProject(project) {
    const allProjectDiv = [...document.querySelectorAll('.project-div')]
        for (let i = 0 ; i < allProjectDiv.length ; i++) {
            if (allProjectDiv[i].classList.contains('proj-selected')) {
                allProjectDiv[i].classList.remove('proj-selected')
            }
        }
        
        const projectDiv = allProjectDiv.find((divs) => {
            return divs.dataset.projID == project.ID
        })
        projectDiv.classList.add('proj-selected')
        loadTasks(project)
}

function loadTasks(project) {
    
    const projectInfoContainer = document.querySelector('#project-info-container')
    //const oldProjectTitleDisplay = document.querySelector('#project-title')
    const projectTitleDisplay = document.createElement('h1')
    projectInfoContainer.innerHTML = ''
    projectTitleDisplay.id = '#project-title'
    projectTitleDisplay.textContent = project.title
    projectInfoContainer.appendChild(projectTitleDisplay)
    addEditProjectListener(project, projectTitleDisplay)

    const taskContainer = document.querySelector('#existing-tasks')
    taskContainer.innerHTML = ['']
    
    for (let i = 0 ; i < project.getTasks().length ; i++) {
        addTaskToDom(project.getTasks()[i], taskContainer)
    }
    storeData()
}

function addEditProjectListener(project, htmlElement) {
    if (allProjectsArray.getProjects().includes(project)){
        addHoverListener(htmlElement)
        htmlElement.addEventListener('click', editProject)
    }
}

function editProject() {
    
    const projectInfo = document.getElementById('project-info-container')
    const projectTitleDisplay = projectInfo.lastChild
    const projectNameInput = document.createElement('input')
    projectNameInput.type = 'text'
    projectNameInput.value = allProjectsArray.selectedProject.getTitle()
    projectInfo.replaceChild(projectNameInput, projectTitleDisplay )

    function setProjectTitle(title) {
        allProjectsArray.selectedProject.title = title
    }

    function setTitleHandler() {
        setProjectTitle(projectNameInput.value)
        const newProjectTitleDisplay = document.createElement('h1')
        newProjectTitleDisplay.id = 'project-title'
        newProjectTitleDisplay.textContent = allProjectsArray.selectedProject.title
        projectInfo.replaceChild(newProjectTitleDisplay, projectNameInput )
        addEditProjectListener(allProjectsArray.selectedProject, newProjectTitleDisplay)
        updateCustomProjectsDOM(allProjectsArray)
    }

    projectNameInput.addEventListener('blur', setTitleHandler)
    projectNameInput.focus()
}


function createNewTaskForm(isEditing, task) {
    const overlay = document.createElement('div')
    overlay.id = 'overlay'
    overlay.addEventListener('click', (e) => {
        document.body.removeChild(overlay)
    })

    let editing = false
    if (isEditing == 'editing') editing = true

    const newTaskFormContainer = document.createElement('div')
    newTaskFormContainer.id = 'new-task-form-container'
     newTaskFormContainer.addEventListener('click', (e) => {
        e.stopPropagation(); 
    })
    const form = document.createElement('form')
    form.id = 'new-task-form'

    const newTaskHeader = document.createElement('div')
    newTaskHeader.classList = 'header'
    newTaskHeader.id = 'form-header'
    form.appendChild(newTaskHeader)

    // Add input and Label for Host Project
    const hostProject = document.createElement('div')
    hostProject.id = 'select-host-project'
    hostProject.classList = 'form-input'
    const hostProjectLabel = document.createElement('label')
    hostProjectLabel.htmlFor = 'host-project'
    hostProjectLabel.innerHTML = 'Select project for this to-do'
    hostProject.appendChild(hostProjectLabel)
    const hostProjectInput = document.createElement('select')
    hostProjectInput.id = 'host-project'
    hostProjectInput.name = 'host-project'
    for (let i=0 ; i < allProjectsArray.getProjects().length ; i++) {
        const project = document.createElement('option')
        project.label = allProjectsArray.getProjects()[i].getTitle()
        project.value = allProjectsArray.getProjects()[i].getID()
        if (typeof allProjectsArray.selectedProject.getID === 'function' && project.value == allProjectsArray.selectedProject.getID()) {
            project.defaultSelected = true
        }
        hostProjectInput.appendChild(project)
    }
    hostProject.appendChild(hostProjectInput)
    form.appendChild(hostProject)

    const taskPropertiesInputContainer = document.createElement('div')
    taskPropertiesInputContainer.id = 'task-properties-input'
    form.appendChild(taskPropertiesInputContainer)

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
    if (editing) {taskNameInput.value = task.title.content}
    taskNameInput.placeholder = 'What is your new To-Do?'
    taskNameInput.required = true
    newTaskName.appendChild(taskNameInput)
    taskPropertiesInputContainer.appendChild(newTaskName)

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
    if (editing) {taskDescriptionInput.value = task.description.content}
    taskDescriptionInput.placeholder = 'If you want, write something about this To-Do'
    newTaskDescription.appendChild(taskDescriptionInput)
    taskPropertiesInputContainer.appendChild(newTaskDescription)
    
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
    if (editing) {
        switch (task.priority.value) {
            case '0':
                optNotDefined.selected = true;
                break;
            case '1':
                optLow.selected = true;
                break;
            case '2':
                optMedium.selected = true;
                break;
            case '3':
                optHigh.selected = true;
                break;
        }
    } 
    newTaskPriority.appendChild(taskPriorityInput)
    taskPropertiesInputContainer.appendChild(newTaskPriority)
    
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
    if (editing) {taskDueDateInput.valueAsDate = task.dueDate.date}
    newTaskDueDate.append(taskDueDateInput)
    taskPropertiesInputContainer.appendChild(newTaskDueDate)

    // Add submit button
    const addTaskBtn = document.createElement('input')
    addTaskBtn.classList.add('new-task-button')
    addTaskBtn.type = 'submit'
    addTaskBtn.value = '+'
    addHoverListener(addTaskBtn)
    form.appendChild(addTaskBtn)
    newTaskFormContainer.appendChild(form)

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const allProjects = allProjectsArray.getProjects()
        const projectID = document.getElementById('host-project').value
        const project = allProjects.find((el) => {
            return el.getID() == projectID
        })
        const name = document.getElementById('task-name').value
        const descr = document.getElementById('task-description').value
        const prior = document.getElementById('task-priority').value
        const date = new Date(document.getElementById('due-date').value.split("-"))
        
        if (editing == true) {task.deleteTask(allProjectsArray)}
        project.addNewTask([name, descr, prior, date])
        allProjectsArray.updateDateGroups()
        loadTasks(project)
        document.body.removeChild(overlay)
    })

    overlay.appendChild(newTaskFormContainer)
    document.body.appendChild(overlay)
}

function addHoverListener(htmlElement) {
    htmlElement.addEventListener('mouseover', () => {
        htmlElement.classList.add('hovered')
    })
    htmlElement.addEventListener('mouseout', () => {
        htmlElement.classList.remove('hovered')
    })
}

export {
    createDomStructure,
    updateDateGroupDOM , 
    updateCustomProjectsDOM ,
    loadTasks
}