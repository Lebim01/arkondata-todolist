import React from 'react'
import { ListItem, ListItemIcon, ListItemSecondaryAction, makeStyles, Grid } from '@material-ui/core'

import TodoItemActions from './TodoItemActions'
import TodoItemTitle from './TodoItemTitle'

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
    const { todo } = useTodo()
    const { provided } = useDraggable()

    return (
        <ListItem dense={!!props.draggable} className={todo.active ? classes.root : ''}>
            <Grid container spacing={3}>
                {props.draggable &&
                    <Grid item xs={1}>
                        <ListItemIcon>
                            <IconButton edge="end" aria-label="comments" {...provided.dragHandleProps}>
                                <DragIndicatorIcon />
                            </IconButton>
                        </ListItemIcon>
                    </Grid>
                }
                <Grid item xs>
                    <TodoItemTitle />
                </Grid>
                <Grid item xs>
                    <ListItemSecondaryAction>
                        <TodoItemActions />
                    </ListItemSecondaryAction>
                </Grid>
            </Grid>
        </ListItem>
    )
})

export default TodoItem