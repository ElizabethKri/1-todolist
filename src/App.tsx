import React, {useMemo, useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';

export type nameBtnFiltered = 'All' | 'Active' | 'Completed'

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
    disabled?: boolean

}

export type TodolistType = {
    id: string,
    title: string,
    filter: nameBtnFiltered,

    // tasks: TaskType[]
}

type TasksStateType = {
    [todolistId: string] : TaskType[]
}

const todolist_1 = v1();
const todolist_2 = v1();


function App() {

    const [todolist, setTodolist] = useState<Array<TodolistType>>(
        [{
            id: todolist_1,
            title:'What to learn',
            filter: 'All',
        },
        {
            id: todolist_2,
            title: "What to buy",
            filter: 'All',
        }]
    )

    // const [tasks, setTasks] = useState([
    //     {id: v1(), todolistId: todolist_1, title: 'HTML', isDone: true},
    //     {id: v1(), todolistId: todolist_1, title: 'CSS', isDone: true},
    //     {id: v1(), todolistId: todolist_1, title: 'TS/JS', isDone: false},
    //     {id: v1(), todolistId: todolist_1, title: 'REACT', isDone: false},
    //     {id: v1(), todolistId: todolist_2, title: "Water", isDone: true},
    //     {id: v1(), todolistId: todolist_2, title: "Wine", isDone: true},
    //     {id: v1(), todolistId: todolist_2, title: "Meat", isDone: false},
    //     {id: v1(), todolistId: todolist_2, title: "Milk", isDone: false}
    // ])

    const [tasks, setTasks] = useState<TasksStateType>(
        {
            [todolist_1]: [
                {id: v1 (), title: 'HTML', isDone: true},
                {id: v1 (), title: 'CSS', isDone: true},
                {id: v1 (), title: 'TS/JS', isDone: false},
                {id: v1 (), title: 'REACT', isDone: false},],
            [todolist_2]: [
                {id: v1 (), title: 'Water', isDone: true},
                {id: v1 (), title: 'Wine', isDone: true},
                {id: v1 (), title: 'Meat', isDone: false},
                {id: v1 (), title: 'Milk', isDone: false}]
        }
    )


    const removeTask = (idTask: string, todolistId: string) => {

        // const removeTask = tasks.filter (task => {
        //     return task.id !== idTask
        // })
        // setTasks (removeTask)

        setTasks({...tasks,
        [todolistId] : tasks[todolistId].filter(t => t.id !== idTask)
        })
    }

    const addTask = (title: string, todolistId: string) => {

        let newTask =  {id: v1(), title: title, isDone: false}
        // let addTask = [newTask, ...tasks]
        // setTasks(addTask)
        // console.log(addTask)
        setTasks(
            {
                ...tasks,
                [todolistId] : [ ...tasks[todolistId], newTask]
            }
        )
    }

    const changeTaskStatus = (id: string, newChange: boolean, todolistId: string) => {
        // const task = tasks.find(el => el.id === id)
        // if(task) {
        //     task.isDone = newChange
        //     setTasks([...tasks])
        // }
        //можно с помощью map
        // const newChangeTask = tasks.map( t => (t.id === id ? {...t, isDone: newChange}: t))
        // setTasks(newChangeTask)

        setTasks({
            ...tasks,
            [todolistId] : tasks[todolistId].map( t => (t.id === id ? {...t, isDone: newChange}: t))
        })
    }

    const changeFilteredTask = (nameBtn: nameBtnFiltered, todolistId: string) => {
        setTodolist(todolist.map(tl => tl.id === todolistId ? { ...tl, filter: nameBtn} : tl))
    }

    const removeTodolist = (todolistId: string) => {
        setTodolist(todolist.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
    }

    const addTodolist = (title: string) => {
        const newId = v1()
        const newTodo: TodolistType = {id: newId, title, filter: 'All'}
        setTodolist([newTodo,...todolist])
        setTasks({ [newId]: [], ...tasks})

    }

    const updateTask = (todolistId: string, taskID: string ,title: string) => {
        console.log(title)
        setTasks({...tasks, [todolistId] : tasks[todolistId].map(el => el.id === taskID ? {...el, title} : el)})

    }

    const updateTodolist = (todolistId: string, title: string) => {
        setTodolist(todolist.map(el => el.id === todolistId ? {...el, title} :el))
    }

    const todolistComp: Array<JSX.Element> = todolist.map(tl => {

        let filteredTask = tasks[tl.id]
        if (tl.filter === 'Active') {
            filteredTask = filteredTask.filter (task => !task.isDone)
        }
        if (tl.filter === 'Completed') {
            filteredTask = filteredTask.filter (task => task.isDone)
        }

        return (
            <Todolist
                key ={tl.id}
                title={tl.title}
                todolistId = {tl.id}
                tasks={filteredTask}
                //в объекте task выбираем по id один массив и передаем в todolist
                removeTask={removeTask}
                addTask = {addTask}
                filteredTask={changeFilteredTask}
                changeTaskStatus = {changeTaskStatus}
                filter = {tl.filter}
                removeTodolist ={removeTodolist}
                addTodolist={addTodolist}
                updateTask = {updateTask}
                updateTodolist = {updateTodolist}

        />

        )
    })

    // //при использовании хука useMemo
    // const filtredTasksData = useMemo(() => {
    //     let filteredTask = tasks
    //     if (filter === 'Active') {
    //         filteredTask = tasks.filter (task => !task.isDone)
    //     }
    //     if (filter === 'Completed') {
    //         filteredTask = tasks.filter (task => task.isDone)
    //     }
    //     return filteredTask
    // }, [filter])


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
            <AddItemForm addItem={addTodolist}/>

            {/*const el = document. createelement("div")*/}
            {/*el.classList.add("App")*/}
            {/*root.append(el)*/}

            {todolistComp}


        </div>
    );
}

export default App;
