import React, {FC, forwardRef} from 'react';
import {
    AppBar,
    Box,
    Button,
    Container,
    Dialog,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Slide,
    Toolbar,
    Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {TransitionProps} from '@mui/material/transitions';
import TextField from "@mui/material/TextField";
import {PlayerDto} from "../../dto/PlayerObjects";
import {RoleCodeEnum} from "../../common/RoleCodeEnum";
import {useFormik} from "formik";
import {OrderApi} from "../../common/OrderApi";
import {useAuth} from "../../hooks/use-auth";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {setObjectError} from "../../store/slices/errorSlice";
import {handleLogError, longRuFormatter} from "../../common/Helpers";
import {FullScreenModalProps} from "../../common/TypeObject";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface EditPlayerModalProps extends FullScreenModalProps {
    player: PlayerDto;
}

export const EditPlayerModal: FC<EditPlayerModalProps> = ({player, handleClose, open}) => {
    const {token} = useAuth();
    const dispatch = useAppDispatch();
    const {roles} = useAppSelector(state => state.adminConfig);

    const playerForm = useFormik({
        initialValues: {
            id: player.id,
            name: player.name,
            surname: player.surname,
            role: player.role.code
        },
        onSubmit: (values) => {
            OrderApi.savePlayer(token as string, values)
                .catch(error => {
                    dispatch(setObjectError(handleLogError(error)));
                });
            handleClose(true);
        }
    });

    var isModifyField: boolean;
    if (player.name === "" || player.surname === "") {
        isModifyField = playerForm.values.name === player.name || playerForm.values.surname === player.surname;
    } else {
        isModifyField = playerForm.values.name === player.name &&
            playerForm.values.surname === player.surname &&
            playerForm.values.role === player.role.code;
    }


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
                            {player.name === "" && player.surname === "" ?
                                "Новый игрок" :
                                player.name + " " + player.surname}
                        </Typography>
                        <Button disabled={isModifyField} autoFocus color="inherit" onClick={playerForm.submitForm}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="lg">
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': {m: 2, width: '35ch'},
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="name" name={"name"} label="Name"
                                   value={playerForm.values.name}
                                   onChange={playerForm.handleChange}
                                   error={playerForm.values.name === ""}
                                   required={true}/>
                        <TextField id="surname" name={"surname"} label="Surname"
                                   value={playerForm.values.surname}
                                   onChange={playerForm.handleChange}
                                   error={playerForm.values.surname === ""}
                                   required={true}/>

                        {player.role.code !== RoleCodeEnum.ROOT && (
                            <FormControl>
                                <InputLabel id="user-role">Role</InputLabel>
                                <Select
                                    labelId="user-role"
                                    id="role"
                                    name="role"
                                    value={playerForm.values.role}
                                    label="Role"
                                    onChange={playerForm.handleChange}
                                >
                                    {roles.map(role =>
                                        <MenuItem key={role.code} value={role.code}>{role.name}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        )}
                    </Box>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': {m: 2, width: '35ch'},
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="login" name={"login"} label="Login" value={player.login} disabled={true}/>
                        <TextField id="telegramChatId"
                                   label="Telegram chat ID" name={"telegramChatId"}
                                   value={player.chatId}
                                   disabled={true}/>
                        <TextField id="createdDate"
                                   label="Created date" name={"createdDate"}
                                   value={player.createdDate === "" ? "" : longRuFormatter.format(new Date(player.createdDate))}
                                   disabled={true}/>
                    </Box>
                </Container>
            </Dialog>
        </div>
    );
}