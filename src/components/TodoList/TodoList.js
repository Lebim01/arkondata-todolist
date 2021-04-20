import { List } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux'
import { reorderTodo } from 'src/redux/actions/todos'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
}));

const TodoList = ({ reorder, ...props }) => {
    const classes = useStyles();

    function onDragStart() {
        // Add a little vibration if the browser supports it.
        // Add's a nice little physical feedback
        if (window.navigator.vibrate) {
          window.navigator.vibrate(100);
        }
    }
    
    function onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
    
        if (result.destination.index === result.source.index) {
            return;
        }
    
        reorder(
            result.source.index,
            result.destination.index
        );
    }

    return (
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <Droppable droppableId="list" type={''}>
                {(dropProvided, dropSnapshot) => 
                    <List 
                        className={classes.root} 
                        isDraggingOver={dropSnapshot.isDraggingOver}
                        isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
                        {...dropProvided.droppableProps}
                    >
                        {props.children(dropProvided, dropSnapshot)}
                    </List>
                }
            </Droppable>
        </DragDropContext>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        reorder: (from, to) => dispatch(reorderTodo(from, to))
    }
}

export default connect(null, mapDispatchToProps)(TodoList)