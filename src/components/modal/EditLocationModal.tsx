import React, {FC, forwardRef} from 'react';
import {AppBar, Box, Button, Dialog, IconButton, List, ListItem, Slide, Toolbar, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {TransitionProps} from '@mui/material/transitions';
import TextField from "@mui/material/TextField";
import {LocationDto} from "../../common/TypeObject";
import {useFormik} from "formik";
import {OrderApi} from "../../common/OrderApi";
import {useAuth} from "../../hooks/use-auth";
import {useAppDispatch} from "../../hooks/redux-hooks";
import {setObjectError} from "../../store/slices/errorSlice";
import {handleLogError} from "../../common/Helpers";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface FullScreenModalProps {
    location: LocationDto;
    handleClose: (isReset: boolean) => void;
    open: boolean;
}

export const EditLocationModal: FC<FullScreenModalProps> = ({location, handleClose, open}) => {
    const {token} = useAuth();
    const dispatch = useAppDispatch();

    const myForm = useFormik({
        initialValues: {
            id: location.id,
            name: location.name,
            address: location.address
        },
        onSubmit: (values) => {
            OrderApi.saveLocation(token as string, values)
                .catch(error => {
                    dispatch(setObjectError(handleLogError(error)));
                });
            handleClose(true);
        }
    });

    return (
        <div>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{position: 'relative', background: "black"}}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => handleClose(false)}
                            aria-label="close"
                        >
                            <CloseIcon/>
                        </IconButton>
                        <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                            {location.name === undefined && location.address === undefined ?
                                "Новая локация" :
                                location.name + " " + location.address}
                        </Typography>
                        <Button disabled={myForm.values.name === undefined || myForm.values.address === undefined}
                                autoFocus color="inherit" onClick={myForm.submitForm}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <List>
                    <ListItem>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': {m: 1, width: '35ch'},
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="name" name={"name"} label="Name"
                                       value={myForm.values.name}
                                       onChange={myForm.handleChange}/>
                            <TextField id="address" name={"address"} label="Address"
                                       value={myForm.values.address}
                                       onChange={myForm.handleChange}/>
                        </Box>
                    </ListItem>
                </List>
            </Dialog>
        </div>
    );
}