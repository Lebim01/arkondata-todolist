import { createContext, useContext } from 'react'

export const TodoContext = createContext()

const TodoContextProvider = (props) => {
    const { todo } = props

    return (
        <TodoContext.Provider value={{ todo }}>
            {props.children}
        </TodoContext.Provider>
    )
}

export function useTodo() {
    const context = useContext(TodoContext)
    return context
};

export default TodoContextProvider
