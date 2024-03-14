import {OrderApi} from "../../common/OrderApi";
import {CommonTable} from "../table/CommonTable";
import React from "react";
import {tournamentHeadersTable} from "./TournamentHeadersTable";
import {Container} from "@mui/material";
import {LinkEnum} from "../../common/LinkEnum";

export const UserTournamentTable = () => {
    const handleClickOpenPage = (tournamentId: number) => {
        window.location.assign(LinkEnum.TOURNAMENTS + "/" + tournamentId);
    };

    return (
        <Container maxWidth="lg"
                   sx={{
                       paddingTop: "20px"
                   }}>
            <CommonTable
                key={Math.random()}
                headers={tournamentHeadersTable}
                orderApiFunction={OrderApi.getTournaments}
                handleOpenModal={handleClickOpenPage}/>
        </Container>
    )
}