import {ChangeEvent, useState} from 'react';

type Props = {
    addItem: (title: string) => void
}

const AddItemForm = ({addItem}: Props) => {
    const [error, setError] = useState<null | string>(null)
    const [addNewTitle, setAddNewTitle] = useState ('')

    const handlerOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAddNewTitle (e.currentTarget.value)
    }

    const AddItemHandler = () => {
        if (addNewTitle.trim() !== '') {
            addItem (addNewTitle.trim())
            setAddNewTitle('')
            setError(null)
        }
        else {
            setError('Title is required')
        }
    }

    const handlerOnKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === 'Enter') {
            addItem(addNewTitle)
            setAddNewTitle('')
            setError(null)
        }
    }


    return (
        <div>
            <input className={error ? "error" : ""}
                   value={addNewTitle}
                   onChange={handlerOnChange}
                   onKeyDown={handlerOnKeyDown}/>
            {/*<input ref={inputRef}/>*/}
            <button onClick={AddItemHandler}
                // disabled={!(addNewTitle.trim())}
            >+
            </button>
            {error && <div className={"error-message"}>{error}</div>}
            {addNewTitle.length > 15 && <div>Recommended task title is 15 charters</div>}
        </div>
    );
};

export default AddItemForm;