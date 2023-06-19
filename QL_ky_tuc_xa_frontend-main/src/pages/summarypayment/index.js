import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { changeDataDetailPayment, changeDataFeedback, changeDataPayment } from '~/reducer_action/BaseReducerAction';
import { Box, Button, Typography } from '@mui/material';
import FormAddPayment from '~/components/form/FormAddPayment';
import { useNavigate } from 'react-router-dom';

const username = "Nguyen Van A"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function SummaryPayment() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const data_payment = useSelector(state => state.base.data_payment)
    React.useEffect(() => {
        fetch(`http://localhost:9999/payment/summary`).then(response => response.json())
            .then(rs => {
                console.log(rs);
                dispatch(changeDataPayment([...rs.data]))
            })
    }, [])

    const handleShowDetail = async (username) => {
        // await fetch(`http://localhost:9999/payment?username=${username}`).then(response => response.json())
        //     .then(async rs => {
        //         await dispatch(changeDataDetailPayment([...rs.data]))
        navigate(`../admin/detail-payment/${username}`)
        // })
    }
    return (
        <Box sx={{ width: '1200px', margin: '160px auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ padding: '16px 0', fontSize: '16px', fontWeight: 'bold' }}>Quản lý tài chính</Typography>
                <FormAddPayment />
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>STT</StyledTableCell>
                            <StyledTableCell align="right">User name</StyledTableCell>
                            <StyledTableCell align="right">Money</StyledTableCell>
                            <StyledTableCell align="right">Thao tác</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data_payment?.map((row, idx) => (
                            <StyledTableRow key={idx}>
                                <StyledTableCell component="th" scope="row">
                                    {idx}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.username}</StyledTableCell>
                                <StyledTableCell align="right">{row.money.toLocaleString()} đ</StyledTableCell>
                                <StyledTableCell align="right">
                                    <Button variant="contained" onClick={() => handleShowDetail(row.username)}>Xem chi tiết</Button>
                                </StyledTableCell>

                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}