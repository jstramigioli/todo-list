//import date-fns assets

import { isAfter } from "date-fns/isAfter"
import { isSameDay } from "date-fns/isSameDay"
import { endOfToday } from "date-fns/endOfToday"
import { startOfToday } from "date-fns/startOfToday"
import { endOfMonth } from "date-fns/endOfMonth"
import { format } from "date-fns/format"


// Properties for task function factory

const hasTitle = (title) => {
    
    function sort(project) {
        project.getTasks().sort((a,b) => a.title.content > b.title.content ? 1 : -1)
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

// Task Function factory

const createTask = (title, description, priority, dueDate) => {

    function getTitle() {return this.title.content}
    function getDescription() {return this.description.content}
    function getPriorityDisplay() {return this.priority.display}
    function getDueDate() {return this.dueDate.date}
    function getDueDateDisplay() {return this.dueDate.display}

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
        ...hasCompletionState()
    }
}

// Project Function Factory

const createProject = (title, description, tasks) => {
    
    function getTasks()  {return this.tasks}

    function getTitle() {return this.title}

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
        getTitle,
        getTasks,
        sortTasks
    }
}


// Date Grouping factory

const createDateGrouping = (title, from, to) => {

    let tasks = []

    function getTasks()  {return this.tasks}

    function getTitle() {return this.title}

    function sortTasks(propertyToSort) {
        this.tasks.sort(this.getTasks()[0][propertyToSort].sort(this))
    }

    function clearTasks() {
        this.tasks = []
    }

    function addCorrespondingTasks() {
        for (let i = 0 ; i < allProjectsArray.length ; i++) {
            for (let k = 0 ; k < allProjectsArray[i].getTasks().length ; k++) {
                if ((isAfter(allProjectsArray[i].getTasks()[k].getDueDate(), from)
                    || 
                    isSameDay(allProjectsArray[i].getTasks()[k].getDueDate(),from))
                    &&
                    isAfter(to, allProjectsArray[i].getTasks()[k].getDueDate() ))
                    {
                        this.tasks.push(allProjectsArray[i].getTasks()[k])
                    }
            }
        }
    }


    return {
        title,
        tasks,
        getTasks,
        getTitle,
        sortTasks,
        addCorrespondingTasks,
        clearTasks
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

// Initialize app
const allProjectsArray = []
const todayGroup = createDateGrouping('Today', startOfToday(), endOfToday())
const thisMonthGroup = createDateGrouping('This month', startOfToday(), endOfMonth(new Date()))
const dateGroup = [todayGroup, thisMonthGroup]


function updateDateGroups() {
    for (let i=0 ; i<dateGroup.length ; i++) {
        dateGroup[i].clearTasks()
        dateGroup[i].addCorrespondingTasks()
    }
}

export { 
        
        allProjectsArray, 
        dateGroup,
        updateDateGroups,
        addNewProject,
        createTask,
        deleteTask,
        deleteProject,
        createDateGrouping,
    }