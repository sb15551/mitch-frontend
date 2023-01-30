import TopMenu from "../components/navbar/TopMenu";
import React from "react";
import {BasicTabs} from "../components/tabs/BasicTabs";
import {useAppDispatch, useAppSelector} from "../hooks/redux-hooks";
import {useAuth} from "../hooks/use-auth";
import {OrderApi} from "../common/OrderApi";
import {setObjectError} from "../store/slices/errorSlice";
import {handleLogError} from "../common/Helpers";
import {setAdminConfig, setLocations} from "../store/slices/adminConfigSlice";

const Admin = () => {
    const {token} = useAuth();
    const dispatch = useAppDispatch();
    const {isDownload} = useAppSelector(state => state.adminConfig);
    if (!isDownload) {
        OrderApi.getAdminConfig(token as string)
            .then(response => {
                dispatch(setAdminConfig(response.data))
            })
            .catch(error => {
                dispatch(setObjectError(handleLogError(error)));
            });

        // TODO: пока локаций не много, параметры пагинации для селектов захардкодим
        OrderApi.getLocations(token as string, 0, 100)
            .then(response => {
                dispatch(setLocations(response.data))
            })
            .catch(error => {
                dispatch(setObjectError(handleLogError(error)));
            });
    }
    return (
        <>
            <TopMenu/>
            <BasicTabs/>
        </>

    );
}

export default Admin;