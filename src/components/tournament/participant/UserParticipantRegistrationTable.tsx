import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {participantHeadersTable} from "./ParticipantHeadersTable";
import React, {FC} from "react";
import {UserParticipantTableProps} from "./UserParticipantInProgressTable";
import {handleFullName} from "../../../common/Helpers";

interface UserParticipantRegistrationTableProps extends UserParticipantTableProps {
    registerFor: (isRegistered: boolean, text: string) => void
    isRegistered: boolean
}

export const UserParticipantRegistrationTable: FC<UserParticipantRegistrationTableProps> = ({
                                                                                                tournament,
                                                                                                registerFor,
                                                                                                isRegistered
                                                                                            }) => {
    return (
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
                            <TableCell
                                key="add"
                                style={{width: 200}}
                                align="center"
                            >
                                <Button variant="contained"
                                        color="neutral"
                                        fullWidth={true}
                                        onClick={() => registerFor(isRegistered, isRegistered ? "Ну и уёбывай!" : "Успешная регистрация!")}
                                >
                                    {isRegistered ? "сняться с турнира" : "зарегистрироваться"}
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tournament.participants
                            .map((player, index) => (
                                player.status ?
                                    <TableRow key={player.player.id}>
                                        <TableCell colSpan={2}>
                                            {(index + 1) + ". " + handleFullName(player.player.name, player.player.surname)}
                                        </TableCell>
                                    </TableRow>
                                    :
                                    ""
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}