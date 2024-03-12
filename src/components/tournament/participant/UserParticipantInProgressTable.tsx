import {Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {participantHeadersTable} from "./ParticipantHeadersTable";
import React, {FC} from "react";
import {TournamentDto, TournamentParticipantDto} from "../../../dto/TournamentObjects";
import {handleFullName} from "../../../common/Helpers";

export interface UserParticipantTableProps {
    tournament: TournamentDto;
}

export const UserParticipantInProgressTable: FC<UserParticipantTableProps> = ({tournament}) => {

    return (
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tournament.participants
                            .sort((participant1: TournamentParticipantDto, participant2: TournamentParticipantDto) =>
                                (participant1.player.id && participant1.place) - (participant2.player.id && participant2.place))
                            .map((player) => (
                                <TableRow key={player.id}>
                                    <TableCell align="center">{player.place}</TableCell>
                                    <TableCell>
                                        {handleFullName(player.player.name, player.player.surname)}
                                    </TableCell>
                                    <TableCell>
                                        {player.byPlayer === null ? "" : player.byPlayer.name + " " + player.byPlayer.surname}
                                    </TableCell>
                                    <TableCell align="center">
                                        {player.countRebuy}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Checkbox
                                            disabled={true}
                                            checked={player.isAddon}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}