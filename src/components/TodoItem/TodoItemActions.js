import { Checkbox, Tooltip } from '@material-ui/core'

import { useTodo } from 'src/context/todo'
import TodoItemMenu from './TodoItemMenu'
import DurationChip from './components/DurationChip'

const TodoItemActions = (props) => {
    const { todo, updateTodo } = useTodo()

    const handleToggle = () => {
        updateTodo({
            completed: !todo.completed,
            completed_at: !todo.completed ? new Date() : null
        })
    };

    const selectDuration = (duration) => {
        updateTodo({
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

export default TodoItemActions