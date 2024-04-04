import {  
        addNewProject, 
        allProjectsArray , 
        dateGroup,
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

import './style.css'

function initializeApp() {
    createDomStructure()
    updateDateGroups()
    updateDateGroupDOM(dateGroup)
    updateCustomProjectsDOM(allProjectsArray)
}




const proyPrueba1 = addNewProject(['Proyectito', 'probando el proyectito',[]])
const proyPrueba2 = addNewProject(['Proyectito2', 'probando el proyectito2',[]])



allProjectsArray[0].addNewTask(['Vitulo de prueba', 'esta es una tarea de prueba', 3, new Date(2024, 3, 11)])
allProjectsArray[0].addNewTask(['Titulo de prueba2', 'testa es una tarea de prueba2', 1 , new Date(2024, 3, 3)])
allProjectsArray[0].addNewTask(['Aloha', 'zesta es una tarea de prueba2', 2, new Date(2023, 2, 22)])



allProjectsArray[0].sortTasks('dueDate')




initializeApp()

// Load date-based groups



loadTasks(allProjectsArray[0])



