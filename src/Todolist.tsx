//cтрелочная функция
// const Todolist = () => {}

import {TaskType} from "./types/common";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
}

//регулярная функция
export function Todolist ({title, tasks}: TodolistPropsType) {

    const taskElements: Array<JSX.Element> | JSX.Element =
    tasks.length !== 0
    ? tasks.map( task => {
        return (
            <li><input type="checkbox" checked={task.isDone}/> <span>{task.title}</span></li>
        )
    })
    : <span>Your taskslist is empty </span>

    return (
        <div className="todolist">
            <div>
                <h3>{title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {taskElements}
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    )
}

// export default Todolist()