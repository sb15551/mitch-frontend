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
import {handleFullName} from "../../common/Helpers";

interface CardInfoProps {
    data: Array<DataStat>;
    title: string;
    onClickCard: () => void;
}

export const CardInfo: FC<CardInfoProps> = ({data, title, onClickCard}) => {
    return (
        <Card onClick={onClickCard} sx={{width: "280px", display: "inline-block",
            boxShadow: 10}}>
            <CardContent style={{cursor: "pointer"}}>
                <Typography textAlign="center" variant="h6" component="div">
                    {title}
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{width: "100%"}} aria-label="simple table">
                        <TableBody>
                            {data.map(row =>
                                <TableRow
                                    key={row.id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {handleFullName(row.name, row.surname)}
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