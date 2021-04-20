import { useState } from 'react'
import { IconButton, Menu, MenuItem, Divider, ListItemText, ListItemIcon, withStyles, Typography } from '@material-ui/core'
import MoreVerticalIcon from '@material-ui/icons/MoreVert'
import TrashIcon from '@material-ui/icons/Delete'
import PlayIcon from '@material-ui/icons/PlayArrow'
import RestartIcon from '@material-ui/icons/Autorenew'
import PauseIcon from '@material-ui/icons/Pause'
import StopIcon from '@material-ui/icons/Stop'
import EditIcon from '@material-ui/icons/Edit'

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

const TodoItemMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { todo }  = useTodo()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                    <>
                        <Typography style={{ paddingLeft: 16 }} variant="subtitle2">Temporizador</Typography>
                        <StyledMenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <PlayIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Iniciar</ListItemText>
                        </StyledMenuItem>
                        <StyledMenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <RestartIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Reiniciar</ListItemText>
                        </StyledMenuItem>
                        <StyledMenuItem onClick={handleClose}>
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
                        <Divider />
                    </>
                }
                <Typography style={{ paddingLeft: 16, paddingTop: 8 }} variant="subtitle2">Tarea</Typography>
                <StyledMenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Editar</ListItemText>
                </StyledMenuItem>
                <StyledMenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <TrashIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Eliminar</ListItemText>
                </StyledMenuItem>
            </Menu>
        </>
    )
}

export default TodoItemMenu