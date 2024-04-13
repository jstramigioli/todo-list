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
    createDomStructure()
    
    updateDateGroupDOM(allProjectsArray.dateGroups)
    updateCustomProjectsDOM(allProjectsArray)
}

function selectProject(project) {
    selectedProject = project
    //allProjectsArray.updateDateGroups()
    loadTasks(project)
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
    const proyPrueba1 = allProjectsArray.createProject('Proyectito', 'probando el proyectito')
    const proyPrueba2 = allProjectsArray.createProject('Proyectito2', 'probando el proyectito2')
    
    allProjectsArray.getProjects()[0].addNewTask(['Vitulo de prueba', 'esta es una tarea de prueba', '3', new Date(2024, 3, 11)])
    allProjectsArray.getProjects()[0].addNewTask(['Titulo de prueba2', 'testa es una tarea de prueba2', '1' , new Date(2024, 3, 3)])
    allProjectsArray.getProjects()[0].addNewTask(['Aloha', 'zesta es una tarea de prueba2', '2', new Date(2023, 2, 22)])
}
}



let selectedProject = allProjectsArray.getProjects()[0]

export { selectProject ,
    allProjectsArray ,
    removeTask ,
    selectedProject ,
    storeData
    }





initializeApp()
selectProject(allProjectsArray.getProjects()[0])



