import { addNewTask, 
        addNewProject, 
        allProjectsArray , 
        deleteTask , 
        deleteProject ,
        sortTasks
    } from "./todo-logic";


const proyPrueba1 = addNewProject(['Proyectito', 'probando el proyectito', 'media', 'ayer',[]])
const proyPrueba2 = addNewProject(['Proyectito2', 'probando el proyectito2', 'media2', 'ayer',[]])


addNewTask(allProjectsArray[0], ['Titulo de prueba', 'esta es una tarea de prueba', 'alta', '5 de mayo'])
addNewTask(allProjectsArray[0], ['Titulo de prueba2', 'esta es una tarea de prueba2', 'baja', '25 de mayo'])
addNewTask(allProjectsArray[0], ['Aloha', 'esta es una tarea de prueba2', 'baja', '25 de mayo'])

sortTasks(allProjectsArray[0], 'title')

console.log(allProjectsArray)