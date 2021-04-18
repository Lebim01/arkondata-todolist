import { combineReducers } from 'redux'
import todos from './todos'

let todoApp = combineReducers({
    todos,
})

export default todoApp