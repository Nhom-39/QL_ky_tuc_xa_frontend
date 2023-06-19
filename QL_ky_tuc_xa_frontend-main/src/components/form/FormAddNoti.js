import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';
import { changeDataNoti } from '~/reducer_action/BaseReducerAction';
import { useDispatch } from 'react-redux';
import { Box, Stack } from '@mui/material';

export default function FormAddNoti() {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState({
        name: '',
        summaryTitle: '',
        title: '',
        image: null,
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getListThongBao = () => {
        fetch(`http://localhost:9999/notification`).then(response => response.json())
            .then(rs => {
                dispatch(changeDataNoti([...rs.data]))
            })
            .catch(err => {
                toast.error("Gui phan hoi that bai")
            })
    }

    const handleSubmit = async () => {
        console.log(data);
        const options = {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data),
        }
        await fetch(`http://localhost:9999/notification`, options).then(response => response.json())
            .then(async rs => {
                toast.success("Gui thong bao thanh cong")
                handleClose()
                resetForm()
                await getListThongBao()
            })
            .catch(err => {
                toast.error("Gui thong bao that bai")
            })
    }
    const resetForm = () => {
        setData({
            name: '',
            summaryTitle: '',
            title: '',
            image: '',
        })
    }
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Thêm mới
            </Button>
            <Dialog open={open} onClose={handleClose}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "500px",  // Set your width here
                        },
                    },
                }}
            >
                <DialogTitle>Thêm thông báo</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        fullWidth
                        variant="standard"
                        value={data.name}
                        onChange={e => setData({ ...data, name: e.target.value })}
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <TextField
                            sx={{ marginRight: '8px' }}
                            autoFocus
                            margin="dense"
                            label="Title"
                            fullWidth
                            variant="standard"
                            value={data.title}
                            onChange={e => setData({ ...data, title: e.target.value })}
                        />

                        <TextField
                            sx={{ marginLeft: '8px' }}
                            autoFocus
                            margin="dense"
                            label="Summary title"
                            fullWidth
                            variant="standard"
                            value={data.summaryTitle}
                            onChange={e => setData({ ...data, summaryTitle: e.target.value })}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button onClick={handleSubmit}>Thêm</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}