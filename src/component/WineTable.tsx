import styled from '@emotion/styled';
import React, {useEffect, useState} from 'react';
import {useCookies} from "react-cookie";
import {getAllWines, Wine} from "../api/wine";
import {AxiosError} from "axios";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";

interface WineColumn {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
    format?: (value: string[]) => string;
}

const ErrorText = styled.p`
  display: flex;
  color: red;
`;

const Container = styled.div`
  margin: 10px 28px;
  border: #E6EBF0 20px solid;
`

const WineTable = () => {
    const [cookies] = useCookies(['rackd-cookie-id']);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [wines, setWines] = useState<Wine[]>([]);
    const [error, setError] = useState<boolean>(false)

    const columns: readonly WineColumn[] = [
        {id: 'name', label: 'Name', minWidth: 200, align: 'center'},
        {id: 'description', label: 'Describe Wine', minWidth: 300, align: 'center'},
        {id: 'alohaCode', label: 'Aloha Code', minWidth: 100, align: 'center'},
        {id: 'color', label: 'Wine Color', minWidth: 100, align: 'center'},
        {id: 'producer', label: 'Producer of Wine', minWidth: 200, align: 'center'},
        {id: 'vintage', label: 'Year produced', minWidth: 100, align: 'center'},
        {
            id: 'grapes',
            label: 'Grapes used in wine',
            minWidth: 300,
            align: 'center',
            format: (value: string[]) => value.join('\n')
        },
        {
            id: 'aromas',
            label: 'Aromas from wines',
            minWidth: 300,
            align: 'center',
            format: (value: string[]) => value.join('\n')
        },
        {id: 'effervescence', label: 'Effervescence', minWidth: 200, align: 'center'},
        {id: 'country', label: 'Country Origin of Wine', minWidth: 200, align: 'center'},
        {id: 'region', label: 'Region Origin of Wine', minWidth: 200, align: 'center'},
        {id: 'subRegion', label: 'Sub-Region Origin of Wine', minWidth: 200, align: 'center'},
        {id: 'farmingPractices', label: 'Farming Practices to Produce Wine', minWidth: 200, align: 'center'},
        {id: 'body', label: 'Body of Wine', minWidth: 200, align: 'center'},
        {id: 'photoLink', label: 'Photo Link', minWidth: 200, align: 'center'},
        {
            id: 'foodPairing',
            label: 'Foods to Pair with Wine',
            minWidth: 300,
            align: 'center',
            format: (value: string[]) => value.join('\n')
        },
    ];


    useEffect(() => {
        const fetchWines = async () => {
            await getAllWines(cookies["rackd-cookie-id"])
                .then((resp: Wine[]) => {
                    setWines(resp);
                    setError(false);
                }).catch((err: AxiosError) => {
                    console.log(err.message);
                    setError(true);
                })
        }

        fetchWines().then(_ => {
        });
    }, []);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Container>
            {error && <ErrorText>Can't load table</ErrorText>}
            {!error &&
            <Paper sx={{width: '100%', overflow: 'hidden'}}>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                wines
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((wine: Wine) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={wine.uuid ?? wine.name}>
                                                {columns.map((column) => {
                                                    const id = column.id as keyof typeof wine;
                                                    const value = wine[id];
                                                    return (
                                                        <TableCell key={id} align={column.align}>
                                                            {column.format && Array.isArray(value)
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        )
                                    })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={wines.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            }
        </Container>
    );
}

export default WineTable;