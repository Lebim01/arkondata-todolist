import { uuid } from 'uuidv4';

export const ACTIONS = {
    ADD_TODO: 'ADD_TODO',
    REORDER_TODO: 'REORDER_TODO',
    UPDATE_TODO: 'UPDATE_TODO'
}

export const addTodo = (item) => {
    return {
        type: ACTIONS.ADD_TODO,
        payload: {
            ...item,
            uuid: uuid(),
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