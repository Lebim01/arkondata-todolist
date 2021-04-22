import { useState } from 'react'
import _ from 'lodash'
import { IconButton, Menu, MenuItem, Divider, ListItemText, ListItemIcon, withStyles, Typography } from '@material-ui/core'
import MoreVerticalIcon from '@material-ui/icons/MoreVert'
import TrashIcon from '@material-ui/icons/Delete'
import PlayIcon from '@material-ui/icons/PlayArrow'
import RestartIcon from '@material-ui/icons/Autorenew'
import PauseIcon from '@material-ui/icons/Pause'
import StopIcon from '@material-ui/icons/Stop'

import { connect } from 'react-redux'
import { updateTodo, deleteTodo } from 'src/redux/actions/todos'

import { useConfirm } from 'src/context/confirm'
import { useDialog } from 'src/context/dialog'
import { useTodo } from 'src/context/todo'

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

const TodoItemMenu = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { todo, updateTodo }  = useTodo()
    const { open: openConfirm } = useConfirm()
    const { open: openDialog } = useDialog()

    const isActive = props.active && todo.uuid === props.active.uuid

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const start = () => {
        if(_.isEmpty(todo.duration)){
            openDialog({
                title: 'Aviso',
                description: 'Debe seleccionar una duración para esta tarea antes de poder iniciarla'
            })
        }
        else if(props.active && !isActive){
            openConfirm({
                title: 'Confirmar',
                description: 'Actualmente existe una tarea en curso ¿desea detenerla e iniciar esta?',
                result: (result) => {
                    if(result === true){
                        props.updateActiveTodo({
                            ...props.active,
                            active: false
                        })
                        updateTodo({
                            active: true
                        })
                        handleClose()
                    }
                }
            })
        }else{
            /**
             * Iniciar tarea
             */
            updateTodo({
                active: true
            })
            handleClose()
        }
    }

    const restart = () => {
        updateTodo({
            progress: 0,
            forceUpdate: Math.random()
        })
        handleClose()
    }

    const pause = () => {
        updateTodo({
            active: false
        })
        handleClose()
    }

    const deleteTodo = () => {
        openConfirm({
            title: 'Confirmar',
            description: 'Esta tarea se eliminara permanentemente',
            result: (result) => {
                if(result === true){
                    props.deleteTodo(todo.uuid)
                }
            }
        })
    }

    return (
        <>
            <IconButton edge="end" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <MoreVerticalIcon />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                { !todo.completed &&
                    <div>
                        <Typography style={{ paddingLeft: 16 }} variant="subtitle2">Temporizador</Typography>
                        { !isActive &&
                            <StyledMenuItem onClick={start}>
                                <ListItemIcon>
                                    <PlayIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Iniciar</ListItemText>
                            </StyledMenuItem>
                        }
                        { isActive &&
                            <>
                                <StyledMenuItem onClick={restart}>
                                    <ListItemIcon>
                                        <RestartIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Reiniciar</ListItemText>
                                </StyledMenuItem>
                                <StyledMenuItem onClick={pause}>
                                    <ListItemIcon>
                                        <PauseIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Pausar</ListItemText>
                                </StyledMenuItem>
                                <StyledMenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <StopIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Detener</ListItemText>
                                </StyledMenuItem>
                            </>
                        }
                        <Divider />
                    </div>
                }
                <Typography style={{ paddingLeft: 16, paddingTop: 8 }} variant="subtitle2">Tarea</Typography>
                <StyledMenuItem onClick={deleteTodo}>
                    <ListItemIcon>
                        <TrashIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Eliminar</ListItemText>
                </StyledMenuItem>
            </Menu>
        </>
    )
}

const mapStateToProps = (state) => ({
    active: state.todos.todos.find(r => r.active === true)
})

const mapDispatchToProps = (dispatch) => ({
    updateActiveTodo: (item) => dispatch(updateTodo(item)),
    deleteTodo: (uuid) => dispatch(deleteTodo(uuid))
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoItemMenu)