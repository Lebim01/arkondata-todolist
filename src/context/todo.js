import { createContext, useContext, useEffect } from 'react'
import { connect } from 'react-redux'
import { updateTodo, updateTodo as _updateTodo } from 'src/redux/actions/todos'

export const TodoContext = createContext()

const TodoContextProvider = ({ updateTodo, todo, ...props }) => {
    const _updateTodo = (item) => {
        updateTodo({
            ...todo,
            ...item
        })
    }

    return (
        <TodoContext.Provider value={{ todo, updateTodo: _updateTodo }}>
            {props.children}
        </TodoContext.Provider>
    )
}

export function useTodo() {
    const context = useContext(TodoContext)
    return context
};

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

export default connect(mapStateToProps, mapDispatchToProps)(TodoContextProvider)
