import { useEffect, useState } from 'react'

const useTimer = ({ progress, duration, ...props }) => {
    const [time, setTime] = useState(duration - progress)
    const [running, setRunning] = useState(false)
    const [_interval, _setInterval] = useState(null)

    useEffect(() => {
        setTime(duration - progress)
    }, [duration, progress])

    useEffect(() => {
        if(!running && _interval){
            clearInterval(_interval)
            _setInterval(null)
        }
        if(running && !_interval){
            _setInterval(setInterval(() => {
                setTime(_time => _time-1)
            }, 1000))
        }

        return () => {
            if(_interval) clearInterval(_interval)
        }
    }, [running])

    useEffect(() => {
        if(running){
            props.onTimeUpdate && props.onTimeUpdate(duration - time)
        }
    }, [time])

    return {
        time,
        start : () => setRunning(true),
        pause : () => setRunning(false),
        reset : () => setTime(duration),

    }
}

export default useTimer