import { Card, CardContent, Typography, Divider } from '@material-ui/core';
import styled from 'styled-components'
import { connect } from 'react-redux'

import { addTodo } from 'src/redux/actions/todos'

import TodoItem from 'src/components/TodoItem'
import TodoItemInputNew from 'src/components/TodoItem/TodoItemInputNew'
import TodoListCompleted from 'src/components/TodoListCompleted';
import TodoListItemDraggable from './TodoListItemDraggable';
import TodoListDraggable from './TodoList'
import TodoListFilter from './TodoListFilter'
import { Fragment } from 'react';

/**
 * Este es el area permitida para arrastrar elementos
 */
const DropZone = styled.div``;

const TodoList = ({ todos, addTodo, ...props }) => {
    return (
        <Card elevation={2}>
            <CardContent>
                <Typography variant="h4">
                    Listado de tareas
                    <TodoListFilter />
                </Typography>
                <TodoListDraggable>
                    {(dropProvided) => 
                        <>
                            {/**
                             * Display active Todo
                             */}
                            {props.activeTodo &&
                                <>
                                    <TodoItem
                                        uuid={props.activeTodo.uuid}
                                        active
                                    />
                                    <Divider />
                                </>
                            }

                            {/**
                             * TodoList draggable area
                             */}
                            <DropZone ref={dropProvided.innerRef}>
                                {todos.map((todo, i) =>
                                    <Fragment key={todo.uuid}>
                                        <TodoListItemDraggable todo={todo} idx={i}>
                                            <TodoItem 
                                                idx={i}
                                                uuid={todo.uuid}
                                                draggable
                                            />
                                        </TodoListItemDraggable>
                                        <Divider />
                                    </Fragment>
                                )}
                                {dropProvided.placeholder}
                            </DropZone>
                            
                            {/**
                             * Input new Todo
                             */}
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
    activeTodo: state.todos.todos.find(r => r.active === true),
    todos: state.todos.todos.filter(r => r.completed === false && !r.active && (state.todos.activeFilter ? r.duration && r.duration.id === state.todos.activeFilter : true)),
    hasCompleted: state.todos.todos.find(r => r.completed === true)
})

const mapDispatchToProps = (dispatch) => {
    return {
        addTodo: (item) => dispatch(addTodo(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)