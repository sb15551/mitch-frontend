import React, {FC, forwardRef} from 'react';
import {
    AppBar,
    Box,
    Button,
    Dialog,
    Divider,
    FormControl,
    IconButton,
    InputLabel,
    List,
    ListItem,
    MenuItem,
    Select,
    Slide,
    Toolbar,
    Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {TransitionProps} from '@mui/material/transitions';
import TextField from "@mui/material/TextField";
import {PlayerDto} from "../../common/TypeObject";
import {RoleCodeEnum} from "../../common/RoleCodeEnum";
import {RoleNameEnum} from "../../common/RoleNameEnum";
import {useFormik} from "formik";
import {OrderApi} from "../../common/OrderApi";
import {useAuth} from "../../hooks/use-auth";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface FullScreenModalProps {
    player: PlayerDto;
    handleClose: () => void;
    open: boolean;
}

export const EditPlayerModal: FC<FullScreenModalProps> = ({player, handleClose, open}) => {
    const {token} = useAuth();

    const myForm = useFormik({
        initialValues: {
            id: player.id,
            name: player.name,
            surname: player.surname,
            role: player.role.code
        },
        initialErrors: {
            name: "",
            surname: ""
        },
        onSubmit: (values) => {
            OrderApi.savePlayer(token as string, values);
            handleClose();
        }
    });

    const longRuFormatter = new Intl.DateTimeFormat('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: "numeric",
        weekday: "long"
    })

    var isModifyField: boolean;
    if (player.name === "" || player.surname === "") {
        isModifyField = myForm.values.name === player.name || myForm.values.surname === player.surname;
    } else {
        isModifyField = myForm.values.name === player.name && myForm.values.surname === player.surname && myForm.values.role === player.role.code;
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
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon/>
                        </IconButton>
                        <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                            {player.name === "" && player.surname === "" ?
                                "Новый игрок" :
                                player.name + " " + player.surname}
                        </Typography>
                        <Button disabled={isModifyField} autoFocus color="inherit" onClick={myForm.submitForm}>
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
                            <TextField id="login" name={"login"} label="Login" value={player.login} disabled={true}/>
                            <TextField id="name" name={"name"} label="Name"
                                       value={myForm.values.name}
                                       onChange={myForm.handleChange}
                                       error={myForm.values.name === ""}
                                       required={true}/>
                            <TextField id="surname" name={"surname"} label="Surname"
                                       value={myForm.values.surname}
                                       onChange={myForm.handleChange}
                                       error={myForm.values.surname === ""}
                                       required={true}/>
                        </Box>
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': {m: 1, width: '35ch'},
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="telegramChatId"
                                       label="Telegram chat ID" name={"telegramChatId"}
                                       value={player.chatId}
                                       disabled={true}/>
                            <TextField id="createdDate"
                                       label="Created date" name={"createdDate"}
                                       value={player.createdDate === "" ? "" : longRuFormatter.format(new Date(player.createdDate))}
                                       disabled={true}/>

                            {myForm.values.role !== RoleCodeEnum.ROOT && (
                                <FormControl>
                                    <InputLabel id="user-role">Role</InputLabel>
                                    <Select
                                        labelId="user-role"
                                        id="role"
                                        name="role"
                                        value={myForm.values.role}
                                        label="Role"
                                        onChange={myForm.handleChange}
                                    >
                                        <MenuItem value={RoleCodeEnum.ADMIN}>{RoleNameEnum.ADMIN}</MenuItem>
                                        <MenuItem value={RoleCodeEnum.PLAYER}>{RoleNameEnum.PLAYER}</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        </Box>
                    </ListItem>
                </List>
            </Dialog>
        </div>
    );
}