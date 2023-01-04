import React from "react";
import {Route, Routes} from "react-router-dom";
import {LinkEnum} from "./common/LinkEnum";
import Navbar from "./components/navbar/Navbar";
import Main from "./pages/Main";
import Tournaments from "./pages/Tournaments";
import Stat from "./pages/Stat";
import Settings from "./pages/Settings";
import {AuthPage} from "./pages/auth-page";
import "./App.css";

const App = () => {
    return (
        <div className="App">
            <Navbar/>
            <Routes>
                <Route path={LinkEnum.MAIN} element={<Main/>}/>
                <Route path={LinkEnum.TOURNAMENTS} element={<Tournaments/>}/>
                <Route path={LinkEnum.STAT} element={<Stat/>}/>
                <Route path={LinkEnum.SETTINGS} element={<Settings/>}/>
                <Route path={LinkEnum.LOGIN} element={<AuthPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
