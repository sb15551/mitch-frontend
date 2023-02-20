import {
    Card,
    CardContent,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography
} from "@mui/material"
import {DataStat} from "../../dto/stat/DataStat";
import {FC} from "react";

interface CardInfoProps {
    data: Array<DataStat>;
    title: string;
}

export const CardInfo: FC<CardInfoProps> = ({data, title}) => {

    return (
        <Card sx={{width: "280px", display: "inline-block",
            boxShadow: 10}}>
            <CardContent>
                <Typography textAlign="center" variant="h6" component="div">
                    {title}
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{width: "100%"}} aria-label="simple table">
                        <TableBody>
                            {data.map(row =>
                                <TableRow
                                    key={row.playerId}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name + " " + row.surname}
                                    </TableCell>
                                    <TableCell align="center">{row.countTop}</TableCell>
                                </TableRow>)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
}