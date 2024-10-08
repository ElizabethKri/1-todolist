import {nameBtnFiltered, TaskType} from './App';
import {ChangeEvent,  useRef, useState} from 'react';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import Tasks from './Tasks';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import {filterButtonsContainersSx} from './types/Todolist.style';






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
    updateTodolist: (todolistId: string, newTitle: string) => void

}


//регулярная функция
export function Todolist({title, tasks, removeTask, filteredTask, addTask, changeTaskStatus, filter, todolistId, removeTodolist, updateTask, updateTodolist}: TodolistPropsType) {



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

    // //todo: починить функцию
    // const updateTaskHandler = (taskId: string,newTitle: string) => {
    //     updateTask(todolistId, taskId, newTitle)
    // }

    const mappedTasks = tasks.map (task => {

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
           <Tasks title={task.title}
                  id={task.id}
                  isDone={task.isDone}
                  changeStatusHandler={changeStatusHandler}
                  onClickRemoveTask={onClickRemoveTask}
                  updateTaskHandler={updateTaskHandler}
           />
        )
    })

    const taskElements: Array<JSX.Element> | JSX.Element =
        tasks.length !== 0
            ? <List>{mappedTasks}</List>
            : <span>Your taskslist is empty </span>

    const addTaskHandler = (title: string) =>{
        addTask(title, todolistId)
    }

    const updateTodolistHandler = (title: string) => {
        updateTodolist(todolistId, title)
    }

    return (
        <div className="todolist">
            <div>
                <h3>
                    <EditableSpan oldTitle={title} updateItem={updateTodolistHandler}/>
                    <IconButton aria-label={'delete'} onClick={() => removeTodolist(todolistId)}>
                        <DeleteIcon fontSize={'inherit'}></DeleteIcon>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTaskHandler}/>
                <span>{taskElements}</span>
                <Box sx = {filterButtonsContainersSx}>
                    <Button variant={filter === 'All'? 'contained' : 'outlined'} color={'warning'} onClick={filteredTaskAll}>All</Button>
                    <Button variant={filter === 'Active'? 'contained' : 'outlined'} color={'primary'} onClick={filteredTaskActive}> Active</Button>
                    <Button variant={filter === 'Completed'? 'contained' : 'outlined'} color={'secondary'} onClick={filteredTaskCompleted}>Completed</Button>
                </Box>
            </div>
        </div>
    )
}

// export default Todolist()