import { Card, CardContent, Typography, Divider, Grid, Button } from '@material-ui/core';
import styled from 'styled-components'
import { connect } from 'react-redux'

import { addTodo } from 'src/redux/actions/todos'

import AssessmentIcon from '@material-ui/icons/Assessment';

import TodoItem from 'src/components/TodoItem'
import TodoItemInputNew from 'src/components/TodoItem/TodoItemInputNew'
import TodoListCompleted from 'src/components/TodoListCompleted';
import TodoListItemDraggable from './TodoListItemDraggable';
import TodoListDraggable from './TodoList'
import TodoListFilter from './TodoListFilter'
import { Fragment } from 'react';
import { useRouter } from 'next/router';

/**
 * Este es el area permitida para arrastrar elementos
 */
const DropZone = styled.div``;

const TodoList = ({ todos, addTodo, ...props }) => {
    const router = useRouter()

    const goCharts = ( ) => {
        router.push('/charts')
    }

    return (
        <Card elevation={2}>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs>
                        <Typography variant="h4">
                            Listado de tareas
                            <TodoListFilter />
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button onClick={goCharts}>
                            Ver graficas <AssessmentIcon style={{ marginLeft: 10 }} />
                        </Button>
                    </Grid>
                </Grid>
                <TodoListDraggable>
                    {(dropProvided) => 
                        <>
                            {/**
                             * Display active Todo
                             */}
                            {props.activeTodo &&
                                <>
                                    <TodoItem
                                        key={props.activeTodo.uuid}
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

const mapStateToProps = (state) => {
    let pendingTodo = state.todos.todos.filter(r => r.completed === false && !r.active)
    if(state.todos.activeFilter){
        pendingTodo = pendingTodo.filter(r => r.duration && r.duration.secDuration >= state.todos.activeFilter.minDuration && r.duration.secDuration <= state.todos.activeFilter.maxDuration)
    }

    return {
        activeTodo: state.todos.todos.find(r => r.active === true),
        todos: pendingTodo,
        hasCompleted: state.todos.todos.find(r => r.completed === true)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTodo: (item) => dispatch(addTodo(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)