import React, {FC, forwardRef, useEffect, useState} from 'react';
import {
    AppBar,
    Box,
    Button,
    Checkbox,
    Container,
    Dialog,
    Divider,
    FormControl,
    FormControlLabel,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Slide,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Toolbar,
    Tooltip,
    Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {TransitionProps} from '@mui/material/transitions';
import TextField from "@mui/material/TextField";
import {LocationDto} from "../../../dto/LocationObjects";
import {useFormik} from "formik";
import {OrderApi} from "../../../common/OrderApi";
import {useAuth} from "../../../hooks/use-auth";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux-hooks";
import {setObjectError} from "../../../store/slices/errorSlice";
import {getTodayDate, handleLogError, longRuFormatter} from "../../../common/Helpers";
import {FullScreenModalProps} from "../../../common/TypeObject";
import {TournamentDto, TournamentParticipantDto} from "../../../dto/TournamentObjects";
import RefreshIcon from '@mui/icons-material/Refresh';
import {defaultPlayer} from "../../../dto/PlayerObjects";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import {participantHeadersTable} from "../../tournament/participant/ParticipantHeadersTable";
import {StatusCodeEnum} from "../../../common/StatusCodeEnum";

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

export const EditInprogressTournamentModal: FC<EditTournamentModalProps> = ({tournament, handleClose, open}) => {
    const {token} = useAuth();
    const dispatch = useAppDispatch();
    const {statuses, locations} = useAppSelector(state => state.adminConfig);
    const [isFinished, setIsFinished] = useState(false);

    const getParticipants = (participants: Array<TournamentParticipantDto>) => {
        participants
            .sort((participant1: TournamentParticipantDto, participant2: TournamentParticipantDto) =>
                (participant1.player.id && participant1.place) - (participant2.player.id && participant2.place))
            .map(item => {
                if (item.player === null || item.player === undefined) {
                    item.player = defaultPlayer;
                }
                if (item.byPlayer === null || item.byPlayer === undefined) {
                    item.byPlayer = defaultPlayer;
                }
                if (item.countRebuy === null || item.countRebuy === undefined) {
                    item.countRebuy = 0;
                }
                if (item.place === null || item.place === undefined) {
                    item.place = 0;
                }
                if (item.isAddon === null || item.isAddon === undefined) {
                    item.isAddon = false;
                }
            })
        return participants;
    };

    const tournamentForm = useFormik({
        initialValues: {
            id: tournament.id,
            title: tournament.title,
            location: tournament.location.id === 0 ? locations[0] : tournament.location,
            eventDate: tournament.eventDate === "" ? getTodayDate() : tournament.eventDate,
            statusCode: tournament.statusCode === "" ? statuses[0].code : tournament.statusCode,
            isChristmas: tournament.isChristmas,
            buyin: tournament.buyin,
            rebuy: tournament.rebuy,
            addon: tournament.addon,
            topPlaces: tournament.topPlaces,
            participants: getParticipants(tournament.participants)
        },
        onSubmit: (values) => {
            OrderApi.saveTournament(token as string, values)
                .catch(error => {
                    dispatch(setObjectError(handleLogError(error)));
                });
            handleClose(true);
        }
    });

    const handleLocation = (location: LocationDto) => {
        tournamentForm.setFieldValue("location", location);
    };

    const handleIsChristmas = (value: boolean) => {
        tournamentForm.setFieldValue("isChristmas", value);
    };

    const [bank, setBank] = useState(0);

    const calculateBank = () => {
        var countPlayer: number = tournamentForm.values.participants.length;
        var resultSum: number = tournamentForm.values.buyin * countPlayer;
        tournamentForm.values.participants.map(player => {
            resultSum = resultSum + (tournamentForm.values.rebuy * player.countRebuy);
            resultSum = resultSum + (player.isAddon ? tournamentForm.values.addon : 0);
        })
        setBank(resultSum);
    }

    const generateTitle = () => {
        OrderApi.generateTitle(token as string)
            .then(response => {
                tournamentForm.setFieldValue("title", response.data);
            })
            .catch(error => {
                dispatch(setObjectError(handleLogError(error)));
            });
    }

    const incNum = (index: number) => {
        ++tournamentForm.values.participants[index].countRebuy;
        calculateBank();
    }

    const handleByPlayer = (playerId: number, byPlayerId: number) => {
        var playerIndex: number = -1;
        var byPlayerIndex: number = -1;
        var countWithoutPlace: number = 0;

        tournamentForm.values.participants
            .map((plr, index) => {
                if (plr.player.id === playerId) {
                    playerIndex = index;
                }
                if (plr.player.id === byPlayerId) {
                    byPlayerIndex = index;
                }
            });

        if (byPlayerId === 0) {
            tournamentForm.values.participants[playerIndex].byPlayer = defaultPlayer;
            tournamentForm.values.participants[playerIndex].place = 0;
        } else {
            tournamentForm.values.participants[playerIndex].byPlayer = tournamentForm.values.participants[byPlayerIndex].player;

            tournamentForm.values.participants
                .map((plr) => {
                    if (plr.place === 0) {
                        countWithoutPlace++;
                    }
                });

            if (countWithoutPlace === 2) {
                tournamentForm.values.participants[playerIndex].place = countWithoutPlace;
                tournamentForm.values.participants[byPlayerIndex].place = 1;
            } else {
                tournamentForm.values.participants[playerIndex].place = countWithoutPlace;
            }
        }
    }


    const decNum = (index: number) => {
        if (tournamentForm.values.participants[index].countRebuy > 0) {
            --tournamentForm.values.participants[index].countRebuy;
            calculateBank();
        } else {
            tournamentForm.values.participants[index].countRebuy = 0;
            alert("Кол-во ребаев не может быть меньше 0");
        }
    }

    const handleChangeAddon = (index: number, value: boolean) => {
        tournamentForm.values.participants[index].isAddon = value;
        calculateBank();
    }

    useEffect(() => {
        calculateBank();
        setIsFinished(tournament.statusCode === StatusCodeEnum.FINISHED || tournament.statusCode === StatusCodeEnum.NOT_HAPPENED)
    }, []);

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
                            {tournament.title === "" && tournament.location.name === "" ?
                                "Новый турнир" :
                                tournament.title + "\n" + longRuFormatter.format(new Date(tournament.eventDate))}
                        </Typography>
                        <Button disabled={isFinished} autoFocus color="inherit" onClick={tournamentForm.submitForm}>
                            save
                        </Button>
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
                        <TextField
                            disabled={isFinished}
                            id="title" name={"title"} label="Title"
                            value={tournamentForm.values.title}
                            onChange={tournamentForm.handleChange}
                            sx={{
                                '& > :not(style)': {width: "35ch"},
                            }}
                            InputProps={!isFinished ? {
                                endAdornment: (
                                    <Tooltip title="Сгенерировать" arrow>
                                        <InputAdornment position="end">
                                            <RefreshIcon
                                                fontSize="large"
                                                onClick={generateTitle}
                                                sx={{
                                                    cursor: "pointer",
                                                }}
                                            />
                                        </InputAdornment>
                                    </Tooltip>
                                )
                            } : undefined}
                        />
                        <TextField
                            disabled={isFinished}
                            id="eventDate"
                            label="Event date"
                            type="datetime-local"
                            defaultValue={tournamentForm.values.eventDate}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{
                                '& > :not(style)': {width: "25ch"},
                            }}
                            onChange={tournamentForm.handleChange}
                        />
                        <FormControl
                            disabled={isFinished}
                            id="locationSelect"
                            sx={{
                                '& > :not(style)': {width: "25ch"},
                            }}>
                            <InputLabel id="tournament-location">Location</InputLabel>
                            <Select
                                labelId="tournament-location"
                                id="location"
                                name="location"
                                value={tournamentForm.values.location.id}
                                label="Location"
                            >
                                {locations.map(location =>
                                    <MenuItem key={location.id} value={location.id}
                                              onClick={() => handleLocation(location)}>
                                        {location.name}
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>
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
                        <TextField
                            disabled={isFinished}
                            type="number"
                            id="buyin"
                            label="Buy-in"
                            onChange={tournamentForm.handleChange}
                            value={tournamentForm.values.buyin}
                            inputProps={{min: 0, style: {textAlign: 'center'}}}
                        />
                        <TextField
                            disabled={isFinished}
                            type="number"
                            id="rebuy"
                            label="Re-buy"
                            onChange={tournamentForm.handleChange}
                            value={tournamentForm.values.rebuy}
                            inputProps={{min: 0, style: {textAlign: 'center'}}}
                        />
                        <TextField
                            disabled={isFinished}
                            type="number"
                            id="addon"
                            label="Addon"
                            onChange={tournamentForm.handleChange}
                            value={tournamentForm.values.addon}
                            inputProps={{min: 0, style: {textAlign: 'center'}}}
                        />
                        <TextField
                            disabled={isFinished}
                            type="number"
                            id="topPlaces"
                            label="Top places"
                            onChange={tournamentForm.handleChange}
                            value={tournamentForm.values.topPlaces}
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
                        <FormControl
                            disabled={isFinished}
                            sx={{
                                '& > :not(style)': {m: 2, width: "25ch"},
                            }}>
                            <InputLabel id="tournament-status">Status</InputLabel>
                            <Select
                                labelId="tournament-status"
                                id="statusCode"
                                name="statusCode"
                                value={tournamentForm.values.statusCode}
                                label="Status"
                                onChange={tournamentForm.handleChange}
                            >
                                {statuses
                                    .map(status =>
                                        <MenuItem key={status.code} value={status.code}>{status.name}</MenuItem>
                                    )}
                            </Select>
                        </FormControl>
                        <FormControlLabel
                            disabled={isFinished}
                            sx={{margin: "10px 0 0 0"}}
                            control={
                                <Checkbox
                                    sx={{'& .MuiSvgIcon-root': {fontSize: 28}}}
                                    checked={tournamentForm.values.isChristmas}
                                    onChange={() => {
                                        handleIsChristmas(!tournamentForm.values.isChristmas)
                                    }}
                                />
                            }
                            label="Is Christmas"
                            labelPlacement="top"
                        />
                    </Box>
                    {/*TODO: move it to a component*/}
                    <Paper sx={{width: '100%', overflow: 'hidden'}}>
                        <TableContainer sx={{maxHeight: 620}}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow
                                        sx={{
                                            "& th": {
                                                color: "black",
                                                fontWeight: 700,
                                                backgroundColor: "#bcbcbc"
                                            }
                                        }}>
                                        {participantHeadersTable
                                            .filter(column => column.forStatus.includes(tournament.statusCode))
                                            .map(column =>
                                                <TableCell
                                                    key={column.id}
                                                    style={{width: column.width, minWidth: column.minWidth}}
                                                    align={column.align}
                                                >
                                                    {column.title}
                                                </TableCell>
                                            )}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tournamentForm.values.participants
                                        .map((player, playerIndex) => (
                                            <TableRow key={player.id}>
                                                <TableCell align="center">{player.place}</TableCell>
                                                <TableCell>
                                                    {player.player.name + " " + player.player.surname}
                                                </TableCell>
                                                <TableCell>
                                                    <Select
                                                        disabled={isFinished}
                                                        style={{width: "100%"}}
                                                        id="byPlayer"
                                                        name="byPlayer"
                                                        value={player.byPlayer.id}
                                                        onChange={tournamentForm.handleChange}
                                                    >
                                                        <MenuItem
                                                            key={0}
                                                            value={0}
                                                            onClick={() => handleByPlayer(player.player.id, 0)}
                                                        >
                                                            {"None"}
                                                        </MenuItem>
                                                        {tournamentForm.values.participants.map((byPlayer) =>
                                                            player.player.id !== byPlayer.player.id
                                                                ?
                                                                <MenuItem
                                                                    key={byPlayer.player.id}
                                                                    value={byPlayer.player.id}
                                                                    disabled={byPlayer.byPlayer.id !== 0}
                                                                    onClick={() => handleByPlayer(player.player.id, byPlayer.player.id)}
                                                                >
                                                                    {byPlayer.player.name + " " + byPlayer.player.surname}
                                                                </MenuItem>
                                                                :
                                                                ""
                                                        )}
                                                    </Select>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <IconButton size={"small"}
                                                                disabled={isFinished}
                                                                onClick={() => decNum(playerIndex)}>
                                                        <RemoveIcon fontSize={"small"}/>
                                                    </IconButton>
                                                    {player.countRebuy}
                                                    <IconButton size={"small"}
                                                                disabled={isFinished}
                                                                onClick={() => incNum(playerIndex)}>
                                                        <AddIcon fontSize={"small"}/>
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Checkbox
                                                        disabled={isFinished}
                                                        checked={player.isAddon}
                                                        onChange={() => handleChangeAddon(playerIndex, !player.isAddon)}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Container>
            </Dialog>
        </div>
    );
}