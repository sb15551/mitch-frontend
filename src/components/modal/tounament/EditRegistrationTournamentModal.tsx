import React, {FC, forwardRef, useEffect, useState} from 'react';
import {
    AppBar,
    Autocomplete,
    Box,
    Button,
    Checkbox,
    CircularProgress,
    Container,
    Dialog,
    Divider,
    FormControl,
    FormControlLabel,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Modal,
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
import {useFormik} from "formik";
import {OrderApi} from "../../../common/OrderApi";
import {useAuth} from "../../../hooks/use-auth";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux-hooks";
import {setObjectError} from "../../../store/slices/errorSlice";
import {getTodayDate, handleLogError, longRuFormatter} from "../../../common/Helpers";
import {FullScreenModalProps} from "../../../common/TypeObject";
import {TournamentDto, TournamentParticipantDto} from "../../../dto/TournamentObjects";
import RefreshIcon from '@mui/icons-material/Refresh';
import {defaultPlayer, PlayerDto} from "../../../dto/PlayerObjects";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {participantHeadersTable} from "../../tournament/participant/ParticipantHeadersTable";
import {LocationDto} from "../../../dto/LocationObjects";

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

const style = {
    position: 'absolute' as 'absolute',
    top: '15%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    maxWidth: 400,
    bgcolor: '#fff',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
};

export const EditRegistrationTournamentModal: FC<EditTournamentModalProps> = ({tournament, handleClose, open}) => {
    const {token} = useAuth();
    const dispatch = useAppDispatch();
    const {statuses, locations} = useAppSelector(state => state.adminConfig);

    const [addPlayerModal, setAddPlayerModal] = useState(false);
    const [playersAutocomplete, setPlayersAutocomplete] = useState(false);
    const [options, setOptions] = React.useState<readonly PlayerDto[]>([]);
    const loading = open && options.length === 0;

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
            participants: tournament.participants
        },
        onSubmit: (values) => {
            OrderApi.saveTournament(token as string, values)
                .catch(error => {
                    dispatch(setObjectError(handleLogError(error)));
                });
            handleClose(true);
        },
        enableReinitialize: true
    });

    const handleLocation = (location: LocationDto) => {
        tournamentForm.setFieldValue("location", location);
    };

    const handleIsChristmas = (value: boolean) => {
        tournamentForm.setFieldValue("isChristmas", value);
    };

    const [bank, setBank] = useState(0);

    const calculateBank = () => {
        var resultSum: number = 0;

        tournamentForm.values.participants
            .filter(player => player.status)
            .map(player => {
                resultSum = resultSum + tournamentForm.values.buyin;
                resultSum = resultSum + (tournamentForm.values.rebuy * player.countRebuy);
                resultSum = resultSum + (player.isAddon ? tournamentForm.values.addon : 0);
            })
        setBank(resultSum);
    };

    const generateTitle = () => {
        OrderApi.generateTitle(token as string)
            .then(response => {
                tournamentForm.setFieldValue("title", response.data);
            })
            .catch(error => {
                dispatch(setObjectError(handleLogError(error)));
            });
    };

    const removeParticipant = (index: number) => {
        tournamentForm.setFieldValue(`participants.${index}.status`, false);
    };

    const addParticipant = (player: PlayerDto) => {
        var isDouble: boolean = false;
        var newParticipant: TournamentParticipantDto = {
            id: 0,
            place: 0,
            countRebuy: 0,
            isAddon: false,
            player: player,
            byPlayer: defaultPlayer,
            status: true
        }

        tournamentForm.values.participants.map(participant => {
            if (participant.player.id === player.id) {
                isDouble = true;
            }
        })

        if (isDouble) {
            alert("Нельзя добавить игрока дважды!!!");
        } else {
            tournamentForm.setFieldValue(`participants.${tournamentForm.values.participants.length}`, newParticipant);
        }

        setPlayersAutocomplete(false);
        setAddPlayerModal(false);
    };

    const getAllPlayers = () => {
        OrderApi.getAllPlayers(token as string)
            .then(response => {
                setOptions(response.data)
            })
            .catch(error => {
                dispatch(setObjectError(handleLogError(error)));
            });
        setAddPlayerModal(true);
        setPlayersAutocomplete(true);

    };

    useEffect(() => {
        calculateBank();
    }, [tournamentForm]);

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
                        <Button autoFocus color="inherit" onClick={tournamentForm.submitForm}>
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
                            id="title" name={"title"} label="Title"
                            value={tournamentForm.values.title}
                            onChange={tournamentForm.handleChange}
                            sx={{
                                '& > :not(style)': {width: "35ch"},
                            }}
                            InputProps={{
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
                            }}
                        />
                        <TextField
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
                            type="number"
                            id="buyin"
                            label="Buy-in"
                            onChange={tournamentForm.handleChange}
                            value={tournamentForm.values.buyin}
                            inputProps={{min: 0, style: {textAlign: 'center'}}}
                        />
                        <TextField
                            type="number"
                            id="rebuy"
                            label="Re-buy"
                            onChange={tournamentForm.handleChange}
                            value={tournamentForm.values.rebuy}
                            inputProps={{min: 0, style: {textAlign: 'center'}}}
                        />
                        <TextField
                            type="number"
                            id="addon"
                            label="Addon"
                            onChange={tournamentForm.handleChange}
                            value={tournamentForm.values.addon}
                            inputProps={{min: 0, style: {textAlign: 'center'}}}
                        />
                        <TextField
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
                        <TableContainer>
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
                                        <TableCell
                                            key="add"
                                            style={{width: 200}}
                                            align="center"
                                        >
                                            <Button variant="contained"
                                                    color="neutral"
                                                    fullWidth={true}
                                                    onClick={getAllPlayers}
                                            >
                                                добавить игрока
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tournamentForm.values.participants
                                        .map((player, playerIndex) => (
                                            player.status ?
                                                <TableRow key={player.player.id}>
                                                    <TableCell>
                                                        {player.player.name + " " + player.player.surname}
                                                    </TableCell>
                                                    <TableCell align="center" style={{width: 20}}>
                                                        <DeleteForeverIcon
                                                            key={player.player.id}
                                                            onClick={() => {
                                                                removeParticipant(playerIndex);
                                                            }}
                                                            onMouseLeave={(event) => {
                                                                event.currentTarget.style.color = "black";
                                                            }}
                                                            onMouseEnter={(event) => {
                                                                console.log();
                                                                event.currentTarget.style.color = "red"
                                                            }}
                                                            sx={{
                                                                cursor: "pointer",
                                                                color: "black"
                                                            }}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                :
                                                ""
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Container>
            </Dialog>
            <Modal
                open={addPlayerModal}
                onClose={() => setAddPlayerModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Autocomplete
                        id="player-list"
                        sx={{width: "auto"}}
                        open={playersAutocomplete}
                        onOpen={() => {
                            setPlayersAutocomplete(true);
                        }}
                        onClose={() => {
                            setPlayersAutocomplete(false);
                        }}
                        ListboxProps={{style: {maxHeight: "70vh"}}}
                        isOptionEqualToValue={(option, value) => option.name + " " + option.surname !== value.name + " " + value.surname}
                        getOptionLabel={(option) => option.name + " " + option.surname}
                        onChange={(event, option) => {
                            addParticipant(option as PlayerDto);
                        }}
                        options={options}
                        loading={loading}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Игроки"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <React.Fragment>
                                            {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                            {params.InputProps.endAdornment}
                                        </React.Fragment>
                                    ),
                                }}
                            />
                        )}
                    />
                </Box>
            </Modal>
        </div>
    );
}