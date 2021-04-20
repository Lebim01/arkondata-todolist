import { combineReducers } from 'redux'
import todos from './todos'
import durations from './durations'

let todoApp = combineReducers({
    todos,
    durations
})

export default todoApp