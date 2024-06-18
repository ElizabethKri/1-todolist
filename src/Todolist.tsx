import {TaskType} from './types/common';
import {nameBtnFiltered} from './App';


type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (idTask: number) => void
    filteredTask: (nameBtn: nameBtnFiltered) => void

}

//регулярная функция
export function Todolist({title, tasks, removeTask, filteredTask}: TodolistPropsType) {

    const taskElements: Array<JSX.Element> | JSX.Element =
        tasks.length !== 0
            ? tasks.map (task => {
                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <button onClick={() => removeTask (task.id)} style={{marginLeft: '5px'}}>-</button>
                    </li>
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
                <span>{taskElements}</span>
                <div>
                    <button onClick={() => filteredTask ('All')}>All</button>
                    <button onClick={() => filteredTask ('Active')}> Active</button>
                    <button onClick={() => filteredTask ('Completed')}>Completed</button>
                </div>
            </div>
        </div>
    )
}

// export default Todolist()