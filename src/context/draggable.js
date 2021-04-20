import { createContext, useContext } from 'react'

export const DraggableContext = createContext()

const DraggableContextProvider = (props) => {
    const { provided, isDragging, isGroupedOver } = props

    return (
        <DraggableContext.Provider value={{ provided, isDragging, isGroupedOver }}>
            {props.children}
        </DraggableContext.Provider>
    )
}

export function useDraggable() {
    const context = useContext(DraggableContext)
    return context
};

export default DraggableContextProvider
