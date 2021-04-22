import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core'
import { useConfirm } from 'src/context/confirm'

const ConfirmDialog = () => {
    const { isOpen, close, config } = useConfirm()

    return (
        <Dialog
            open={isOpen}
            onClose={close}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{config.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {config.description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={close} color="secondary">
                    Cancelar
                </Button>
                <Button onClick={() => close(true)} color="primary" autoFocus>
                    Aceptar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog