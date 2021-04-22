import { ListItemText, InputBase } from '@material-ui/core'
import { useTodo } from 'src/context/todo'

const TodoItemTitle = () => {
    const { todo, updateTodo } = useTodo()

    if(todo.completed) return <ListItemText primary={todo.title} />

    return (
        <InputBase 
            style={{ width: '100%' }} 
            value={todo.title}
            onChange={(e) => updateTodo({ title: e.target.value })}
        />
    )
}

export default TodoItemTitle