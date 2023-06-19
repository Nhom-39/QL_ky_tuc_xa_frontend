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
import { changeDataDetailPayment, changeDataFeedback, changeDataNoti } from '~/reducer_action/BaseReducerAction';
import { Box, Button, Typography } from '@mui/material';
import FormAddFeedback from '~/components/form/FormAddFeedback';
import { toast } from 'react-toastify';
import FormAddNoti from '~/components/form/FormAddNoti';
import FormEditNoti from '~/components/form/FormEditNoti';
import images from '~/assets/images';
import { useParams } from 'react-router-dom';


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

export default function DetaiPayment() {
    const dispatch = useDispatch()
    const data_detail_payment = useSelector(state => state.base.data_detail_payment)

    const params = useParams();
    console.log(data_detail_payment);

    React.useEffect(() => {
        fetch(`http://localhost:9999/payment?username=${params.username}`).then(response => response.json())
            .then(rs => {
                console.log(rs);
                dispatch(changeDataDetailPayment([...rs.data]))
            })
    }, [])
    return (
        <Box sx={{ width: '1200px', margin: '160px auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ padding: '16px 0', fontSize: '16px', fontWeight: 'bold' }}>Detail payment</Typography>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Id</StyledTableCell>
                            <StyledTableCell align="right">User name</StyledTableCell>
                            <StyledTableCell align="right">Created At</StyledTableCell>
                            <StyledTableCell align="right">Money</StyledTableCell>
                            <StyledTableCell align="right">Type</StyledTableCell>
                            <StyledTableCell align="right">Is</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data_detail_payment?.map((row) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.id}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.username}</StyledTableCell>
                                <StyledTableCell align="right">
                                    {row.createdAt}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.money.toLocaleString()} đ</StyledTableCell>
                                <StyledTableCell align="right">{row.type}</StyledTableCell>
                                <StyledTableCell align="right">{row.is}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}