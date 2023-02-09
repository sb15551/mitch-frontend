import {Alert, Snackbar, SnackbarOrigin} from "@mui/material";
import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {removeNotification} from "../../store/slices/notificationSlice";

export const Notification = () => {
    const {severity, text, open} = useAppSelector(state => state.notification);
    const dispatch = useAppDispatch();

    const [notification, setNotification] = useState<SnackbarOrigin>({
        vertical: 'top',
        horizontal: 'right',
    });

    const {vertical, horizontal} = notification;

    const closeNotification = () => {
        setNotification({...notification});
        dispatch(removeNotification());
    };

    return (
        <Snackbar
            anchorOrigin={{vertical, horizontal}}
            open={open}
            onClose={closeNotification}
            autoHideDuration={4000}
        >
            <Alert icon={false} onClose={closeNotification} severity={severity} sx={{width: '100%'}}>
                {text}
            </Alert>
        </Snackbar>
    )
}