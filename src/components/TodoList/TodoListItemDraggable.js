import { Draggable } from 'react-beautiful-dnd';
import DraggableContextProvider from 'src/context/draggable'

const TodoListItemDraggable = ({ todo, idx, ...props }) => {
    
    return (
        <div>
            <Draggable draggableId={todo.uuid} index={idx}>
                {(dragProvided, dragSnapshot) => 
                    <DraggableContextProvider 
                        provided={dragProvided} 
                        isDragging={dragSnapshot.isDragging} 
                        isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
                    >
                        {props.children}
                    </DraggableContextProvider>
                }
            </Draggable>
        </div>
    )
}

export default TodoListItemDraggable