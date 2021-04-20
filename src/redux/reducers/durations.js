const INITIAL_STATE = {
    durations: [
        {
            title: 'Corto',
            description: '-30m',
            color: 'success',
            secDuration: 30 * 60
        },
        {
            title: 'Medio',
            description: '30m - 1h',
            color: 'info',
            secDuration: 60 * 60
        },
        {
            title: 'Largo',
            description: '1h+',
            color: 'warning',
            secDuration: 2 * 60 * 60
        }
    ]
}

function durations(state = INITIAL_STATE, action) {
    return state
}

export default durations