import { ACTIONS } from '../actions/todos'
import { reorder } from 'src/helpers/array'

const INITIAL_STATE = {
    todos: [],
    activeFilter: null
}

function todos(state = INITIAL_STATE, action) {
    switch(action.type){
        case ACTIONS.ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload]
            }
        case ACTIONS.REORDER_TODO:
            return {
                ...state,
                todos: reorder(
                    state.todos,
                    action.payload.from,
                    action.payload.to,
                )
            }
        case ACTIONS.UPDATE_TODO:
            let _todos = [...state.todos]
            let index = _todos.findIndex(r => r.uuid === action.payload.uuid)
            _todos[index] = action.payload

            return {
                ...state,
                todos: _todos
            }
        case ACTIONS.FILTER_TODO_LIST:
            return {
                ...state,
                activeFilter: action.payload
            }
        case ACTIONS.DELETE_TODO:
            return {
                ...state,
                todos: [...state.todos].filter(r => r.uuid !== action.payload)
            }
    }

    return state
}

export default todos