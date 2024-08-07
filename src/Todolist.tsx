import {TaskType} from './types/common';
import {nameBtnFiltered} from './App';
import {ChangeEvent,  useRef, useState} from 'react';


type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (idTask: string) => void
    filteredTask: (nameBtn: nameBtnFiltered) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, newChange: boolean) =>void
    filter: nameBtnFiltered

}


//регулярная функция
export function Todolist({title, tasks, removeTask, filteredTask, addTask, changeTaskStatus, filter}: TodolistPropsType) {

    const [addNewTitle, setAddNewTitle] = useState ('')

    const inputRef = useRef<HTMLInputElement>(null)

    const [error, setError] = useState<null | string>(null)

    const handlerOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAddNewTitle (e.currentTarget.value)
    }

    const onClickHandler = () => {
        if (addNewTitle.trim() !== '') {
            addTask (addNewTitle.trim())
            setAddNewTitle('')
            setError(null)
        }
        else {
            setError('Title is required')
        }
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
                setError(null)
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

                const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    const newChange = e.currentTarget.checked
                    console.log(newChange)
                    changeTaskStatus(task.id, newChange)

                }

                return (
                    <li key={task.id} className={task.isDone ? "is-done" : ''}>
                        <input type="checkbox" checked={task.isDone} onChange={changeStatusHandler}/>
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
                    <input className={error ? "error": ""} value={addNewTitle} onChange={handlerOnChange} onKeyDown={handlerOnKeyDown}/>
                    {/*<input ref={inputRef}/>*/}
                    <button onClick={onClickHandler}
                            // disabled={!(addNewTitle.trim())}
                    >+</button>
                    {error && <div className={"error-message"}>{error}</div>}
                    {addNewTitle.length > 15 && <div>Recommended task title is 15 charters</div>}
                </div>
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