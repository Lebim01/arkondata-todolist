import { createContext, useContext, useState } from 'react'

export const ConfirmContext = createContext()

const ConfirmContextProvider = (props) => {
    const [isOpen, setOpen] = useState(false)
    const [config, setConfig] = useState({ title: '', description: '' })

    const open = (config) => {
        setOpen(true)
        setConfig(config)
    }

    const close = (result = false) => {
        config.result(result)

        setOpen(false)
        setConfig({ title: '', description: '' })
    }

    return (
        <ConfirmContext.Provider value={{ isOpen, open, close, config }}>
            {props.children}
        </ConfirmContext.Provider>
    )
}

export function useConfirm() {
    const context = useContext(ConfirmContext)
    return context
};

export default ConfirmContextProvider
