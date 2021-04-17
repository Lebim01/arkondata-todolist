import TodoItem from './TodoItem'

const TodoItemContainer = (props) => {
    return (
        <TodoItem {...props} />
    )
}

TodoItemContainer.defaultProps = {
    title: '',
    idx: 1
}

export default TodoItemContainer