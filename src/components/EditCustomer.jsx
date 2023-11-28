import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { useState } from "react"

export default function EditCustomer(props) {
    //state
    //may need to change states name 
    const [customer, setCustomers] = useState([{ firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '' }])
    const [open, setOpen] = useState(false)

    const handleClose = (event, reason) => {
        if (reason != 'backdropClick')
            setOpen(false)
    }

    const handleOpen = () => {
        console.log(props.customer)
        setCustomers({
            firstname: props.customer.firstname, lastname: props.customer.lastname, streetaddress: props.customer.streetaddress, postcode: props.customer.postcode,
            city: props.customer.city,
            email: props.customer.email, phone: props.customer.phone
        })
        setOpen(true)
    }

    const handleInputChange = (event) => {
        setCustomers({ ...customer, [event.target.name]: event.target.value })
    }

    const handleEdit = () => {
        const pathToCustomerHref = props.customer.links.find(link => link.rel === 'customer')
        const pathToCustomerHref2 = props.customer.links.find(link => link.rel === 'customer')
        props.editCustomer(customer, pathToCustomerHref.href)
        console.log("Props: ", pathToCustomerHref)
        setOpen(false)
    }

    //Works! console.log("Customer information: ", customer)
    return (
        <>
            <Button onClick={handleOpen}>Edit</Button>
            <Button onClick={handleInputChange}>test</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Customer</DialogTitle>
                <DialogContent>
                    <TextField label="First name" value={customer.firstname}
                        onChange={handleInputChange}
                        name="First name"
                    >
                    </TextField>
                    <TextField label="Last name" value={customer.lastname}
                        onChange={handleInputChange}
                        name="Last name"
                    >
                    </TextField>
                    <TextField
                        label="Street Address"
                        value={customer.streetaddress}
                        onChange={handleInputChange}
                        name="streetaddress"
                    >
                    </TextField>

                    <TextField
                        label="Postcode"
                        value={customer.postcode}
                        onChange={handleInputChange}
                        name="postcode"
                    >
                    </TextField>

                    <TextField
                        label="City"
                        value={customer.city}
                        onChange={handleInputChange}
                        name="city"
                    >
                    </TextField>

                    <TextField
                        label="Email"
                        value={customer.email}
                        onChange={handleInputChange}
                        name="email"
                    >
                    </TextField>

                    <TextField
                        label="Phone"
                        value={customer.phone}
                        onChange={handleInputChange}
                        name="phone"
                    >
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEdit}>Edit</Button>
                </DialogActions>
            </Dialog>

        </>
    )
}