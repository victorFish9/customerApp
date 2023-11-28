
import React from 'react';
import { Button } from '@mui/material';

export default function DeleteCustomer({ params, getCustomers }) {

    const deleteCustomer = () => {
        if (window.confirm('Are you sure?')) {
            console.log('params.data:', params.data);

            const customerLink =
                params.data &&
                params.data.links &&
                params.data.links.find(link => link.rel === 'self') &&
                params.data.links.find(link => link.rel === 'self').href;

            if (customerLink) {
                fetch(customerLink, { method: 'DELETE' })
                    .then((response) => {
                        if (response.ok) {
                            alert('Customer deleted');
                            getCustomers();
                        } else {
                            console.error('Error deleting customer:', response.status, response.statusText);
                        }
                    })
                    .catch((err) => console.error('Error deleting customer:', err));
            } else {
                console.error('Invalid customer link');
            }
        }
    };

    return (
        <Button variant="outlined" color="primary" onClick={deleteCustomer}>
            Delete
        </Button>
    );
}