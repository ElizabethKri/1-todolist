import {SxProps} from '@mui/material';
import {pink} from '@mui/material/colors';

export const CheckboxTaskSx : SxProps = {
    color: pink[800],
        '&.Mui-checked': {
    color: pink[600],}
}

export const getListItemSx = (isDone: boolean) : SxProps => (
    {
        p: 0,
        justifyContent: 'space-between',
        opacity: isDone ? 0.5 : 1

    }
)