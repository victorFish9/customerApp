import { useEffect, useState } from "react"
import { AgGridReact } from "ag-grid-react"
import { useRef } from "react"
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

export default function CustomersList() {

    const [customer, setCustomers] = useState([{ firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '' }])

    const columns = [
        { headerName: 'Firstname', field: 'firstname', sortable: true, filter: true },
        { headerName: 'Lastname', field: 'lastname', sortable: true, filter: true },
        { headerName: 'Streetaddress', field: 'streetaddress', sortable: true, filter: true },
        { headerName: 'postcode', field: 'postcode', sortable: true, filter: true },
        { headerName: 'city', field: 'city', sortable: true, filter: true },
        { headerName: 'email', field: 'email', sortable: true, filter: true },
        { headerName: 'phone', field: 'phone', sortable: true, filter: true },
    ]

    const gridRef = useRef()

    useEffect(() => getCustomers(), [])

    const getCustomers = () => {
        fetch('https://traineeapp.azurewebsites.net/api/customers')
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData.content)
                setCustomers(responseData.content)
            })
            .catch(err => console.error(err))
    }

    console.log(customer)
    return (
        <>
            <h3>
                List of customers
            </h3>
            <div className="ag-theme-material" style={{ height: 700, width: '100%', margin: 'auto' }}>
                <AgGridReact
                    columnDefs={columns}
                    rowData={customer}
                    animateRows={true}
                    suppressCellSelection={true}
                    pagination={true}
                    paginationPageSize={10}
                    ref={gridRef}
                    onGridReady={params => gridRef.current = params.api}
                />
            </div>
        </>
    )
}