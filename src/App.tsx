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
        },
    },
});

const App = () => {
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
            </ThemeProvider>
            <ModalError/>
        </div>
    );
}

export default App;
