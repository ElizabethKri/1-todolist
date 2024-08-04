import React, {useMemo, useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {TaskType} from './types/common';
import {v1} from 'uuid';

export type nameBtnFiltered = 'All' | 'Active' | 'Completed'

function App() {

    const todolistTitle = 'What to learn'
    const [tasks, setTasks] = useState<TaskType[]> (
        [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'TS/JS', isDone: false},
            {id: v1(), title: 'REACT', isDone: false},
        ]
    )
    console.log(tasks)


    // const todolistTitle_1 = "What to buy"
    // const tasks_1: Array<TaskType> = [
    //     {id: 1, title: "Water", isDone: true},
    //     {id: 2, title: "Wine", isDone: true},
    //     {id: 3, title: "Meat", isDone: false},
    //     {id:4, title: "Milk", isDone: false},
    // ]

    const [filter, setFilter] = useState<nameBtnFiltered> ('All')

    const removeTask = (idTask: string) => {
        const removeTask = tasks.filter (task => {
            return task.id !== idTask
        })
        setTasks (removeTask)
    }

    const addTask = (title: string) => {
        let newTask =  {id: v1(), title: title, isDone: false}
        let addTask = [newTask, ...tasks]
        setTasks(addTask)
        console.log(addTask)
    }

    let filteredTask = tasks
    if (filter === 'Active') {
        filteredTask = tasks.filter (task => !task.isDone)
    }
    if (filter === 'Completed') {
        filteredTask = tasks.filter (task => task.isDone)
    }



    const changeFilteredTask = (nameBtn: nameBtnFiltered) => {
        setFilter (nameBtn)
    }

    const changeTaskStatus = (id: string, newChange: boolean) => {
        // const task = tasks.find(el => el.id === id)
        // if(task) {
        //     task.isDone = newChange
        //     setTasks([...tasks])
        // }
        //можно с помощью map
        const newChangeTask = tasks.map( t => (t.id === id ? {...t, isDone: newChange}: t))
        setTasks(newChangeTask)
    }

    //при использовании хука useMemo
    const filtredTasksData = useMemo(() => {
        let filteredTask = tasks
        if (filter === 'Active') {
            filteredTask = tasks.filter (task => !task.isDone)
        }
        if (filter === 'Completed') {
            filteredTask = tasks.filter (task => task.isDone)
        }
        return filteredTask
    }, [filter])


    // const getFiltredTasks = () => {
    //         let filteredTask = tasks
    //         if (filter === 'Active') {
    //             filteredTask = tasks.filter (task => !task.isDone)
    //         }
    //         if (filter === 'Completed') {
    //             filteredTask = tasks.filter (task => task.isDone)
    //         }
    //         return filteredTask
    // }

    return (
        <div className="App">

            {/*const el = document. createelement("div")*/}
            {/*el.classList.add("App")*/}
            {/*root.append(el)*/}

            <Todolist title={todolistTitle}
                      tasks={filteredTask}
                      removeTask={removeTask}
                      addTask = {addTask}
                      filteredTask={changeFilteredTask}
                      changeTaskStatus = {changeTaskStatus}
                      filter = {filter}
            />

        </div>
    );
}

export default App;
