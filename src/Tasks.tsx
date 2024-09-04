import React, {ChangeEvent} from 'react';
import EditableSpan from './EditableSpan';

type Props = {
    id: string,
    title: string,
    isDone: boolean,
    changeStatusHandler:(e: ChangeEvent<HTMLInputElement>) => void
    updateTaskHandler:(newTitle: string) => void
    onClickRemoveTask:() => void

}

const Tasks = ({id, title, isDone, changeStatusHandler, updateTaskHandler, onClickRemoveTask}: Props) => {
    return (
        <li key={id} className={isDone ? "is-done" : ''}>
            <input type="checkbox" checked={isDone} onChange={changeStatusHandler}/>
            <EditableSpan oldTitle={title} updateItem={updateTaskHandler}/>
            <button onClick={onClickRemoveTask} style={{marginLeft: '5px'}}>-</button>
        </li>
    );
};

export default Tasks;