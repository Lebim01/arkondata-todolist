import React, { useState } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add'

const TodoItem = React.memo(({ provided, ...props }) => {
    const [checked, setChecked] = useState(false);

    
    return (
        <ListItem dense>
            <ListItemIcon>
                <IconButton edge="end" aria-label="comments" disabled>
                    <AddIcon />
                </IconButton>
            </ListItemIcon>
            <InputBase style={{ width: '100%' }} placeholder="Elemento de la lista" />
        </ListItem>
    )
})

export default TodoItem