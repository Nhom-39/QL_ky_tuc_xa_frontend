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

export default function FormShowDetailNoti({ id }) {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState({
        name: '',
        summaryTitle: '',
        title: '',
        image: '',
    })

    const handleClickOpen = async () => {
        await fetch(`http://localhost:9999/notification/${id}`).then(response => response.json())
            .then(rs => {
                setData({
                    id: rs.id,
                    name: rs.name,
                    summaryTitle: rs.summaryTitle,
                    title: rs.title,
                    image: rs.image,
                })
                setOpen(true);

            })
            .catch(err => {
                toast.error("Gui phan hoi that bai")
            })
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <Button sx={{ margin: '0 4px' }} variant="contained" color="success" onClick={() => handleClickOpen()}>
                Chi tiết thông báo
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
                <DialogTitle>Chi tiết thông báo</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        fullWidth
                        variant="standard"
                        value={data.name}
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
                        />

                        <TextField
                            sx={{ marginLeft: '8px' }}
                            autoFocus
                            margin="dense"
                            label="Summary title"
                            fullWidth
                            variant="standard"
                            value={data.summaryTitle}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}