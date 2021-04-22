import { useEffect } from 'react'
import { secondsToTimeStr } from 'src/helpers/time'
import { Checkbox, Tooltip, Chip } from '@material-ui/core'
import AlarmIcon from '@material-ui/icons/Alarm'
import CheckIcon from '@material-ui/icons/AssignmentTurnedIn';
import useTimer from 'src/hooks/useTimer';
import { useTodo } from 'src/context/todo'
import TodoItemMenu from './TodoItemMenu'
import DurationChip from './components/DurationChip'
import _ from 'lodash';

const TodoItemActions = () => {
    const { todo, updateTodo } = useTodo()

    const { time, start, pause } = useTimer({
        progress: todo.progress,
        duration: !_.isEmpty(todo.duration) ? todo.duration.secDuration : 0,
        onTimeUpdate: (progress) => {
            if(todo.active){
                updateTodo({
                    progress
                })
            }
        },
        onExpire: () => {
            if(todo.active){
                updateTodo({
                    completed: true,
                    active: false
                })
            }
        }
    });

    const resetTimer = () => {
        if(todo.active){
            start()
        }else{
            pause()
        }
    }

    const handleToggle = () => {
        updateTodo({
            active: false,
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
        resetTimer()
    }, [todo.uuid, todo.active, JSON.stringify(todo.duration), todo.forceUpdate])

    return (
        <>
            {!_.isEmpty(todo.duration) && 
                <Chip
                    size="small"
                    avatar={todo.completed ? <CheckIcon />  : <AlarmIcon />}
                    label={secondsToTimeStr(todo.completed ? todo.progress : time)}
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