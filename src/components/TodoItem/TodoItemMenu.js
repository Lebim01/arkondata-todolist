import { useState } from 'react'
import { IconButton, Menu, MenuItem, Divider, Typography } from '@material-ui/core'
import MoreVerticalIcon from '@material-ui/icons/MoreVert'

const TodoItemMenu = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);

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
                <MenuItem onClick={handleClose}>Modificar Duración</MenuItem>
                <MenuItem onClick={handleClose}>Eliminar tarea</MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>Iniciar temporizador</MenuItem>
                <MenuItem onClick={handleClose}>Reiniciar temporizador</MenuItem>
                <MenuItem onClick={handleClose}>Pausar temporizador</MenuItem>
                <MenuItem onClick={handleClose}>Detener temporizador</MenuItem>
            </Menu>
        </>
    )
}

export default TodoItemMenu