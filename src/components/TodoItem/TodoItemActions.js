import { Checkbox, Tooltip } from '@material-ui/core'

import { useTodo } from 'src/context/todo'
import TodoItemMenu from './TodoItemMenu'
import DurationChip from './components/DurationChip'

// Redux
import { updateTodo } from 'src/redux/actions/todos'
import { connect } from 'react-redux'

const TodoItemActions = (props) => {
    const { todo } = useTodo()

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

    return (
        <>
            <DurationChip duration={todo.duration} editable={!todo.completed} onSelect={selectDuration} />
            <Tooltip title="Marcar como completada">
                <Checkbox
                    edge="start"
                    checked={todo.completed}
                    tabIndex={-1}
                    disableRipple
                    onClick={handleToggle}
                />
            </Tooltip>
            <TodoItemMenu />
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateTodo: (item) => dispatch(updateTodo(item))
    }
}

export default connect(null, mapDispatchToProps)(TodoItemActions)