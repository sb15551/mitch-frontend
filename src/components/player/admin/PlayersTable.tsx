import {OrderApi} from "../../../common/OrderApi";
import {CommonTable} from "../../table/CommonTable";
import {playerHeadersTable} from "./PlayerHeadersTable";
import React, {useState} from "react";
import {EditPlayerModal} from "../../modal/EditPlayerModal";
import {defaultPlayer} from "../../../dto/PlayerObjects";
import {useAuth} from "../../../hooks/use-auth";
import {Button} from "@mui/material";
import {useAppDispatch} from "../../../hooks/redux-hooks";
import {setObjectError} from "../../../store/slices/errorSlice";
import {handleLogError} from "../../../common/Helpers";

export const PlayersTable = () => {
    const {token} = useAuth();
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const [player, setPlayer] = useState(defaultPlayer);
    const [resetTable, setResetTable] = useState(0);

    const handleClickOpen = (playerId: number) => {
        OrderApi.getPlayer(token as string, playerId)
            .then(response => {
                setPlayer(response.data);
                setOpen(true);
            })
            .catch(error => {
                dispatch(setObjectError(handleLogError(error)));
            });
    };

    const handleClose = (isReset: boolean) => {
        setOpen(false);
        setPlayer(defaultPlayer);
        if (isReset) {
            setTimeout(() => setResetTable(Math.random()), 250);
        }
    };

    return (
        <>
            <CommonTable
                key={resetTable}
                headers={playerHeadersTable}
                orderApiFunction={OrderApi.getPlayers}
                handleOpenModal={handleClickOpen}/>
            {open && (
                <EditPlayerModal
                    player={player}
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
                создать игрока
            </Button>
        </>
    );
}