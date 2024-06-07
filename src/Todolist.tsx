import {TaskType} from "./types/common";
import {Button} from "./Button";

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
                    <Button title={' + '}/>
                </div>
                <ul>
                    {taskElements}
                </ul>
                <div>
                    <Button title={'All'}/>
                    <Button title={'Active'}/>
                    <Button title={'Completed'}/>
                </div>
            </div>
        </div>
    )
}

// export default Todolist()