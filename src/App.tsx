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
import "./App.css";

const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path={LinkEnum.LOGIN} element={<AuthPage/>}/>
                <Route element={<ProtectedRoutes />}>
                    <Route path={LinkEnum.MAIN} element={<Main/>}/>
                    <Route path={LinkEnum.TOURNAMENTS} element={<Tournaments/>}/>
                    <Route path={LinkEnum.STAT} element={<Stat/>}/>
                    <Route path={LinkEnum.SETTINGS} element={<Settings/>}/>
                    <Route element={<AdminRoutes />}>
                        <Route path={LinkEnum.ADMIN} element={<Admin/>}/>
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
