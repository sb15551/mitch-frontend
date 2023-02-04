import TopMenu from "../components/navbar/TopMenu";
import React from "react";
import {PlayerSettings} from "../components/player_settings/PlayerSettings";

const Settings = () => {
    return (
        <>
            <TopMenu/>
            <PlayerSettings/>
        </>
    );
}

export default Settings;