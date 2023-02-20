import TopMenu from "../components/navbar/TopMenu";
import React from "react";
import {UserTournamentTable} from "../components/tournament/UserTournamentTable";

const Tournaments = () => {
    return (
        <>
            <TopMenu/>
            <UserTournamentTable/>
        </>
    );
}

export default Tournaments;