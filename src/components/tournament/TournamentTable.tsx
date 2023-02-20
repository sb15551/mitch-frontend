import {OrderApi} from "../../common/OrderApi";
import {CommonTable} from "../table/CommonTable";
import React, {useState} from "react";
import {tournamentHeadersTable} from "./TournamentHeadersTable";
import {useAuth} from "../../hooks/use-auth";
import {Button} from "@mui/material";
import {useAppDispatch} from "../../hooks/redux-hooks";
import {setObjectError} from "../../store/slices/errorSlice";
import {handleLogError} from "../../common/Helpers";
import {defaultTournament} from "../../dto/TournamentObjects";
import {EditInprogressTournamentModal} from "../modal/tounament/EditInprogressTournamentModal";
import {StatusCodeEnum} from "../../common/StatusCodeEnum";
import {EditRegistrationTournamentModal} from "../modal/tounament/EditRegistrationTournamentModal";

export const TournamentTable = () => {
    const {token} = useAuth();
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const [tournament, setTournament] = useState(defaultTournament);
    const [resetTable, setResetTable] = useState(0);
    const handleClickOpen = (tournamentId: number) => {
        OrderApi.getTournament(token as string, tournamentId)
            .then(response => {
                setTournament(response.data);
                setOpen(true);
            })
            .catch(error => {
                dispatch(setObjectError(handleLogError(error)));
            });
    };

    const handleClose = (isReset: boolean) => {
        setOpen(false);
        setTournament(defaultTournament);
        if (isReset) {
            setTimeout(() => setResetTable(Math.random()), 250);
        }
    };

    return (
        <>
            <CommonTable
                key={resetTable}
                headers={tournamentHeadersTable}
                orderApiFunction={OrderApi.getTournaments}
                handleOpenModal={handleClickOpen}/>

            {open && (
                tournament.statusCode === StatusCodeEnum.REGISTRATION
                    ?
                    <EditRegistrationTournamentModal
                        tournament={tournament}
                        handleClose={handleClose}
                        open={open}/>
                    :
                    <EditInprogressTournamentModal
                        tournament={tournament}
                        handleClose={handleClose}
                        open={open}/>
            )}

            <Button variant="contained"
                    color="neutral"
                    fullWidth={true}
                    onClick={() => setOpen(true)}
                    sx={{
                        marginTop: 2
                    }}>
                создать турнир
            </Button>
        </>
    )
}