import {Box, Modal} from "@mui/material";
import Typography from "@mui/material/Typography";
import {FC, useState} from "react";
import {ModalMessageError} from "../../common/TypeObject";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    maxWidth: 400,
    bgcolor: '#f57d7d',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
};

interface ModalErrorProps {
    openModal: boolean;
    objectError: ModalMessageError;
}

export const ModalError: FC<ModalErrorProps> = ({openModal, objectError}) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    return(
        <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {objectError.titleError}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {objectError.messageError}
                </Typography>
            </Box>
        </Modal>
    );
}