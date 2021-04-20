import { useTodo } from 'src/context/todo'
import { useDraggable } from 'src/context/draggable'

function getStyle(provided, style) {
    if (!style) {
      return provided.draggableProps.style;
    }
  
    return {
      ...provided.draggableProps.style,
      ...style,
    };
}

const TodoItemDraggableContainer = (props) => {
    const { todo } = useTodo()
    const { provided, isDragging, isGroupedOver } = useDraggable()

    return (
        <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={getStyle(provided, {})}
            data-is-dragging={isDragging}
            data-testid={todo.uuid}
            data-index={props.idx}
            aria-label={todo.title}
        >
            {props.children}
        </div>
    )
}

export default TodoItemDraggableContainer