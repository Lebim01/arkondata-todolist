import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className={classes.heading}>Tareas completadas ({ props.total })</Typography>
            </AccordionSummary>
            <AccordionDetails>
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
            </AccordionDetails>
        </Accordion>
    )
}

const mapStateToProps = (state) => ({
    total: state.todos.todos.filter(r => r.completed === true).length,
    todos: state.todos.todos.filter(r => r.completed === true && (state.todos.activeFilter ? r.duration && r.duration.id === state.todos.activeFilter : true)).sort((a, b) => b.completed_at - a.completed_at)
})

export default connect(mapStateToProps)(TodoListCompleted)