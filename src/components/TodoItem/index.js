import TodoItem from './TodoItem'
import TodoContextProvider from 'src/context/todo'
import { connect } from 'react-redux'

const TodoItemContainer = (props) => {
    if(!props.todo) return null

    return (
        <TodoContextProvider todo={props.todo}>
            <TodoItem {...props} />
        </TodoContextProvider>
    )
}

TodoItemContainer.defaultProps = {
    title: '',
    idx: 1
}

const mapStateToProps = (state, props) => {
    return {
        todo: state.todos.todos.find(r => r.uuid === props.uuid)
    }
}

export default connect(mapStateToProps)(TodoItemContainer)