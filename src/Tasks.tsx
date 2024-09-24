import React, {ChangeEvent} from 'react';
import EditableSpan from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {pink} from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {CheckboxTaskSx, getListItemSx} from './types/Tasks.style';

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
        <ListItem
            key={id}
            // className={isDone ? "is-done" : ''}
            sx = {getListItemSx(isDone)}
        >
            <div>
                <Checkbox
                    defaultChecked
                    sx={CheckboxTaskSx}
                    checked={isDone}
                    onChange={changeStatusHandler}/>
                <EditableSpan oldTitle={title} updateItem={updateTaskHandler}/>
            </div>
            <IconButton aria-label={'delete'} size={'small'} onClick={onClickRemoveTask} style={{marginLeft: '5px'}}>
                <DeleteIcon fontSize={'inherit'}/>
            </IconButton>
        </ListItem>
    );
};

export default Tasks;