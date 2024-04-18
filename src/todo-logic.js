//import date-fns assets

import { isAfter } from "date-fns/isAfter"
import { isSameDay } from "date-fns/isSameDay"


import { format } from "date-fns/format"
/* import { allProjectsArray, selectProject } from "."; */

let projectID = 0

function arraysAreIdentical(arr1, arr2){
    if (arr1.length !== arr2.length) return false;
    for (var i = 0, len = arr1.length; i < len; i++){
        if (arr1[i] !== arr2[i]){
            return false;
        }
    }
    return true; 
}

// Properties for task function factory

const hasTitle = (title) => {
    
    function sort(project) {
        let currentOrder = project.getTasks().slice()
        project.getTasks().sort((a,b) => a.title.content.toUpperCase() > b.title.content.toUpperCase() ? 1 : -1)
        if (arraysAreIdentical(currentOrder, project.getTasks()))
        project.getTasks().reverse()
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
        let currentOrder = project.getTasks().slice()
        project.getTasks().sort((a,b) => a.priority.value - b.priority.value )
        if (arraysAreIdentical(currentOrder, project.getTasks()))
        project.getTasks().reverse()
    }
    let display

    switch (priority) {
        case '0':
            display = 'No priority defined' ;
            break;
        case '1': 
            display = 'Low';
            break;
        case '2':
            display = 'Medium';
            break;
        case '3':
            display = 'High'
            break;
        default:
            display = 'default option' 
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
        let currentOrder = project.getTasks().slice()

        project.getTasks().sort((a,b) => isAfter(a.dueDate.date, b.dueDate.date) ? 1 : -1)

        if (arraysAreIdentical(currentOrder, project.getTasks()))
        project.getTasks().reverse()
    }

    function edit(newDueDate) {
        this.content = newDueDate
    }

    return {
        date: dueDate,
        display: format(dueDate, 'd MMMM, y'),
        sort,
        edit
    }
}

const hasCompletionState = () => {
    function completeTask() {this.completionState = 'complete'}
    function incompleteTask() {this.completionState = 'incomplete'}
    return {
        completionState: 'incomplete' ,
        completeTask,
        incompleteTask
    }
}

const hasProjectID = () => {
    let newID = projectID
    projectID++
    return {
        ID: newID
    }
}

const canBeSelected = () => {
    return {selected: false}
}

// Array of projects function factory

const createProjectsArray = () => {

    function createProject(title) {
    
        const tasks = []
        
        function getTasks()  {return this.tasks}
    
        function getTitle() {return this.title}
    
        function sortTasks(propertyToSort) {
            this.tasks.sort(this.getTasks()[0][propertyToSort].sort(this))
        }
    
        function addNewTask(taskProperties) {
            this.getTasks().push(createTask(...taskProperties))
        }
    
        function getID() {
            return this.ID
        }
    
        this.projects.push( {
            title,
            tasks,
            sortingProperty: 'title',
            ...hasProjectID(),
            addNewTask,
            getTitle,
            getTasks,
            sortTasks,
            getID,
            ...canBeSelected()
            
        }
        )

        return this.projects[this.projects.length - 1]
        
    }

    function getProjects() {return this.projects} 

    function createDateGrouping(title, from, to) {

            let tasks = []

            function getTasks()  {return this.tasks}

            function getTitle() {return this.title}

            function sortTasks(propertyToSort) {
                this.tasks.sort(this.getTasks()[0][propertyToSort].sort(this))
            }

            function clearTasks() {
                this.tasks = []
            }

            this.dateGroups.push(
                {
                    title,
                    tasks,
                    from,
                    to,
                    getTasks,
                    getTitle,
                    sortTasks,
                    clearTasks ,
                    ...hasProjectID(),
                    ...canBeSelected()
                }
            )
        }

    function updateDateGroups() {
        for (let h = 0 ; h < this.dateGroups.length ; h++) {
            this.dateGroups[h].clearTasks()
            for (let i = 0 ; i < this.getProjects().length ; i++) {
                for (let k = 0 ; k < this.getProjects()[i].getTasks().length ; k++) {
                    if ((isAfter(this.getProjects()[i].getTasks()[k].getDueDate(), this.dateGroups[h].from)
                        || 
                        isSameDay(this.getProjects()[i].getTasks()[k].getDueDate(), this.dateGroups[h].from))
                        &&
                        isAfter(this.dateGroups[h].to, this.getProjects()[i].getTasks()[k].getDueDate() ))
                        {
                            this.dateGroups[h].getTasks().push(this.getProjects()[i].getTasks()[k])
                        }
                }
            }
        } 
        
    }

    function deleteProject(project) {
        this.projects.splice(this.projects.indexOf(project), 1)
    }


    function selectProject(project) {
        this.selectedProject = project
        
        
        
        for (let i = 0; i < this.getProjects().length ; i++) {
            this.getProjects()[i].selected = false
        }
        for (let i = 0; i < this.dateGroups.length ; i++) {
            this.dateGroups[i].selected = false
        }
        project.selected = true
    }


    return {
        projects: [] ,
        dateGroups: [] ,
        selectedProject: '' ,
        selectProject ,
        createProject , 
        getProjects ,
        createDateGrouping ,
        updateDateGroups ,
        deleteProject
    }
}

// Task Function factory

const createTask = (title, description, priority, dueDate) => {

    function getTitle() {return this.title.content}
    function getDescription() {return this.description.content}
    function getPriorityDisplay() {return this.priority.display}
    function getDueDate() {return this.dueDate.date}
    function getDueDateDisplay() {return this.dueDate.display}
    
    function deleteTask(allProjectsArray) {
       for (let i = 0 ; i < allProjectsArray.getProjects().length ; i++) {
            if (allProjectsArray.getProjects()[i].getTasks().includes(this)) {
                allProjectsArray.getProjects()[i].getTasks().splice(allProjectsArray.getProjects()[i].getTasks().indexOf(this), 1)
            }
        }
        allProjectsArray.updateDateGroups()
    }
    return {
        title: hasTitle(title),
        description: hasDescription(description),
        priority: hasPriority(priority),
        dueDate: hasDueDate(dueDate),
        getTitle,
        getDescription,
        getPriorityDisplay,
        getDueDate,
        getDueDateDisplay,
        ...hasCompletionState(),
        deleteTask,
    }
}




export { 
        createProjectsArray ,
        createTask,
    }