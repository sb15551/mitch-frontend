import React, {FC, forwardRef} from 'react';
import {AppBar, Box, Button, Container, Dialog, IconButton, Slide, Toolbar, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {TransitionProps} from '@mui/material/transitions';
import TextField from "@mui/material/TextField";
import {LocationDto} from "../../dto/LocationObjects";
import {useFormik} from "formik";
import {OrderApi} from "../../common/OrderApi";
import {useAuth} from "../../hooks/use-auth";
import {useAppDispatch} from "../../hooks/redux-hooks";
import {setObjectError} from "../../store/slices/errorSlice";
import {handleLogError} from "../../common/Helpers";
import {FullScreenModalProps} from "../../common/TypeObject";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface EditLocationModalProps extends FullScreenModalProps {
    location: LocationDto;
}

export const EditLocationModal: FC<EditLocationModalProps> = ({location, handleClose, open}) => {
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
                <Container maxWidth="lg">
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': {m: 3, width: '35ch'},
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
                </Container>
            </Dialog>
        </div>
    );
}