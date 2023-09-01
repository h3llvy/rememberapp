import {Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Dialog} from "@mui/material";
import React from "react";

const DialogUi = ({isOpenedDialog, handleClose, handleAgree, title, body}) => {
    return (<>
        <Dialog
            open={isOpenedDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {body}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleAgree} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    </>);
};

export default DialogUi;
