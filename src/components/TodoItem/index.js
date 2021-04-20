import TodoItemContent from './TodoItem'
import TodoItemDraggableContainer from './TodoItemDraggableContainer'
import TodoContextProvider from 'src/context/todo'
import DragDropContextProvider from 'src/context/draggable'

const TodoItem = (props) => {
    if(props.draggable){
        return (
            <TodoContextProvider uuid={props.uuid}>
                <TodoItemDraggableContainer {...props}>
                    <TodoItemContent draggable />
                </TodoItemDraggableContainer>
            </TodoContextProvider>
        )
    }
    
    return (
        <DragDropContextProvider>
            <TodoContextProvider uuid={props.uuid}>
                <TodoItemContent {...props} />
            </TodoContextProvider>
        </DragDropContextProvider>
    )
}

export default TodoItem