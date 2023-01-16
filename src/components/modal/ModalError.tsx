import {Box, Modal} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {removeObjectError} from "../../store/slices/errorSlice";

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

export const ModalError = () => {
    const {titleError, messageError, open} = useAppSelector(state => state.objectError);
    const dispatch = useAppDispatch();
    const handleClose = () => {
        dispatch(removeObjectError());
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {titleError}
                </Typography>
                <Typography id="modal-modal-description" sx={{mt: 2}}>
                    {messageError}
                </Typography>
            </Box>
        </Modal>
    );
}