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
import { changeDataFeedback } from '~/reducer_action/BaseReducerAction';
import { Box, Button, Chip, Typography } from '@mui/material';
import FormAddFeedback from '~/components/form/FormAddFeedback';
import { toast } from 'react-toastify';

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

export default function Feedback() {
    const dispatch = useDispatch()
    const data_feedback = useSelector(state => state.base.data_feedback)
    React.useEffect(() => {
        fetch(`http://localhost:9999/feedback`).then(response => response.json())
            .then(rs => {
                dispatch(changeDataFeedback([...rs.data]))
            })
    }, [])

    const getlistFeedback = () => {
        fetch(`http://localhost:9999/feedback`).then(response => response.json())
            .then(rs => {
                dispatch(changeDataFeedback([...rs.data]))
            })
            .catch(err => {
                toast.error("Gui phan hoi that bai")
            })
    }

    const handleUpdateTrangThai = (id) => {
        const options = {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
        fetch(`http://localhost:9999/feedback/read/${id}`, options).then(response => response.json())
            .then(rs => {
                toast.success("Doc thanh cong")
                getlistFeedback();
            })
    }
    return (
        <Box sx={{ width: '1200px', margin: '160px auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ padding: '16px 0', fontSize: '16px', fontWeight: 'bold' }}>Quản lý phản hồi</Typography>
                <FormAddFeedback />
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Id</StyledTableCell>
                            <StyledTableCell align="right">Email</StyledTableCell>
                            <StyledTableCell align="right">Nội dung</StyledTableCell>
                            <StyledTableCell align="right">Thời gian tạo</StyledTableCell>
                            <StyledTableCell align="right">Trạng thái</StyledTableCell>
                            <StyledTableCell align="right">Thao tác</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data_feedback?.map((row) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.id}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.email}</StyledTableCell>
                                <StyledTableCell align="right">{row.content}</StyledTableCell>
                                <StyledTableCell align="right">{row.createdAt}</StyledTableCell>
                                <StyledTableCell align="right">
                                    {row.responded === 1 ? <Chip label="Đã xem" color="success" /> : <Chip label="Chưa xem" color="error" />}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <Button variant="contained" color="success" onClick={e => handleUpdateTrangThai(row.id)}>
                                        Xem
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}