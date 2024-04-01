const allProjectsArray = []

const createTask = (title, description, priority, dueDate) => {

    return {
        title,
        description,
        priority,
        dueDate
    }
}

const createProject = (title, description, priority, dueDate, tasks) => {
    function getTasks()  {return tasks}
    return {
        title,
        description,
        priority,
        dueDate,
        tasks,
        getTasks
    }
}

const addNewTask = (project, taskProperties) => {
    project.getTasks().push(createTask(...taskProperties))
    /*refreshDOM()*/
}

const addNewProject = (projectProperties) => {
    allProjectsArray.push(createProject(...projectProperties))
}

/*const editTask = (task, propertyName, newValue) => {
    task[propertyName] = newValue
}
Creo que esto es al pedo
*/

const deleteTask = (task) => {
    for (let i = 0 ; i < allProjectsArray.length ; i++) {
        if (allProjectsArray[i].getTasks().includes(task)) {
            allProjectsArray[i].getTasks().splice(allProjectsArray[i].getTasks().indexOf(task), 1)
        }
    }
}

const deleteProject = (project) => {
    allProjectsArray.splice(allProjectsArray.indexOf(project), 1)
}

const sortTasks = (project, criterion) => {
    switch (criterion) {
        case 'title' :
            project.getTasks().sort((a,b) => a > b ? 1 : -1)
    }
}

export { addNewTask, 
        addNewProject,
        allProjectsArray, 
        deleteTask,
        deleteProject,
        sortTasks
     }