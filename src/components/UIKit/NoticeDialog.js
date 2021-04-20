import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core'
import { useDialog } from 'src/context/dialog'

const NoticeDialog = () => {
    const { isOpen, close, config } = useDialog()

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
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default NoticeDialog