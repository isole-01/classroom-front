import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/core/SvgIcon/SvgIcon";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import React from "react";
import {makeStyles} from "@material-ui/core";
import modalStyle from "../assets/jss/material-kit-react/modalStyle";
import Slide from "@material-ui/core/Slide";
import Button from "components/CustomButtons/Button.js";

const useStylesModal = makeStyles(modalStyle);
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});


export default function SuccessDialog({modalOpen,setModalOpen,message,...props}) {
    const modalClasses = useStylesModal();
    return(
        <div>
            <Dialog
                classes={{
                    root: modalClasses.center,
                    paper: modalClasses.modal
                }}
                open={modalOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setModalOpen(false)}
                aria-labelledby="modal-slide-title"
                aria-describedby="modal-slide-description"
            >
                <DialogTitle
                    id="classic-modal-slide-title"
                    disableTypography
                    className={modalClasses.modalHeader}
                >
                    <IconButton
                        className={modalClasses.modalCloseButton}
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={() => setModalOpen(false)}
                    >
                        <Close className={modalClasses.modalClose}/>
                    </IconButton>
                    <h4 className={modalClasses.modalTitle} style={{color: "green"}}>Done!</h4>
                </DialogTitle>
                <DialogContent
                    id="modal-slide-description"
                    className={modalClasses.modalBody}
                >
                    <h5>{message}</h5>
                </DialogContent>
                <DialogActions
                    className={modalClasses.modalFooter + " " + modalClasses.modalFooterCenter}
                >
                    <Button onClick={() => setModalOpen(false)}>Ok</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
