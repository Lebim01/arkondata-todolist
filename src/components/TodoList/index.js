import { Card, CardContent, Typography, Divider } from '@material-ui/core';
import styled from 'styled-components'
import { connect } from 'react-redux'

import { addTodo } from 'src/redux/actions/todos'

import TodoItem from 'src/components/TodoItem'
import TodoItemInputNew from 'src/components/TodoItem/TodoItemInputNew'
import TodoListCompleted from 'src/components/TodoListCompleted';
import TodoListItemDraggable from './TodoListItemDraggable';
import TodoListDraggable from './TodoList'

/**
 * Esta es el area permitida para arrastrar elementos
 */
const DropZone = styled.div``;

const TodoList = ({ todos, addTodo, ...props }) => {
    return (
        <Card elevation={2}>
            <CardContent>
                <Typography variant="h4">
                    Listado de tareas
                </Typography>
                <TodoListDraggable>
                    {(dropProvided) => 
                        <>
                            <DropZone ref={dropProvided.innerRef}>
                                {todos.map((todo, i) =>
                                    <>
                                        <TodoListItemDraggable todo={todo} idx={i} key={todo.uuid}>
                                            <TodoItem 
                                                idx={i}
                                                uuid={todo.uuid}
                                                draggable
                                            />
                                        </TodoListItemDraggable>
                                        <Divider />
                                    </>
                                )}
                                {dropProvided.placeholder}
                            </DropZone>
                            <TodoItemInputNew onAdd={addTodo} />
                            <Divider />
                        </>
                    }
                </TodoListDraggable>

                { props.hasCompleted && <TodoListCompleted /> }
            </CardContent>
        </Card>
    )
}

const mapStateToProps = (state) => ({
    todos: state.todos.todos.filter(r => r.completed === false),
    hasCompleted: state.todos.todos.find(r => r.completed === true)
})

const mapDispatchToProps = (dispatch) => {
    return {
        addTodo: (item) => dispatch(addTodo(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)