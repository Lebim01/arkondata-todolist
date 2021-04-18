import { useState } from 'react'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card, CardContent, Typography } from '@material-ui/core';
import styled from 'styled-components'
import { connect } from 'react-redux'

import { addTodo, reorderTodo } from 'src/redux/actions/todos'

import TodoItem from 'src/components/TodoItem'
import TodoItemInput from 'src/components/TodoItem/TodoItemInput'
import TodoListCompleted from '../TodoListCompleted';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
}));

const DropZone = styled.div``;


const TodoList = ({ todos, addTodo, reorder, ...props }) => {
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
        <Card elevation={2}>
            <CardContent>
                <Typography variant="h4">
                    Listado de tareas
                </Typography>
                <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                    <Droppable droppableId="list" type={''}>
                        {
                            /**
                             * Droppable Wrapper
                             */
                        }
                        {(dropProvided, dropSnapshot) => 
                            <List 
                                className={classes.root} 
                                isDraggingOver={dropSnapshot.isDraggingOver}
                                isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
                                {...dropProvided.droppableProps}
                            >
                                <DropZone ref={dropProvided.innerRef}>
                                    {todos.map((todo, i) =>
                                        <div key={todo.uuid}>
                                            <Draggable draggableId={todo.uuid} index={i}>
                                                {(dragProvided, dragSnapshot) => 
                                                    <TodoItem 
                                                        idx={i}
                                                        uuid={todo.uuid}
                                                        provided={dragProvided} 
                                                        isDragging={dragSnapshot.isDragging}
                                                        isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
                                                        draggable
                                                    />  
                                                }
                                            </Draggable>
                                            <Divider />
                                        </div>
                                    )}
                                    {dropProvided.placeholder}
                                </DropZone>
                                <TodoItemInput onAdd={addTodo} />
                                <Divider />
                            </List>
                        }
                    </Droppable>
                </DragDropContext>


                <Typography variant="h6">
                    Tareas completadas
                </Typography>

                <TodoListCompleted />
            </CardContent>
        </Card>
    )
}

const mapStateToProps = (state) => ({
    todos: state.todos.todos.filter(r => r.completed === false)
})

const mapDispatchToProps = (dispatch) => {
    return {
        addTodo: (item) => dispatch(addTodo(item)),
        reorder: (from, to) => dispatch(reorderTodo(from, to))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)