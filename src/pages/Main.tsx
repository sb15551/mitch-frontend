import {useAuth} from "../hooks/use-auth";
import TopMenu from "../components/navbar/TopMenu";
import React, {useEffect, useState} from "react";
import {handleLogError, parseJwtPayload} from "../common/Helpers"
import {Box, Container, Typography} from "@mui/material";
import {CardInfo} from "../components/card/CardInfo";
import {CommonStatDto} from "../dto/stat/CommonStatDto";
import {OrderApi} from "../common/OrderApi";
import {setObjectError} from "../store/slices/errorSlice";
import {useAppDispatch} from "../hooks/redux-hooks";
import {TitleStatEnum} from "../dto/stat/TitleStatEnum";

const Main = () => {
    const {token} = useAuth();
    const dispatch = useAppDispatch();
    const [statData, setStatData] = useState(new CommonStatDto(0,  [], [], [], [], [], []));

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
                    <CardInfo data={statData.firstPlaces} title={TitleStatEnum.FIRST_PLACES}/>
                    <CardInfo data={statData.secondPlaces} title={TitleStatEnum.SECOND_PLACES}/>
                    <CardInfo data={statData.thirdPlaces} title={TitleStatEnum.THIRD_PLACES}/>
                    <CardInfo data={statData.christmasTops} title={TitleStatEnum.CHRISTMAS_PLACES}/>
                    <CardInfo data={statData.bablTops} title={TitleStatEnum.BABL_PLACES}/>
                    <CardInfo data={statData.knockoutTops} title={TitleStatEnum.KNOCKOUT_PLACES}/>
                </Box>

            </Container>
        </>
    );
}

export default Main;