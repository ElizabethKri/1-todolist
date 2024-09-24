import {ChangeEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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

    const buttonStyles = {
        maxWidth: '38px',
        maxHeight: '38px',
        minHeight: '38px',
        background: 'primary'
    }

    return (
        <div>
            <TextField
                id={'outlined-basic'}
                size={'small'}
                label={error ? error:'Write the title'}
                variant={'outlined'}
                error={!!error}
                className={error ? 'error' : ''}
                value={addNewTitle}
                onChange={handlerOnChange}
                onKeyDown={handlerOnKeyDown}/>
            {/*<input ref={inputRef}/>*/}

            <Button variant="contained"
                    size={'small'}
                    style={buttonStyles}
                    onClick={AddItemHandler}
                // disabled={!(addNewTitle.trim())}
            >+
            </Button>
            {/*{error && <div className={"error-message"}>{error}</div>}*/}
            {addNewTitle.length > 15 && <div>Recommended task title is 15 charters</div>}
        </div>
    );
};

export default AddItemForm;