import React, {useEffect, useState} from "react";
import {UserTournamentModal} from "../components/modal/tounament/UserTournamentModal";
import {defaultTournament} from "../dto/TournamentObjects";
import {OrderApi} from "../common/OrderApi";
import {setObjectError} from "../store/slices/errorSlice";
import {handleLogError} from "../common/Helpers";
import {useAuth} from "../hooks/use-auth";
import {useAppDispatch} from "../hooks/redux-hooks";
import {useParams} from "react-router-dom";
import {Container} from "@mui/material";
import {LinkEnum} from "../common/LinkEnum";

export type TournamentParam = {
    tournamentId: string;
}

const Tournaments = () => {
    const { tournamentId } = useParams<keyof TournamentParam>() as TournamentParam;
    const {token} = useAuth();
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const [tournament, setTournament] = useState(defaultTournament);

    useEffect(() => {
        OrderApi.getTournament(token, Number(tournamentId))
            .then(response => {
                setTournament(response.data);
                setOpen(true);
            })
            .catch(error => {
                dispatch(setObjectError(handleLogError(error)));
            });
    }, [])

    const handleClose = (isReset: boolean) => {
        setOpen(false);
        setTournament(defaultTournament);
    };

    return (
        <Container maxWidth="lg"
                   sx={{
                       paddingTop: "20px"
                   }}>
            {tournament.id !== 0 && (
                <UserTournamentModal
                    tournament={tournament}
                    handleClose={handleClose}
                    open={open}
                    hrefTo={LinkEnum.TOURNAMENTS}/>)}
        </Container>
    );
}

export default Tournaments;