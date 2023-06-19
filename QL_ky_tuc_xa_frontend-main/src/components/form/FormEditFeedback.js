import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';
import { changeDataFeedback } from '~/reducer_action/BaseReducerAction';
import { useDispatch } from 'react-redux';

export default function FormAddFeedback() {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState({
        email: '',
        content: '',
        createdAt: Date.now() / 1000 | 0,
        responded: 1
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getlistFeedback = () => {
        fetch(`http://localhost:9999/feedback`).then(response => response.json())
            .then(rs => {
                dispatch(changeDataFeedback([...rs.data]))
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
        await fetch(`http://localhost:9999/feedback`, options).then(response => response.json())
            .then(async rs => {
                toast.success("Gui phan hoi thanh cong")
                handleClose()
                resetForm()
                await getlistFeedback()
            })
            .catch(err => {
                toast.error("Gui phan hoi that bai")
            })
    }
    const resetForm = () => {
        setData({
            emai: '',
            content: ''
        })
    }
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Thêm mới
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Thêm phản hồi</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={data.email}
                        onChange={e => setData({ ...data, email: e.target.value })}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        multiline
                        rows={4}
                        label="Content"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={data.content}
                        onChange={e => setData({ ...data, content: e.target.value })}
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