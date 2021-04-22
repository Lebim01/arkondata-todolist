import { v4 } from 'uuid';

export const ACTIONS = {
    ADD_TODO: 'ADD_TODO',
    REORDER_TODO: 'REORDER_TODO',
    UPDATE_TODO: 'UPDATE_TODO',
    FILTER_TODO_LIST: 'FILTER_TODO_LIST'
}

export const addTodo = (item) => {
    return {
        type: ACTIONS.ADD_TODO,
        payload: {
            ...item,
            uuid: v4(),
            progress: 0,
            active: false,
        }
    }
}

export const reorderTodo = (from, to) => {
    return {
        type: ACTIONS.REORDER_TODO,
        payload: {
            from,
            to
        }
    }
}

export const updateTodo = (item) => {
    return {
        type: ACTIONS.UPDATE_TODO,
        payload: item
    }
}

export const filter = (item) => {
    return {
        type: ACTIONS.FILTER_TODO_LIST,
        payload: item
    }
}