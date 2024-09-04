import {nameBtnFiltered, TaskType} from './App';
import {ChangeEvent,  useRef, useState} from 'react';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';


type TodolistPropsType = {
    title: string
    todolistId: string,
    filter: nameBtnFiltered
    tasks: Array<TaskType>

    removeTask: (idTask: string, todolistId: string) => void
    filteredTask: (nameBtn: nameBtnFiltered, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, newChange: boolean, todolistId: string) =>void
    removeTodolist: (todolistId: string) => void
    addTodolist: (title: string) => void
    updateTask: (todolistId: string, taskID: string ,newTitle: string) => void

}


//регулярная функция
export function Todolist({title, tasks, removeTask, filteredTask, addTask, changeTaskStatus, filter, todolistId, removeTodolist, updateTask}: TodolistPropsType) {



    const inputRef = useRef<HTMLInputElement>(null)

    const onClickHandlerRef = () => {
        if (inputRef.current) {
            if(inputRef.current.value.length < 15){
                addTask (inputRef.current.value, todolistId)
            }
            inputRef.current.value = ''
        }

    }

    const filteredTaskAll = () => filteredTask ('All', todolistId)
    const filteredTaskActive = () => filteredTask ('Active', todolistId)
    const filteredTaskCompleted = () => filteredTask ('Completed', todolistId)


    const taskElements: Array<JSX.Element> | JSX.Element =
        tasks.length !== 0
            ? tasks.map (task => {

                const onClickRemoveTask = () =>{
                    removeTask (task.id, todolistId)
                }

                const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    const newChange = e.currentTarget.checked
                    console.log(newChange)
                    changeTaskStatus(task.id, newChange, todolistId)

                }

                const updateTaskHandler = (newTitle: string) => {
                    updateTask(todolistId, task.id, newTitle)
                }

                return (
                    <li key={task.id} className={task.isDone ? "is-done" : ''}>
                        <input type="checkbox" checked={task.isDone} onChange={changeStatusHandler}/>
                        <EditableSpan oldTitle={task.title} updateItem ={updateTaskHandler}/>
                        <button onClick={onClickRemoveTask} style={{marginLeft: '5px'}}>-</button>
                    </li>
                )
            })
            : <span>Your taskslist is empty </span>

    const addTaskHandler = (title: string) =>{
        addTask(title, todolistId)
    }

    return (
        <div className="todolist">
            <div>
                <h3>
                    {title}
                    <button onClick={() => removeTodolist(todolistId)}>x</button>
                </h3>
                <AddItemForm addItem={addTaskHandler}/>
                <span>{taskElements}</span>
                <div>
                    <button className={filter === 'All'? 'active-filter' : ''} onClick={filteredTaskAll}>All</button>
                    <button className={filter === 'Active'? 'active-filter' : ''} onClick={filteredTaskActive}> Active</button>
                    <button className={filter === 'Completed'? 'active-filter' : ''} onClick={filteredTaskCompleted}>Completed</button>
                </div>
            </div>
        </div>
    )
}

// export default Todolist()