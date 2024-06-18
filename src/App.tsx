import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {TaskType} from "./types/common";

function App() {

    const todolistTitle = "What to learn"
    const [tasks, setTasks]  = useState <TaskType[]>(
        [
            {id: 1, title: "HTML", isDone: true},
            {id: 2, title: "CSS", isDone: true},
            {id: 3, title: "TS/JS", isDone: false},
            {id:4, title: "REACT", isDone: false},
        ]
    )
    // const todolistTitle_1 = "What to buy"
    // const tasks_1: Array<TaskType> = [
    //     {id: 1, title: "Water", isDone: true},
    //     {id: 2, title: "Wine", isDone: true},
    //     {id: 3, title: "Meat", isDone: false},
    //     {id:4, title: "Milk", isDone: false},
    // ]

    const removeTask = (idTask: number) => {
        const removeTask = tasks.filter( task => {return task.id !== idTask})
        setTasks(removeTask)
    }

    return (
        <div className="App">




             {/*const el = document. createelement("div")*/}
             {/*el.classList.add("App")*/}
             {/*root.append(el)*/}

            <Todolist title = {todolistTitle} tasks={tasks} removeTask={removeTask} />
            {/*<Todolist title = {todolistTitle_1} tasks={tasks_1} />*/}

            {/*<Todolist title = "What to buy"/>*/}
            {/*<Todolist title = "What to read"/>*/}
        </div>
    );
}

export default App;
