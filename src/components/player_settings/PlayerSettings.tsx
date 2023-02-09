import {FormikErrors, useFormik} from "formik";
import {useAuth} from "../../hooks/use-auth";
import TextField from "@mui/material/TextField";
import React from "react";
import {Box, Container, Divider, InputAdornment} from "@mui/material";
import PasswordIcon from "@mui/icons-material/Password";
import Button from "@mui/material/Button";
import bcrypt from "bcryptjs";
import {OrderApi} from "../../common/OrderApi";
import {setObjectError} from "../../store/slices/errorSlice";
import {handleLogError} from "../../common/Helpers";
import {useAppDispatch} from "../../hooks/redux-hooks";
import {setUser} from "../../store/slices/userSlice";
import {setNotification} from "../../store/slices/notificationSlice";

interface PlayerSettingsValue {
    name: string;
    surname: string;
    password: string;
    confirmPassword: string;
}

const validate = (values: PlayerSettingsValue) => {
    const errors: FormikErrors<PlayerSettingsValue> = {};
    if (!values.name) {
        errors.name = "Обязательное поле";
    }

    if (!values.surname) {
        errors.surname = "Обязательное поле";
    }

    if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Оба пароля должны быть одинаковыми";
    }

    if (values.password.match(/[а-яА-Я]/)) {
        errors.password = "Пароль не может содержать русские буквы"
    }

    if (!values.password.match(/^\S*$/)) {
        errors.password = "Пароль не может содержать пробел"
    }

    return errors;
};

export const PlayerSettings = () => {
    const dispatch = useAppDispatch();
    const {id, token, name, surname} = useAuth();

    const openNotification = (severity: "success" | "error", text: string) => {
        dispatch(setNotification({severity: severity, text: text, open: true}))
    };

    const settingsForm = useFormik({
        initialValues: {
            name: name,
            surname: surname,
            password: "",
            confirmPassword: ""
        },
        initialErrors: {
            name: name === null ? "Обязательное поле" : "",
            surname: surname === null ? "Обязательное поле" : "",
        },
        onSubmit: (values) => {
            if (isModifyField || !!settingsForm.values.password) {
                var data: any = {
                    id: id,
                    name: settingsForm.values.name !== name ? values.name : null,
                    surname: settingsForm.values.surname !== surname ? values.surname : null,
                    password: settingsForm.values.password !== "" ? bcrypt.hashSync(values.password, 12) : null
                }
                OrderApi.savePlayerSettings(token, data)
                    .then((response) => {
                        if (response.status === 200) {
                            dispatch(setUser({
                                login: response.data.login,
                                name: response.data.name,
                                surname: response.data.surname,
                                id: response.data.id,
                                token: response.data.token,
                            }));
                            openNotification("success", "Успешное сохранение!");
                            settingsForm.values.password = "";
                            settingsForm.values.confirmPassword = "";
                        }
                    })
                    .catch(error => {
                        dispatch(setObjectError(handleLogError(error)));
                    });
            } else {
                openNotification("error", "Ни одно поле не изменено!!!");
            }
        },
        validate
    });

    var isModifyField: boolean = (settingsForm.values.name !== name || settingsForm.values.surname !== surname) &&
        (settingsForm.values.name !== null && settingsForm.values.surname !== null);

    return (
        <Container
            maxWidth="lg">
            <center>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': {m: 2, width: 'auto', minWidth: "30ch"},
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="name" name={"name"} label="Имя"
                               value={settingsForm.values.name}
                               onChange={settingsForm.handleChange}
                               error={!!settingsForm.errors.name}
                               helperText={settingsForm.errors.name}
                               required={true}/>
                    <TextField id="surname" name={"surname"} label="Фамилия"
                               value={settingsForm.values.surname}
                               onChange={settingsForm.handleChange}
                               error={!!settingsForm.errors.surname}
                               helperText={settingsForm.errors.surname}
                               required={true}/>
                </Box>
                <Divider>
                    Изменение пароля
                </Divider>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': {m: 2, width: 'auto', minWidth: "30ch"},
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="password"
                        label="Пароль"
                        onChange={settingsForm.handleChange}
                        value={settingsForm.values.password}
                        fullWidth={true}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PasswordIcon
                                        fontSize="small"
                                    />
                                </InputAdornment>
                            )
                        }}
                        type={"password"}
                        error={!!settingsForm.errors.password}
                        helperText={settingsForm.errors.password}
                    />
                    <TextField
                        id="confirmPassword"
                        label="Подтверди пароль"
                        onChange={settingsForm.handleChange}
                        value={settingsForm.values.confirmPassword}
                        fullWidth={true}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PasswordIcon
                                        fontSize="small"
                                    />
                                </InputAdornment>
                            )
                        }}
                        type={"password"}
                        disabled={!!settingsForm.errors.password}
                        error={!!settingsForm.errors.confirmPassword}
                        helperText={settingsForm.errors.confirmPassword}
                    />
                </Box>
                <Button
                    disabled={!settingsForm.isValid}
                    color="neutral"
                    type="submit"
                    variant="contained"
                    disableElevation={true}
                    sx={{
                        marginTop: 2, alignItems: "center"
                    }}
                    onClick={settingsForm.submitForm}
                >
                    сохранить
                </Button>
            </center>
        </Container>
    )
}