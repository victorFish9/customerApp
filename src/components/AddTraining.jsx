import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddTraining(props) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: null,
        duration: '',
        activity: '',
    });

    const handleDateChange = (selectedDate) => {
        setTraining({ ...training, date: selectedDate });
    };

    const handleInputChange = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value });
    };

    const addTraining = () => {
        const trainingData = {
            ...training,
            customer: props.customerUrl,
        };

        props.saveTraining(trainingData);
        setOpen(false)
    };

    return (
        <>
            <Button onClick={() => setOpen(true)}>
                Add training
            </Button>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>New Training</DialogTitle>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker label="Date"
                            format="YYYY-MM-DD hh:mm A"
                            value={training.date}
                            onChange={handleDateChange}
                        />
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
                    <Button onClick={() => setOpen(false)}>Discard</Button>
                    <Button onClick={addTraining}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}