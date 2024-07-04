import {TaskType} from './types/common';
import {nameBtnFiltered} from './App';
import {ChangeEvent,  useRef, useState} from 'react';


type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (idTask: string) => void
    filteredTask: (nameBtn: nameBtnFiltered) => void
    addTask: (title: string) => void

}


//регулярная функция
export function Todolist({title, tasks, removeTask, filteredTask, addTask}: TodolistPropsType) {

    const [addNewTitle, setAddNewTitle] = useState ('')

    const inputRef = useRef<HTMLInputElement>(null)

    const handlerOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAddNewTitle (e.currentTarget.value)
    }

    const onClickHandler = () => {
        addTask (addNewTitle)
        setAddNewTitle('')
    }

    const onClickHandlerRef = () => {
        if (inputRef.current) {
            if(inputRef.current.value.length < 15){
                addTask (inputRef.current.value)
            }
            inputRef.current.value = ''
        }

    }

    const handlerOnKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
            if (e.key === 'Enter') {
               addTask(addNewTitle)
                setAddNewTitle('')
            }
    }

    const filteredTaskAll = () => filteredTask ('All')
    const filteredTaskActive = () => filteredTask ('Active')
    const filteredTaskCompleted = () => filteredTask ('Completed')


    const taskElements: Array<JSX.Element> | JSX.Element =
        tasks.length !== 0
            ? tasks.map (task => {

                const onClickRemoveTask = () =>{
                    removeTask (task.id)
                }

                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <button onClick={onClickRemoveTask} style={{marginLeft: '5px'}}>-</button>
                    </li>
                )
            })
            : <span>Your taskslist is empty </span>

    return (
        <div className="todolist">
            <div>
                <h3>{title}</h3>
                <div>
                    <input value={addNewTitle} onChange={handlerOnChange} onKeyDown={handlerOnKeyDown}/>
                    {/*<input ref={inputRef}/>*/}
                    <button onClick={onClickHandler} disabled={!Boolean(addNewTitle.trim())}>+</button>
                    {addNewTitle.length > 15 && <div>Recommended task title is 15 charters</div>}
                </div>
                <span>{taskElements}</span>
                <div>
                    <button onClick={filteredTaskAll}>All</button>
                    <button onClick={filteredTaskActive}> Active</button>
                    <button onClick={filteredTaskCompleted}>Completed</button>
                </div>
            </div>
        </div>
    )
}

// export default Todolist()