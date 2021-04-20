import TodoItemContent from './TodoItem'
import TodoItemDraggableContainer from './TodoItemDraggableContainer'
import TodoContextProvider from 'src/context/todo'
import { connect } from 'react-redux'

const TodoItem = (props) => {
    if(!props.todo) return null

    if(props.draggable){
        return (
            <TodoContextProvider todo={props.todo}>
                <TodoItemDraggableContainer {...props}>
                    <TodoItemContent draggable />
                </TodoItemDraggableContainer>
            </TodoContextProvider>
        )
    }
    
    return (
        <TodoContextProvider todo={props.todo}>
            <TodoItemContent {...props} />
        </TodoContextProvider>
    )
}

const mapStateToProps = (state, props) => {
    return {
        todo: state.todos.todos.find(r => r.uuid === props.uuid)
    }
}

export default connect(mapStateToProps)(TodoItem)