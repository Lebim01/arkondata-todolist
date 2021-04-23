import { useState } from 'react'
import { makeStyles, Chip, Menu, MenuItem, Tooltip } from '@material-ui/core'

import { connect } from 'react-redux'
import DurationCustomInput from './DurationCustomInput';

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
        backgroundColor: '#ab37f2',
        '&:focus': {
            backgroundColor: '#ab37f2',
        },
        '&:hover': {
            backgroundColor: '#ab37f2'
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
        props.onSelect && props.onSelect(item)

        if(!item || item.id !== -1)
            handleClose()
    }

    const selectCustom = (hours = 0, minutes = 0) => {
        select({
            id: -1,
            title: 'Custom',
            secDuration: hours * 60 * 60 + minutes * 60,
            hours,
            minutes
        })
    }

    return (
        <>
            {props.button
                ? props.button(handleClick)
                : (
                    <div className={classes.root}>
                        {duration.id !== undefined
                            ? (
                                <Tooltip title={`Duración (${duration.description})`}>
                                    <Chip label={duration.title} className={classes[duration.color]} onClick={handleClick} />
                                </Tooltip>
                            )
                            : (
                                <Tooltip title={`Seleccione la duración`}>
                                    <Chip label={'Duración'} onClick={handleClick} />
                                </Tooltip>
                            )
                        }
                    </div>
                )
            }
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {props.all &&
                    <MenuItem onClick={() => select(null)}>
                        Todos
                    </MenuItem>
                }
                {durations.map((r, i) => 
                    <MenuItem key={i.toString()} onClick={() => select(r)}>
                        {r.description}
                        <div className={classes.spacing}>
                            <Chip label={r.title} className={classes[r.color]} />
                        </div>
                    </MenuItem>
                )}
                {props.custom &&
                    <div>
                        <MenuItem onClick={() => duration.id === -1 ? selectCustom(duration.hours, duration.minutes) : selectCustom()}>
                            Custom
                        </MenuItem>
                        { duration.id === -1 && <DurationCustomInput hours={duration.hours} minutes={duration.minutes} onChange={selectCustom} /> }
                    </div>
                }
            </Menu>
        </>
    )
}

const mapStateToProps = (state) => ({
    durations: state.durations.durations
})

export default connect(mapStateToProps)(DurationChip)