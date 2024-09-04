import React, {ChangeEvent, useState} from 'react';

type Props = {
    oldTitle: string
    updateItem: (newTitle: string) => void
}

const EditableSpan = ({oldTitle, updateItem}: Props) => {
    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState (oldTitle)
    console.log(newTitle)

    const activeEditModeHandler = () => {
        setEditMode(!editMode)
        if(editMode){
            addItemHandler()
        }
    }
    // const deActiveEditModeHandler = () => {setEditMode(false)}

    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const addItemHandler = () => {
        updateItem(newTitle)
    }

    return (
        editMode ?
        <input type={'text'}
               value={newTitle}
               onBlur={activeEditModeHandler}
               autoFocus
               onChange = {changeTitleHandler}
        /> :
        <span onDoubleClick={activeEditModeHandler}>{oldTitle}</span>
    );
};

export default EditableSpan;