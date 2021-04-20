import React from 'react'
import { ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Checkbox, Tooltip } from '@material-ui/core'

import IconButton from '@material-ui/core/IconButton';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator'

import TodoItemMenu from './TodoItemMenu'
import DurationChip from './DurationChip'

import { updateTodo } from 'src/redux/actions/todos'
import { connect } from 'react-redux'

function getStyle(provided, style) {
    if (!style) {
      return provided.draggableProps.style;
    }
  
    return {
      ...provided.draggableProps.style,
      ...style,
    };
}

const TodoItem = React.memo(({ todo, provided, ...props }) => {

    const handleToggle = () => {
        props.updateTodo && 
            props.updateTodo({
                ...todo,
                completed: !todo.completed,
                completed_at: !todo.completed ? new Date() : null
            })
    };

    const selectDuration = (duration) => {
        props.updateTodo &&
            props.updateTodo({
                ...todo,
                duration
            })
    }

    const labelId = `checkbox-list-label-${todo.uuid}`;

    if(props.draggable){
        return (
            <div
                ref={provided.innerRef}
                isDragging={props.isDragging}
                isGroupedOver={props.isGroupedOver}
                {...provided.draggableProps}
                style={getStyle(provided, {})}
                data-is-dragging={props.isDragging}
                data-testid={todo.uuid}
                data-index={props.idx}
                aria-label={todo.title}
            >
                <ListItem dense>
                    <ListItemIcon>
                        <IconButton edge="end" aria-label="comments" {...provided.dragHandleProps}>
                            <DragIndicatorIcon />
                        </IconButton>
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={todo.title} />
                    <ListItemSecondaryAction>
                        <DurationChip duration={todo.duration} editable onSelect={selectDuration} />
                        <Tooltip title="Marcar como completada">
                            <Checkbox
                                edge="start"
                                checked={todo.completed}
                                tabIndex={-1}
                                disableRipple
                                onClick={handleToggle}
                                inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </Tooltip>
                        <TodoItemMenu completed={todo.completed} />
                    </ListItemSecondaryAction>
                </ListItem>
            </div>
        )
    }
    
    return (
        <ListItem>
            <ListItemText id={labelId} primary={todo.title} />
            <ListItemSecondaryAction>
                <DurationChip duration={todo.duration} />
                <Checkbox
                    edge="start"
                    checked={todo.completed}
                    tabIndex={-1}
                    disableRipple
                    onClick={handleToggle}
                    inputProps={{ 'aria-labelledby': labelId }}
                />
                <TodoItemMenu completed={todo.completed} />
            </ListItemSecondaryAction>
        </ListItem>
    )
})

const mapStateToProps = (state, props) => {
    return {
        todo: state.todos.todos.find(r => r.uuid === props.uuid)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateTodo: (item) => dispatch(updateTodo(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem)