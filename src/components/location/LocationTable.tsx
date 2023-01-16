import {OrderApi} from "../../common/OrderApi";
import {CommonTable} from "../table/CommonTable";
import React, {useState} from "react";
import {locationHeadersTable} from "./LocationHeadersTable";
import {handleLogError} from "../../common/Helpers";
import {useAuth} from "../../hooks/use-auth";
import {LocationDto} from "../../common/TypeObject";
import {ModalError} from "../modal/ModalError";
import {EditLocationModal} from "../modal/EditLocationModal";
import {Button} from "@mui/material";

export const LocationTable = () => {
    const {token} = useAuth();
    const [open, setOpen] = useState(false);
    const [location, setLocation] = useState({} as LocationDto);
    const [openError, setOpenError] = useState(false);
    const [objectError, setObjectError] = useState(Object);
    const [resetTable, setResetTable] = useState(0);
    const handleClickOpen = (locationId: number) => {
        OrderApi.getLocation(token as string, locationId)
            .then(response => {
                setLocation(response.data);
                setOpen(true);
            })
            .catch(error => {
                setObjectError(handleLogError(error));
                setOpenError(true);
            });
    };

    const handleClose = (isReset: boolean) => {
        setOpen(false);
        setLocation({} as LocationDto);
        if (isReset) {
            setTimeout(() => setResetTable(Math.random()), 500);
        }
    };

    return (
        <>
            <CommonTable
                key={resetTable}
                headers={locationHeadersTable}
                orderApiFunction={OrderApi.getLocations}
                handleOpenModal={handleClickOpen}/>

            {open && (
                <EditLocationModal
                    location={location}
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
                создать локацию
            </Button>

            <div onClick={() => setOpenError(false)}>
                <ModalError openModal={openError} objectError={objectError}/>
            </div>
        </>
    )
}