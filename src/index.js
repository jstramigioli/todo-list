import {  
        addNewProject, 
        updateDateGroups,
        deleteTask , 
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

const allProjectsArray = []
const allProjectsGroup = createDateGrouping('All my projects', new Date(1, 0, 1), new Date (10000, 0, 1))
const todayGroup = createDateGrouping('Today', startOfToday(), endOfToday())
const thisMonthGroup = createDateGrouping('Next 30 days', startOfToday(), addDays(new Date(), 30))
const dateGroup = [allProjectsGroup, todayGroup, thisMonthGroup]
let selectedProject = allProjectsGroup




function initializeApp() {
    createDomStructure()
    updateDateGroups(dateGroup, allProjectsArray)
    updateDateGroupDOM(dateGroup)
    updateCustomProjectsDOM(allProjectsArray, addNewProject)
}

function selectProject(project) {
    selectedProject = project
    updateDateGroups(dateGroup, allProjectsArray)
    console.log(selectedProject)
    loadTasks(project)
}

function removeTask(task) {
    deleteTask(task, allProjectsArray)
    updateDateGroups(dateGroup, allProjectsArray)
    updateCustomProjectsDOM(allProjectsArray, addNewProject)
    loadTasks(selectedProject)
}



const proyPrueba1 = addNewProject(['Proyectito', 'probando el proyectito',[]], allProjectsArray)
const proyPrueba2 = addNewProject(['Proyectito2', 'probando el proyectito2',[]], allProjectsArray)



allProjectsArray[0].addNewTask(['Vitulo de prueba', 'esta es una tarea de prueba', 3, new Date(2024, 3, 11)])
allProjectsArray[0].addNewTask(['Titulo de prueba2', 'testa es una tarea de prueba2', 1 , new Date(2024, 3, 3)])
allProjectsArray[0].addNewTask(['Aloha', 'zesta es una tarea de prueba2', 2, new Date(2023, 2, 22)])



allProjectsArray[0].sortTasks('dueDate')




initializeApp()
selectProject(allProjectsGroup)

// Load date-based groups


console.log(allProjectsArray)




export { selectProject ,
        allProjectsArray ,
        removeTask ,
        selectedProject
        }