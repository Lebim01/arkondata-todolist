import React, { useState } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add'

const TodoItem = React.memo(({ provided, ...props }) => {
    const onEnter = (e) => {
        if(e.target.value)
        if(e.key === 'Enter'){
            props.onAdd && props.onAdd({ title: e.target.value, completed: false, time: {}, duration: -1 })
            e.target.value = ''
        }
    }

    return (
        <ListItem dense>
            <ListItemIcon>
                <IconButton edge="end" aria-label="comments" disabled>
                    <AddIcon />
                </IconButton>
            </ListItemIcon>
            <InputBase 
                style={{ width: '100%' }} 
                placeholder="Elemento de la lista" 
                onKeyPress={onEnter}
            />
        </ListItem>
    )
})

export default TodoItem