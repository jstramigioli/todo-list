import { isAfter } from "date-fns/isAfter"

// An array with all the projects of the app

const allProjectsArray = []


// Properties for task function factory

const hasTitle = (title) => {
    
    function sort(project) {
        project.getTasks().sort((a,b) => a.title.content > b.description.content ? 1 : -1)
    }

    function edit(newTitle) {
        this.content = newTitle
    }

    return {
        content: title,
        sort,
        edit
    }
}

const hasDescription = (description) => {
    function edit(newDescription) {
        this.content = newDescription
    }
    return {
        content: description,
        edit
    }
}

const hasPriority = (priority) => {
    function sort(project) {
        project.getTasks().sort((a,b) => a.priority.value - b.priority.value )
    }
    let display

    switch (priority) {
        case 1: 
            display = 'Low';
            break;
        case 2:
            display = 'Medium';
            break;
        case 3:
            display = 'High'
            break;
        default:
            display = 'No priority defined' 
    }

    function edit(newPriority) {
        this.content = newPriority
    }

    return {
        value: priority,
        display,
        sort,
        edit
    }
}

const hasDueDate = (dueDate) => {

    function sort(project) {
        project.getTasks().sort((a,b) => isAfter(a.dueDate.date, b.dueDate.date) ? 1 : -1)
    }

    function edit(newDueDate) {
        this.content = newDueDate
    }

    return {
        date: dueDate,
        sort,
        edit
    }
}

// Task Function factory

const createTask = (title, description, priority, dueDate) => {

    return {
        title: hasTitle(title),
        description: hasDescription(description),
        priority: hasPriority(priority),
        dueDate: hasDueDate(dueDate)
    }
}

// Project Function Factory

const createProject = (title, description, tasks) => {
    
    function getTasks()  {return tasks}

    function sortTasks(propertyToSort) {
        this.tasks.sort(this.tasks[0][propertyToSort].sort(this))
    }

    function addNewTask(taskProperties) {
        this.getTasks().push(createTask(...taskProperties))
    }

    return {
        title,
        description,
        tasks,
        addNewTask,
        getTasks,
        sortTasks
    }
}

//Add new project

const addNewProject = (projectProperties) => {
    allProjectsArray.push(createProject(...projectProperties))
}


// Delete Task

const deleteTask = (task) => {
    for (let i = 0 ; i < allProjectsArray.length ; i++) {
        if (allProjectsArray[i].getTasks().includes(task)) {
            allProjectsArray[i].getTasks().splice(allProjectsArray[i].getTasks().indexOf(task), 1)
        }
    }
}


// Delete Project

const deleteProject = (project) => {
    allProjectsArray.splice(allProjectsArray.indexOf(project), 1)
}


export { 
        addNewProject,
        allProjectsArray, 
        deleteTask,
        deleteProject,
        
     }