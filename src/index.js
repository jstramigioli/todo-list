import {  
        createProjectsArray ,  
    } from "./todo-logic";

import {
    createDomStructure , 
    updateDateGroupDOM,
    updateCustomProjectsDOM ,
    loadTasks
} from "./dom-logic"

import { startOfToday } from "date-fns/startOfToday"
import { endOfToday } from "date-fns/endOfToday"
import { addDays } from "date-fns/addDays";

import './style.css'

const allProjectsArray = createProjectsArray()


function initializeApp() {
    
    allProjectsArray.createDateGrouping('All my projects', new Date(1, 0, 1), new Date (10000, 0, 1))
    allProjectsArray.createDateGrouping('Today', startOfToday(), endOfToday())
    allProjectsArray.createDateGrouping('Next 30 days', startOfToday(), addDays(new Date(), 30))
    addStoredDataToAllProjectsArray()
    allProjectsArray.updateDateGroups()
    allProjectsArray.selectProject(allProjectsArray.dateGroups[0])
    createDomStructure()
    
    updateDateGroupDOM(allProjectsArray.dateGroups)
    updateCustomProjectsDOM(allProjectsArray)
    loadTasks(allProjectsArray.selectedProject)
}


function removeTask(task) {
    deleteTask(task, allProjectsArray.getProjects())
    loadTasks(selectedProject)
}

function storeData() {
    localStorage.setItem('allProjects', JSON.stringify(allProjectsArray.getProjects()))
}

function retrieveData() {
   return JSON.parse(localStorage.getItem('allProjects'))
}

function addStoredDataToAllProjectsArray() {
    const data = retrieveData()
    if (data) {
        for (let i = 0 ; i < data.length ; i++) {
            allProjectsArray.createProject(data[i].title, data[i].description)
            const tasks = data[i].tasks
            for (let j = 0 ; j < tasks.length ; j++) {
                allProjectsArray.getProjects()[i].addNewTask([tasks[j].title.content, tasks[j].description.content , tasks[j].priority.value, new Date(tasks[j].dueDate.date)])
            }
        }
    }
    else {
    loadDefaultProject()
}
}

function loadDefaultProject() {
    const defaultProj = allProjectsArray.createProject('My first Project')
    defaultProj.addNewTask(['My first to do', 'Here you can write something about this to do.', '1', new Date()])
}



export { 
    allProjectsArray ,
    removeTask ,
    storeData
    }





initializeApp()




