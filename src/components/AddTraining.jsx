import { TurnLeft } from "@mui/icons-material"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { useState } from "react"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function AddTraining(props) {
    const [open, setOpen] = useState(false)
    const [training, setTraining] = useState({
        date: null,
        duration: '',
        activity: '',
    })

    const handleDateChange = (selectedDate) => {
        setTraining[{ ...training, date: selectedDate }]
    }
    const handleInputChange = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value })
    }

    const addTraining = () => {
        const data = {
            ...training,
            customer: props.customerUrl,
        }
        props.saveTraining(data)
        setOpen(false)
    }

    return (
        <>
            <Button style={{ margin: 10 }} variant="outlined" onClick={() => setOpen(true)}>
                Add Training
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Training</DialogTitle>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker label="Date"
                            format="YYYY-MM-DD hh:mm A"
                            value={training.date}
                            onChange={handleDateChange} />
                    </DemoContainer>
                </LocalizationProvider>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        onChange={(e) => handleInputChange(e)}
                        label="Duration"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        onChange={(e) => handleInputChange(e)}
                        label="Activity"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={addTraining}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}