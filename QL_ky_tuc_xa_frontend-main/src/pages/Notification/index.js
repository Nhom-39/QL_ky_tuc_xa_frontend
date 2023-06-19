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
import { changeDataFeedback, changeDataNoti } from '~/reducer_action/BaseReducerAction';
import { Box, Button, Typography } from '@mui/material';
import FormAddFeedback from '~/components/form/FormAddFeedback';
import { toast } from 'react-toastify';
import FormAddNoti from '~/components/form/FormAddNoti';
import FormEditNoti from '~/components/form/FormEditNoti';
import images from '~/assets/images';
import FormShowDetailNoti from '~/components/form/FormShowDetailNoti';


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
    const data_noti = useSelector(state => state.base.data_noti)
    React.useEffect(() => {
        fetch(`http://localhost:9999/notification`).then(response => response.json())
            .then(rs => {
                dispatch(changeDataNoti([...rs.data]))
            })
    }, [])

    const getListThongBao = () => {
        fetch(`http://localhost:9999/notification`).then(response => response.json())
            .then(rs => {
                dispatch(changeDataNoti([...rs.data]))
            })
            .catch(err => {
                toast.error("Gui phan hoi that bai")
            })
    }
    const handleDeleteNoti = (id) => {
        const options = {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
        fetch(`http://localhost:9999/notification/${id}`, options).then(response => response.json())
            .then(rs => {
                toast.success('Xóa thành công');
                getListThongBao()
            })
            .catch(er => {
                toast.error('Xóa thất bại');
            })
    }
    return (
        <Box sx={{ width: '1200px', margin: '160px auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ padding: '16px 0', fontSize: '16px', fontWeight: 'bold' }}>Quản lý thông báo</Typography>
                <FormAddNoti />
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Id</StyledTableCell>
                            <StyledTableCell align="right">Image</StyledTableCell>
                            <StyledTableCell align="right">Name</StyledTableCell>
                            <StyledTableCell align="right">title</StyledTableCell>
                            <StyledTableCell align="right">Summary title</StyledTableCell>
                            <StyledTableCell align="right">Thao tác</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data_noti?.map((row) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.id}
                                </StyledTableCell>
                                <StyledTableCell align="right"><img width="50px" src={images.noti} alt={row.name} /></StyledTableCell>
                                <StyledTableCell align="right">{row.name}</StyledTableCell>
                                <StyledTableCell align="right">
                                    {row.title}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.summaryTitle}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <FormEditNoti id={row.id} />
                                        <Button sx={{ margin: '0 4px' }} variant="contained" color="error" onClick={() => handleDeleteNoti(row.id)}>
                                            Xóa
                                        </Button>
                                        <FormShowDetailNoti id={row.id} />
                                    </Box>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}