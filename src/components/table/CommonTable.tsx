import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
import {ChangeEvent, FC, useEffect, useState} from "react";
import {RowsPerPageEnum} from "../../common/RowsPerPageEnum";
import {handleLogError} from "../../common/Helpers";
import {useAuth} from "../../hooks/use-auth";
import {AxiosResponse} from "axios";

interface CommonTableProps {
    headers: Array<any>;
    orderApiFunction: (token: string, page: number, rowsPerPage: number) => Promise<AxiosResponse>;
}

export const CommonTable: FC<CommonTableProps> = ({headers, orderApiFunction}) => {
    const {token} = useAuth();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(RowsPerPageEnum.TEN);

    const [rows, setRows] = useState(Array<any>);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        orderApiFunction(token as string, page, rowsPerPage)
            .then(response => {
                if (response.status === 200) {
                    setRows(response.data.rows);
                    setTotal(response.data.total);
                }
            })
            .catch(error => {
                handleLogError(error);
            })
    }, [page, rowsPerPage]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{width: '100%', overflow: 'hidden'}}>
            <TableContainer sx={{maxHeight: 620}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {headers.map(item =>
                                <TableCell
                                    key={item.id}
                                    align={item.align}
                                    style={{minWidth: item.minWidth}}
                                >{item.title}</TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .map(row => {
                                return (
                                    <TableRow style={{cursor: "pointer"}} hover role="checkbox" tabIndex={-1}
                                              onClick={() => alert(row.id)}
                                              key={row.id}>
                                        {headers.map(item =>
                                            <TableCell key={item.id}>{row[item.id]}</TableCell>
                                        )}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[RowsPerPageEnum.TEN, RowsPerPageEnum.TWENTY_FIVE, RowsPerPageEnum.HUNDRED]}
                component="div"
                count={total}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}