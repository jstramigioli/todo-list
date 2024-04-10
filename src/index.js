import {  
        createProjectsArray ,
        updateDateGroups,
        deleteProject ,
        createDateGrouping ,
        
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
const allProjectsGroup = createDateGrouping('All my projects', new Date(1, 0, 1), new Date (10000, 0, 1))
const todayGroup = createDateGrouping('Today', startOfToday(), endOfToday())
const thisMonthGroup = createDateGrouping('Next 30 days', startOfToday(), addDays(new Date(), 30))
const dateGroup = [allProjectsGroup, todayGroup, thisMonthGroup]
let selectedProject = allProjectsGroup




function initializeApp() {
    createDomStructure()
    updateDateGroups(dateGroup, allProjectsArray.getProjects())
    updateDateGroupDOM(dateGroup)
    updateCustomProjectsDOM(allProjectsArray)
}

function selectProject(project) {
    selectedProject = project
    updateDateGroups(dateGroup, allProjectsArray.getProjects())
    console.log(selectedProject)
    loadTasks(project)
}

function removeTask(task) {
    deleteTask(task, allProjectsArray.getProjects())
    loadTasks(selectedProject)
}



const proyPrueba1 = allProjectsArray.addNewProject(['Proyectito', 'probando el proyectito'])
const proyPrueba2 = allProjectsArray.addNewProject(['Proyectito2', 'probando el proyectito2'])

console.log(allProjectsArray)

allProjectsArray.getProjects()[0].addNewTask(['Vitulo de prueba', 'esta es una tarea de prueba', 3, new Date(2024, 3, 11)])
allProjectsArray.getProjects()[0].addNewTask(['Titulo de prueba2', 'testa es una tarea de prueba2', 1 , new Date(2024, 3, 3)])
allProjectsArray.getProjects()[0].addNewTask(['Aloha', 'zesta es una tarea de prueba2', 2, new Date(2023, 2, 22)])



allProjectsArray.getProjects()[0].sortTasks('dueDate')




initializeApp()
selectProject(allProjectsGroup)

// Load date-based groups


console.log(allProjectsArray.getProjects())




export { selectProject ,
        allProjectsArray ,
        removeTask ,
        selectedProject
        }