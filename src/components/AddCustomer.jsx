import { useState } from "react"
import { Dialog, Button, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material"

export default function AddCustomer(props) {
    //state for data and window manage
    const [customer, setCustomer] = useState({
        firstaname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: '',
    })
    const [open, setOpen] = useState(false)

    //functions 
    const handleClose = (event, reason) => {
        if (reason != 'backdropClick')
            setOpen(false)
    }

    const handleSave = () => {
        props.saveCustomer(customer)
        setOpen(false)
    }

    const handleInputChange = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value })
    }
    return (
        <>
            <Button onClick={() => setOpen(true)}>Add customer</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New customer</DialogTitle>
                <DialogContent>
                    <TextField
                        label='Firstname'
                        value={customer.firstname}
                        onChange={handleInputChange}
                        name="firstname"
                    >

                    </TextField>
                    <TextField
                        label='Lastname'  // Updated label to 'Lastname'
                        value={customer.lastname}  // Assuming you have a 'lastname' property in your 'customer' object
                        onChange={handleInputChange}
                        name="lastname"  // Updated name to 'lastname'
                    >
                    </TextField>
                    <TextField
                        label='Street Address'
                        value={customer.streetaddress}
                        onChange={handleInputChange}
                        name="streetaddress"
                    >
                    </TextField>

                    <TextField
                        label='Postcode'
                        value={customer.postcode}
                        onChange={handleInputChange}
                        name="postcode"
                    >
                    </TextField>

                    <TextField
                        label='City'
                        value={customer.city}
                        onChange={handleInputChange}
                        name="city"
                    >
                    </TextField>

                    <TextField
                        label='Email'
                        value={customer.email}
                        onChange={handleInputChange}
                        name="email"
                    >
                    </TextField>

                    <TextField
                        label='Phone'
                        value={customer.phone}
                        onChange={handleInputChange}
                        name="phone"
                    >
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}