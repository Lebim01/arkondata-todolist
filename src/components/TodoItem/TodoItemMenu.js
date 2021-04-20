import { useState } from 'react'
import { IconButton, Menu, MenuItem, Divider, ListItemText, ListItemIcon, withStyles } from '@material-ui/core'
import MoreVerticalIcon from '@material-ui/icons/MoreVert'
import TrashIcon from '@material-ui/icons/Delete'

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
                <MenuItem onClick={handleClose}>Iniciar temporizador</MenuItem>
                <MenuItem onClick={handleClose}>Reiniciar temporizador</MenuItem>
                <MenuItem onClick={handleClose}>Pausar temporizador</MenuItem>
                <MenuItem onClick={handleClose}>Detener temporizador</MenuItem>
                <Divider />
                <StyledMenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <TrashIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Eliminar tarea</ListItemText>
                </StyledMenuItem>
            </Menu>
        </>
    )
}

export default TodoItemMenu