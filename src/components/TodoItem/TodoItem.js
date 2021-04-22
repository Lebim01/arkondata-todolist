import React from 'react'
import { ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, makeStyles } from '@material-ui/core'
import InputBase from '@material-ui/core/InputBase'

import TodoItemActions from './TodoItemActions'

import IconButton from '@material-ui/core/IconButton';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator'

// Context
import { useTodo } from 'src/context/todo'
import { useDraggable } from 'src/context/draggable'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.main,
    }
}));

const TodoItem = React.memo((props) => {
    const classes = useStyles()
    const { todo, updateTodo } = useTodo()
    const { provided } = useDraggable()

    return (
        <ListItem dense={!!props.draggable} className={todo.active ? classes.root : ''}>
            {props.draggable &&
                <ListItemIcon>
                    <IconButton edge="end" aria-label="comments" {...provided.dragHandleProps}>
                        <DragIndicatorIcon />
                    </IconButton>
                </ListItemIcon>
            }
            { todo.completed
                ? (
                    <ListItemText primary={todo.title} />
                )
                : (
                    <InputBase 
                        style={{ width: '100%' }} 
                        value={todo.title}
                        onChange={(e) => updateTodo({ title: e.target.value })}
                    />
                )
            }
            <ListItemSecondaryAction>
                <TodoItemActions />
            </ListItemSecondaryAction>
        </ListItem>
    )
})

export default TodoItem