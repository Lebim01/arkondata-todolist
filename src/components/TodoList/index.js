import { useState } from 'react'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles';
import TodoItem from 'src/components/TodoItem'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card, CardContent, Typography } from '@material-ui/core';
import { reorder } from 'src/helpers/array'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
}));

const TodoList = () => {
    const classes = useStyles();
    const [items, setItems] = useState([
        {
            title: 'Item #1',
        },
        {
            title: 'Item #2',
        },
        {
            title: 'Item #3',
        }
    ])

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
    
        const newItems = reorder(
          items,
          result.source.index,
          result.destination.index,
        );
    
        setItems(newItems);
    }

    return (
        <Card elevation={2}>
            <CardContent>
                <Typography variant="h4">
                    Listado de tareas
                </Typography>
                <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                    <Droppable droppableId="list">
                        {(dropProvided, dropSnapshot) => 
                            <List className={classes.root}>
                                {items.map((r, i) =>
                                    <>
                                        <Draggable key={i} draggableId={i.toString()} index={i}>
                                            {(dragProvided, dragSnapshot) => 
                                                <TodoItem 
                                                    idx={i} 
                                                    {...r} 
                                                    provided={dragProvided} 
                                                    isDragging={dragSnapshot.isDragging}
                                                    isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
                                                />  
                                            }
                                        </Draggable>
                                        { i+1 < items.length && <Divider /> }
                                    </>
                                )}
                                
                            </List>
                        }
                    </Droppable>
                </DragDropContext>
            </CardContent>
        </Card>
    )
}

export default TodoList