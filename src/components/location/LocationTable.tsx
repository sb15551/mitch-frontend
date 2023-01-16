import {OrderApi} from "../../common/OrderApi";
import {CommonTable} from "../table/CommonTable";
import React, {useState} from "react";
import {locationHeadersTable} from "./LocationHeadersTable";
import {useAuth} from "../../hooks/use-auth";
import {LocationDto} from "../../common/TypeObject";
import {EditLocationModal} from "../modal/EditLocationModal";
import {Button} from "@mui/material";
import {useAppDispatch} from "../../hooks/redux-hooks";
import {setObjectError} from "../../store/slices/errorSlice";
import {handleLogError} from "../../common/Helpers";

export const LocationTable = () => {
    const {token} = useAuth();
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const [location, setLocation] = useState({} as LocationDto);
    const [resetTable, setResetTable] = useState(0);
    const handleClickOpen = (locationId: number) => {
        OrderApi.getLocation(token as string, locationId)
            .then(response => {
                setLocation(response.data);
                setOpen(true);
            })
            .catch(error => {
                dispatch(setObjectError(handleLogError(error)));
            });
    };

    const handleClose = (isReset: boolean) => {
        setOpen(false);
        setLocation({} as LocationDto);
        if (isReset) {
            setTimeout(() => setResetTable(Math.random()), 250);
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
        </>
    )
}