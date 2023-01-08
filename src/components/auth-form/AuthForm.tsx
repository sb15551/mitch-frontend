import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Controller, SubmitHandler, useForm, useFormState} from "react-hook-form";
import {loginValidation, passwordValidation} from './validation';
import Logo from "../../static/logo.png";
import {createTheme, IconButton, InputAdornment, ThemeProvider} from "@mui/material";
import PasswordIcon from '@mui/icons-material/Password';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {OrderApi} from "../../common/OrderApi";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hooks/redux-hooks";
import {setUser} from "../../store/slices/userSlice";
import {LinkEnum} from "../../common/LinkEnum";
import {LocalStorageKeyEnum} from "../../common/LocalStorageKeyEnum";
import {AuthResponse} from "../../common/TypeObject";
import './auth-form.css';

export interface ISignInForm {
    login: string;
    password: string;
}

declare module '@mui/material/styles' {
    interface Palette {
        neutral: Palette['primary'];
    }

    interface PaletteOptions {
        neutral?: PaletteOptions['primary'];
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        neutral: true;
    }
}

export const AuthForm: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {handleSubmit, control} = useForm<ISignInForm>();
    const {errors} = useFormState({
        control
    })

    const isAuthResponse = (v: any): v is AuthResponse => v.login !== undefined;

    const onSubmit: SubmitHandler<ISignInForm> = async data => {
        const authData = await OrderApi.autenticate(data);
        if (isAuthResponse(authData)) {
            dispatch(setUser({
                login: authData.login,
                id: authData.id,
                token: authData.token,
            }));
            localStorage.setItem(LocalStorageKeyEnum.USER, JSON.stringify(authData));
            navigate(LinkEnum.MAIN);
        }
    };
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const theme = createTheme({
        palette: {
            neutral: {
                main: '#000',
                contrastText: '#fff',
            },
        },
    });

    return (
        <div className="auth-form">
            <div className="auth-logo">
                <img src={Logo} alt='/'/>
                <div className="auth-logo-text">M i t c h</div>
            </div>
            <form className="auth-form__form" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    control={control}
                    name="login"
                    rules={loginValidation}
                    render={({field}) => (
                        <TextField
                            label="Telegram ID"
                            onChange={(e) => field.onChange(e)}
                            value={field.value}
                            fullWidth={true}
                            size="small"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AlternateEmailIcon
                                            fontSize="small"
                                        />
                                    </InputAdornment>
                                ),
                            }}
                            margin="normal"
                            variant="standard"
                            className="auth-form__input"
                            error={!!errors.login?.message}
                            helperText={errors?.login?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="password"
                    rules={passwordValidation}
                    render={({field}) => (
                        <TextField
                            label="Password"
                            onChange={(e) => field.onChange(e)}
                            value={field.value}
                            fullWidth={true}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PasswordIcon
                                            fontSize="small"
                                        />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            type={showPassword ? 'text' : 'password'}
                            size="small"
                            margin="normal"
                            variant="standard"
                            className="auth-form__input"
                            error={!!errors?.password?.message}
                            helperText={errors?.password?.message}
                        />
                    )}
                />
                <ThemeProvider theme={theme}>
                    <Button
                        color="neutral"
                        type="submit"
                        variant="contained"
                        fullWidth={true}
                        disableElevation={true}
                        sx={{
                            marginTop: 2
                        }}
                    >
                        Войти
                    </Button>
                </ThemeProvider>
            </form>

            <div className="auth-form__footer">
                <Typography variant="subtitle1" component="span">
                    Нет аккаунта? {" "}
                </Typography>
                <Typography variant="subtitle1" component="span">
                    <a href="https://t.me/pkrMitchBot" target="_blank" rel="noreferrer">
                        Мич
                    </a> тебе поможет!
                </Typography>
            </div>
        </div>
    )
}
