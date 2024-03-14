import {OrderApi} from "../../common/OrderApi";
import {CommonTable} from "../table/CommonTable";
import React from "react";
import {tournamentHeadersTable} from "./TournamentHeadersTable";
import {Container} from "@mui/material";
import {LinkEnum} from "../../common/LinkEnum";

export const UserTournamentTable = () => {

    return (
        <Container maxWidth="lg"
                   sx={{
                       paddingTop: "20px"
                   }}>
            <CommonTable
                headers={tournamentHeadersTable}
                orderApiFunction={OrderApi.getTournaments}
                handleOpenModal={() => {}}
                hrefTo={LinkEnum.TOURNAMENTS}/>
        </Container>
    )
}