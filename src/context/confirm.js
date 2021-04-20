import { createContext, useContext, useState } from 'react'

export const ConfirmContext = createContext()

const ConfirmContextProvider = (props) => {
    const [isOpen, setOpen] = useState(false)
    const [config, setConfig] = useState({ title: '', description: '' })

    const open = async (config) => {
        setOpen(true)
        setConfig(config)
    }

    const close = (result = false) => {
        config.result(result)

        setConfig({ title: '', description: '' })
        setOpen(false)
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
