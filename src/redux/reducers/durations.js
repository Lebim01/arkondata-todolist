const INITIAL_STATE = {
    durations: [
        {
            title: 'Corto',
            description: '-30m',
            color: 'success'
        },
        {
            title: 'Medio',
            description: '30m - 1h',
            color: 'info'
        },
        {
            title: 'Largo',
            description: '1h+',
            color: 'warning'
        }
    ]
}

function durations(state = INITIAL_STATE, action) {
    return state
}

export default durations