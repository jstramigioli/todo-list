import {  
        addNewProject, 
        allProjectsArray , 
        dateGroup,
        deleteTask , 
        deleteProject ,
        createDateGrouping ,
        
    } from "./todo-logic";

import {
    createDomStructure , 
    loadGroup,
    loadTasks
} from "./dom-logic"

import './style.css'

createDomStructure()


const proyPrueba1 = addNewProject(['Proyectito', 'probando el proyectito',[]])
const proyPrueba2 = addNewProject(['Proyectito2', 'probando el proyectito2',[]])



allProjectsArray[0].addNewTask(['Vitulo de prueba', 'esta es una tarea de prueba', 3, new Date(2024, 3, 11)])
allProjectsArray[0].addNewTask(['Titulo de prueba2', 'testa es una tarea de prueba2', 1 , new Date(2024, 3, 2)])
allProjectsArray[0].addNewTask(['Aloha', 'zesta es una tarea de prueba2', 2, new Date(2023, 2, 22)])



allProjectsArray[0].sortTasks('dueDate')


dateGroup[0].addCorrespondingTasks()
dateGroup[1].addCorrespondingTasks()

allProjectsArray[0].getTasks()[0].completeTask()

// Load date-based groups
loadGroup(dateGroup, 'date-group')

// Load all projects
loadGroup(allProjectsArray, 'custom-projects')

loadTasks(allProjectsArray[0])

console.log(allProjectsArray)
