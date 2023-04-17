import {Dialog} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import React from "react";
import {CardInfo} from "../card/CardInfo";
import {removeObjectStat} from "../../store/slices/statSlice";

export const ModalStat = () => {
    const {metricName, values, open} = useAppSelector(state => state.objectStat);
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(removeObjectStat());
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            scroll={"body"}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{backgroundColor: "rgba(0, 0, 0, 0.5)"}}
        >
            <CardInfo onClickCard={handleClose} data={values} title={metricName}/>
        </Dialog>
    );
}