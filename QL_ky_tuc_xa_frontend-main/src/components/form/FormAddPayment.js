import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';

export default function FormAddPayment() {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState({
        is_: '',
        type: 1,
        createdAt: Date.now() / 1000 | 0,
        username: '',
        money: ''
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        console.log(data);
        const options = {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data),
        }
        fetch(`http://localhost:9999/payment`, options).then(response => response.json())
            .then(rs => {
                toast.success("Gui thanh cong")
                handleClose()
            })
            .catch(err => {
                toast.error("Gui that bai")
            })
    }
    const resetForm = () => {
        setData({
            username: '',
            money: '',
            type: ''
        })
    }
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Thêm mới
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Thêm mới</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="User name"
                        fullWidth
                        variant="standard"
                        value={data.username}
                        onChange={e => setData({ ...data, username: e.target.value })}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        label="Money"
                        fullWidth
                        variant="standard"
                        value={data.money}
                        onChange={e => setData({ ...data, money: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button onClick={handleSubmit}>Thêm</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}