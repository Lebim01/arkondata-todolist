const INITIAL_STATE = {
    durations: [
        {
            id: 1,
            title: 'Corto',
            description: '-30m',
            color: 'success',
            secDuration: 30 * 60,
            minDuration: 0,
            maxDuration: 30 * 60
        },
        {
            id: 2,
            title: 'Medio',
            description: '30m - 1h',
            color: 'info',
            secDuration: 60 * 60,
            minDuration: 30 * 60 + 1,
            maxDuration: 60 * 60
        },
        {
            id: 3,
            title: 'Largo',
            description: '1h+',
            color: 'warning',
            secDuration: 2 * 60 * 60,
            minDuration: 60 * 60 + 1,
            maxDuration: 2 * 60 * 60
        }
    ]
}

function durations(state = INITIAL_STATE, action) {
    return state
}

export default durations