import {useAuth} from "../hooks/use-auth";
import TopMenu from "../components/navbar/TopMenu";
import React, {useEffect, useState} from "react";
import {handleLogError} from "../common/Helpers"
import {Box, Container, Typography} from "@mui/material";
import {CommonStatDto} from "../dto/stat/CommonStatDto";
import {OrderApi} from "../common/OrderApi";
import {setObjectError} from "../store/slices/errorSlice";
import {useAppDispatch} from "../hooks/redux-hooks";
import {ModalStat} from "../components/modal/ModalStat";
import {CardInfoShort} from "../components/card/CardInfoShort";

const Main = () => {
    const {token} = useAuth();
    const dispatch = useAppDispatch();
    const [statData, setStatData] = useState(new CommonStatDto(0,  []));

    useEffect(() => {
        OrderApi.getCommonStat(token)
            .then(response => {
                setStatData(response.data);
            })
            .catch(error => {
                dispatch(setObjectError(handleLogError(error)));
            });
    }, [])

    return (
        <>
            <TopMenu/>
            <Container maxWidth="lg">
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': {m: 1},
                        textAlign: "center"
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Typography textAlign="center" variant="h4">
                        Сыграно игр: {statData.countGamesPlayed}
                    </Typography>
                    {statData.metricsValues
                        .sort(metricValue => metricValue.metricOrder)
                        .map(metricValue =>
                        <CardInfoShort key={metricValue.metricCode} data={metricValue.values} title={metricValue.metricName} code={metricValue.metricCode}/>
                    )}
                </Box>
            </Container>
            <ModalStat/>
        </>
    );
}

export default Main;