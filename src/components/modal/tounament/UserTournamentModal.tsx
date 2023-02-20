import React, {FC, forwardRef, useEffect, useState} from 'react';
import {
    AppBar,
    Box,
    Checkbox,
    Container,
    Dialog,
    Divider,
    FormControlLabel,
    IconButton,
    Slide,
    styled,
    Toolbar,
    Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {TransitionProps} from '@mui/material/transitions';
import TextField from "@mui/material/TextField";
import {OrderApi} from "../../../common/OrderApi";
import {useAuth} from "../../../hooks/use-auth";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux-hooks";
import {setObjectError} from "../../../store/slices/errorSlice";
import {handleLogError, longRuFormatter} from "../../../common/Helpers";
import {FullScreenModalProps} from "../../../common/TypeObject";
import {TournamentDto} from "../../../dto/TournamentObjects";
import {UserParticipantRegistrationTable} from "../../tournament/participant/UserParticipantRegistrationTable";
import {setNotification} from "../../../store/slices/notificationSlice";
import {StatusCodeEnum} from "../../../common/StatusCodeEnum";
import {UserParticipantInProgressTable} from "../../tournament/participant/UserParticipantInProgressTable";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface EditTournamentModalProps extends FullScreenModalProps {
    tournament: TournamentDto;
}

const DisableTextField = styled(TextField)({
    '& .MuiInputBase-input.Mui-disabled': {
        WebkitTextFillColor: "#000000",
    },
});

export const UserTournamentModal: FC<EditTournamentModalProps> = ({tournament, handleClose, open}) => {
    const {id, token} = useAuth();
    const dispatch = useAppDispatch();
    const {statuses} = useAppSelector(state => state.adminConfig);
    const [isRegistered, setIsRegistered] = useState(tournament.participants.map(p => p.player.id).includes(id));
    const [bank, setBank] = useState(0);
    const eventDate = tournament.eventDate === "" ? new Date() : tournament.eventDate;

    const registerFor = (isRegistered: boolean, text: string) => {
        var data = {
            tournamentId: tournament.id,
            playerId: id,
            isRegistered: isRegistered
        }

        OrderApi.registerForTournament(token, data)
            .then(() => {
                setIsRegistered(!isRegistered);
                dispatch(setNotification({severity: "success", text: text, open: true}))
                handleClose(false);
            })
            .catch(error => {
                dispatch(setObjectError(handleLogError(error)));
            });
    }

    const calculateBank = () => {
        var resultSum: number = 0;

        tournament.participants
            .filter(player => player.status)
            .map(player => {
                resultSum = resultSum + tournament.buyin;
                resultSum = resultSum + (tournament.rebuy * player.countRebuy);
                resultSum = resultSum + (player.isAddon ? tournament.addon : 0);
            })
        setBank(resultSum);
    };

    useEffect(() => {
        calculateBank();
    }, [tournament]);

    return (
        <div>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{position: 'relative', background: "black"}}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => handleClose(false)}
                            aria-label="close"
                        >
                            <CloseIcon/>
                        </IconButton>
                        <Typography sx={{ml: 2, flex: 1}} align={"center"} variant="h6" component="pre">
                            {tournament.title + "\n" + longRuFormatter.format(new Date(eventDate))}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="lg">
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': {m: 2},
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <DisableTextField
                            disabled={true}
                            id="title" name={"title"} label="Название"
                            value={tournament.title}
                            sx={{
                                '& > :not(style)': {width: "35ch"},
                            }}
                        />
                        <DisableTextField
                            disabled={true}
                            id="eventDate"
                            label="Дата проведения"
                            type="datetime-local"
                            defaultValue={tournament.eventDate}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{
                                '& > :not(style)': {width: "25ch"},
                            }}
                        />
                        <DisableTextField
                            disabled={true}
                            id="location" name={"location"} label="Место проведения"
                            value={tournament.location.name + ", " + tournament.location.address}
                            sx={{
                                '& > :not(style)': {width: "35ch"},
                            }}
                        />
                    </Box>
                    <Divider/>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': {m: 2, width: '10ch'},
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <DisableTextField
                            disabled={true}
                            type="number"
                            id="buyin"
                            label="Buy-in"
                            value={tournament.buyin}
                            inputProps={{min: 0, style: {textAlign: 'center'}}}
                        />
                        <DisableTextField
                            disabled={true}
                            type="number"
                            id="rebuy"
                            label="Re-buy"
                            value={tournament.rebuy}
                            inputProps={{min: 0, style: {textAlign: 'center'}}}
                        />
                        <DisableTextField
                            disabled={true}
                            type="number"
                            id="addon"
                            label="Addon"
                            value={tournament.addon}
                            inputProps={{min: 0, style: {textAlign: 'center'}}}
                        />
                        <DisableTextField
                            disabled={true}
                            type="number"
                            id="topPlaces"
                            label="Top places"
                            value={tournament.topPlaces}
                            inputProps={{min: 0, style: {textAlign: 'center'}}}
                        />
                        <Typography sx={{display: 'inline-block', verticalAlign: 'middle', lineHeight: 2.6}}
                                    variant="h6"
                                    component="pre">
                            {"Bank: " + bank + " ₽"}
                        </Typography>
                    </Box>
                    <Divider/>
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                    >
                        <DisableTextField
                            disabled={true}
                            id="statusCode" name={"statusCode"} label="Статус"
                            value={statuses
                                .filter(status => status.code === tournament.statusCode)
                                .map(status => status.name)}
                            sx={{
                                '& > :not(style)': {m: 2, width: "35ch"},
                            }}
                        />
                        <FormControlLabel
                            disabled={true}
                            sx={{margin: "10px 0 0 0"}}
                            control={
                                <Checkbox
                                    sx={{'& .MuiSvgIcon-root': {fontSize: 28}}}
                                    checked={tournament.isChristmas}
                                />
                            }
                            label="Рождественский"
                            labelPlacement="top"
                        />
                    </Box>
                    {(
                        tournament.statusCode === StatusCodeEnum.REGISTRATION ?
                            <UserParticipantRegistrationTable
                                tournament={tournament}
                                registerFor={registerFor}
                                isRegistered={isRegistered}
                            />
                            :
                            <UserParticipantInProgressTable
                                tournament={tournament}
                            />
                    )}
                </Container>
            </Dialog>
        </div>
    );
}