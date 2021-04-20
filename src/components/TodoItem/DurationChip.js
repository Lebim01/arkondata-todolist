import { useState } from 'react'
import { makeStyles, Chip, Tooltip, Menu, MenuItem } from '@material-ui/core'

import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'inline-block',
        padding: theme.spacing(2)
    },
    spacing: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    success: {
        backgroundColor: theme.palette.success.main
    },
    info: {
        backgroundColor: theme.palette.info.main
    },
    warning: {
        backgroundColor: theme.palette.warning.main
    }
}));

const DurationChip = ({ title, color, description, durations }) => {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState(null);

    console.log(classes)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Tooltip title={description}>
                <div className={classes.root}>
                    {title 
                        ? <Chip label={title} color={color} onClick={handleClick} />
                        : <Chip label={'Duración'} color="danger" onClick={handleClick} />
                    }
                </div>
            </Tooltip>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {durations.map((r, i) => 
                    <MenuItem key={i.toString()} onClick={handleClose}>
                        {r.description} 
                        <div className={classes.spacing}>
                            <Chip label={r.title} className={classes[r.color]} />
                        </div>
                    </MenuItem>
                )}
            </Menu>
        </>
    )
}

const mapStateToProps = (state) => ({
    durations: state.durations.durations
})

export default connect(mapStateToProps)(DurationChip)