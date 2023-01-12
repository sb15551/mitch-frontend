import {OrderApi} from "../../../common/OrderApi";
import {CommonTable} from "../../table/CommonTable";
import {playerHeadersTable} from "./PlayerHeadersTable";
import React, {useState} from "react";
import {EditPlayerModal} from "../../modal/EditPlayerModal";
import {handleLogError} from "../../../common/Helpers";
import {defaultPlayer} from "../../../common/TypeObject";
import {useAuth} from "../../../hooks/use-auth";
import {ModalError} from "../../modal/ModalError";
import {Button} from "@mui/material";

export const PlayersTable = () => {
    const {token} = useAuth();
    const [open, setOpen] = useState(false);
    const [player, setPlayer] = useState(defaultPlayer);
    const [openError, setOpenError] = useState(false);
    const [objectError, setObjectError] = useState(Object);
    const [resetTable, setResetTable] = useState(0);

    const handleClickOpen = (playerId: number) => {
        OrderApi.getPlayer(token as string, playerId)
            .then(response => {
                setPlayer(response.data);
                setOpen(true);
            })
            .catch(error => {
                setObjectError(handleLogError(error));
                setOpenError(true);
            });
    };

    const handleClose = () => {
        setOpen(false);
        setPlayer(defaultPlayer);
        setResetTable(Math.random());
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

            <div onClick={() => setOpenError(false)}>
                <ModalError openModal={openError} objectError={objectError}/>
            </div>
        </>
    );
}