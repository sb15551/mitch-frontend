import React from "react";
import {Route, Routes} from "react-router-dom";
import {LinkEnum} from "./common/LinkEnum";
import Main from "./pages/Main";
import Tournaments from "./pages/Tournaments";
import Stat from "./pages/Stat";
import Settings from "./pages/Settings";
import {AuthPage} from "./pages/auth-page";
import ProtectedRoutes from "./components/routes/ProtectedRoutes";
import Admin from "./pages/Admin";
import AdminRoutes from "./components/routes/AdminRoutes";
import {createTheme, ThemeProvider} from "@mui/material";
import {ModalError} from "./components/modal/ModalError";
import {Notification} from "./components/notification/Notification";
import {useAuth} from "./hooks/use-auth";
import {useAppDispatch, useAppSelector} from "./hooks/redux-hooks";
import {OrderApi} from "./common/OrderApi";
import {setAdminConfig, setLocations} from "./store/slices/adminConfigSlice";
import {setObjectError} from "./store/slices/errorSlice";
import {handleLogError} from "./common/Helpers";
import "./App.css";

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

const theme = createTheme({
    typography: {
        fontFamily: "Tahoma"
    },
    palette: {
        neutral: {
            main: '#000',
            contrastText: '#fff',
        }
    },
    components: {
        MuiAlert: {
            styleOverrides: {
                standardSuccess: {
                    backgroundColor: 'green',
                    color: 'white',
                },
                standardError: {
                    backgroundColor: 'red',
                    color: 'white'
                },
                standardWarning: {
                    backgroundColor: 'orange',
                    color: 'white'
                },
                standardInfo: {
                    backgroundColor: 'grey',
                    color: 'black'
                }
            },
        },
    },
});

const App = () => {
    const {token, isAuth} = useAuth();
    const dispatch = useAppDispatch();
    const {isDownload} = useAppSelector(state => state.adminConfig);

    if (!isDownload && isAuth) {
        OrderApi.getAdminConfig(token as string)
            .then(response => {
                dispatch(setAdminConfig(response.data))
            })
            .catch(error => {
                dispatch(setObjectError(handleLogError(error)));
            });

        // TODO: пока локаций не много, параметры пагинации для селектов захардкодим
        OrderApi.getLocations(token as string, 0, 100)
            .then(response => {
                dispatch(setLocations(response.data))
            })
            .catch(error => {
                dispatch(setObjectError(handleLogError(error)));
            });
    }
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route path={LinkEnum.LOGIN} element={<AuthPage/>}/>
                    <Route element={<ProtectedRoutes/>}>
                        <Route path={LinkEnum.MAIN} element={<Main/>}/>
                        <Route path={LinkEnum.TOURNAMENTS} element={<Tournaments/>}/>
                        <Route path={LinkEnum.STAT} element={<Stat/>}/>
                        <Route path={LinkEnum.SETTINGS} element={<Settings/>}/>
                        <Route element={<AdminRoutes/>}>
                            <Route path={LinkEnum.ADMIN} element={<Admin/>}/>
                        </Route>
                    </Route>
                </Routes>
                <Notification/>
            </ThemeProvider>
            <ModalError/>
        </div>
    );
}

export default App;
