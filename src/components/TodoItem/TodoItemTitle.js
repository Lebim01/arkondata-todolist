import { ListItemText, InputBase } from '@material-ui/core'
import { useTodo } from 'src/context/todo'

const TodoItemTitle = () => {
    const { todo, updateTodo } = useTodo()

    if(todo.completed) return <ListItemText style={{ width: '100%' }} primary={todo.title} />

    return (
        <div style={{ paddingTop: 8 }}>
            <InputBase 
                style={{ width: '100%' }} 
                value={todo.title}
                onChange={(e) => updateTodo({ title: e.target.value })}
            />
        </div>
    )
}

export default TodoItemTitle