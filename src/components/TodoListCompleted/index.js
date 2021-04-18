import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux'

import TodoItem from 'src/components/TodoItem'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
}));

const TodoListCompleted = ({ todos, ...props }) => {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            {todos.map((todo, i) =>
                <div key={todo.uuid}>
                    <TodoItem 
                        idx={i}
                        uuid={todo.uuid}
                    />  
                    <Divider />
                </div>
            )}
        </List>
    )
}

const mapStateToProps = (state) => ({
    todos: state.todos.todos.filter(r => r.completed === true)
})

export default connect(mapStateToProps)(TodoListCompleted)