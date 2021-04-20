import { createContext, useContext, useState } from 'react'

export const DialogContext = createContext()

const DialogContextProvider = (props) => {
    const [isOpen, setOpen] = useState(false)
    const [config, setConfig] = useState({ title: '', description: '' })

    const open = (config) => {
        setOpen(true)
        setConfig(config)
    }

    const close = () => {
        setOpen(false)
        setConfig({ title: '', description: '' })
    }

    return (
        <DialogContext.Provider value={{ isOpen, open, close, config }}>
            {props.children}
        </DialogContext.Provider>
    )
}

export function useDialog() {
    const context = useContext(DialogContext)
    return context
};

export default DialogContextProvider
