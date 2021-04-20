import { useEffect } from 'react'
import { secondsToTimeStr } from 'src/helpers/time'
import { Checkbox, Tooltip, Chip } from '@material-ui/core'
import AlarmIcon from '@material-ui/icons/Alarm'
import { useTimer } from 'use-timer';
import { useTodo } from 'src/context/todo'
import TodoItemMenu from './TodoItemMenu'
import DurationChip from './components/DurationChip'

const TodoItemActions = (props) => {
    const { todo, updateTodo } = useTodo()

    const { time, start, pause, reset } = useTimer({
        initialTime: !_.isEmpty(todo.duration) ? (todo.duration.secDuration - todo.progress) : 0,
        timerType: 'DECREMENTAL',
        onTimeUpdate: (_time) => {
            if(todo.active){
                updateTodo({
                    progress: todo.duration.secDuration - _time
                })
            }
        }
    });

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

    useEffect(() => {
        if(todo.active){
            console.log(todo)
            reset()
            start()
        }
    }, [todo.active, todo.start_at])

    return (
        <>
            {!_.isEmpty(todo.duration) && 
                <Chip
                    size="small"
                    avatar={<AlarmIcon />}
                    label={secondsToTimeStr(time)}
                />
            }
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