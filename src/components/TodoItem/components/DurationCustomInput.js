import { useEffect, useState } from 'react'
import { FormControl, Select, MenuItem, makeStyles, InputLabel, Divider, Grid } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        paddingRight: theme.spacing(1),
        width: '100%'
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const DurationCustomInput = (props) => {
    const classes = useStyles();
    const [{ hours, minutes }, setData] = useState({ hours: props.hours, minutes: props.minutes })
    const minutesArray = new Array(60).fill(0).map((_, i) => i+1)

    useEffect(() => {
        props.onChange && props.onChange(hours, minutes)
    }, [hours, minutes])

    const onChangeHours = (e) => {
        let _hours = Number(e.target.value)
        setData({
            hours: _hours <= 2 ? _hours : 2,
            minutes : _hours === 2 ? 0 : minutes,
        })
    }

    const onChangeMinutes = (e) => {
        setData({
            hours,
            minutes: Number(e.target.value)
        })
    }

    return (
        <div>
            <Divider />
            <Grid container>
                <Grid item xs>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="select-hours">Horas</InputLabel>
                        <Select
                            labelId="select-hours"
                            value={hours}
                            onChange={onChangeHours}
                        >
                            <MenuItem value={0}>0</MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="select-minutes">Minutos</InputLabel>
                        <Select
                            labelId="select-minutes"
                            value={minutes}
                            onChange={onChangeMinutes}
                        >
                            <MenuItem value={0}>{0}</MenuItem>
                            {hours < 2 && minutesArray.map(min => 
                                <MenuItem value={min}>{min}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    )
}

export default DurationCustomInput