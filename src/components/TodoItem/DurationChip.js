import { useState } from 'react'
import { makeStyles, Chip, Menu, MenuItem } from '@material-ui/core'

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
        backgroundColor: theme.palette.success.main,
        '&:focus': {
            backgroundColor: theme.palette.success.main,
        },
        '&:hover': {
            backgroundColor: theme.palette.success.main,
        }
    },
    info: {
        backgroundColor: theme.palette.info.main,
        '&:focus': {
            backgroundColor: theme.palette.info.main,
        },
        '&:hover': {
            backgroundColor: theme.palette.info.main,
        }
    },
    warning: {
        backgroundColor: theme.palette.warning.main,
        '&:focus': {
            backgroundColor: theme.palette.warning.main,
        },
        '&:hover': {
            backgroundColor: theme.palette.warning.main,
        }
    }
}));

const DurationChip = ({ duration, durations, ...props }) => {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        if(props.editable)
            setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const select = (item) => {
        handleClose()
        props.onSelect && props.onSelect(item)
    }

    return (
        <>
            <div className={classes.root}>
                {duration.title 
                    ? <Chip label={duration.title} className={classes[duration.color]} onClick={handleClick} />
                    : <Chip label={'Duración'} color="danger" onClick={handleClick} />
                }
            </div>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {durations.map((r, i) => 
                    <MenuItem key={i.toString()} onClick={() => select(r)}>
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