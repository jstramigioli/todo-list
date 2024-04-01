import {  
        addNewProject, 
        allProjectsArray , 
        deleteTask , 
        deleteProject ,
        
    } from "./todo-logic";


const proyPrueba1 = addNewProject(['Proyectito', 'probando el proyectito',[]])
const proyPrueba2 = addNewProject(['Proyectito2', 'probando el proyectito2',[]])



/* addNewTask(allProjectsArray[0], ['Titulo de prueba', 'esta es una tarea de prueba', 1, new Date(2024, 5, 11)])
addNewTask(allProjectsArray[0], ['Titulo de prueba2', 'testa es una tarea de prueba2', 3 , new Date(2024, 3, 3)])
addNewTask(allProjectsArray[0], ['Aloha', 'zesta es una tarea de prueba2', 2, new Date(2023, 2, 22)])

addNewTask(allProjectsArray[1], ['Titulo de prueba', 'esta es una tarea de prueba', , '5 de mayo'])
addNewTask(allProjectsArray[1], ['FTitulo de prueba2', 'testa es una tarea de prueba2', 2 , '25 de mayo'])
addNewTask(allProjectsArray[1], ['Aloha', 'zesta es una tarea de prueba2', 1 , '25 de mayo']) */


allProjectsArray[0].addNewTask(['Titulo de prueba', 'esta es una tarea de prueba', 1, new Date(2024, 5, 11)])
allProjectsArray[0].addNewTask(['Titulo de prueba2', 'testa es una tarea de prueba2', 3 , new Date(2024, 3, 3)])
allProjectsArray[0].addNewTask(['Aloha', 'zesta es una tarea de prueba2', 2, new Date(2023, 2, 22)])

allProjectsArray[1].addNewTask(['Titulo de prueba', 'esta es una tarea de prueba', , '5 de mayo'])
allProjectsArray[1].addNewTask(['FTitulo de prueba2', 'testa es una tarea de prueba2', 2 , '25 de mayo'])
allProjectsArray[1].addNewTask(['Aloha', 'zesta es una tarea de prueba2', 1 , '25 de mayo'])

allProjectsArray[0].sortTasks('dueDate')
allProjectsArray[1].sortTasks('priority')

console.log(allProjectsArray[0].tasks[0].title.edit('titulo editado'))

console.log(allProjectsArray)