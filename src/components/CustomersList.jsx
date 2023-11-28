import { useEffect, useState } from "react"
import { AgGridReact } from "ag-grid-react"
import { useRef } from "react"
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import AddCustomer from "./AddCustomer";
import DeleteCustomer from "./DeleteCustomer";
import EditCustomer from "./EditCustomer";

export default function CustomersList() {

    //const for data manage and for future agGrid colummns 
    const [customer, setCustomers] = useState([{ firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '' }])

    const columns = [
        { headerName: 'Firstname', field: 'firstname', sortable: true, filter: true },
        { headerName: 'Lastname', field: 'lastname', sortable: true, filter: true },
        { headerName: 'Email', field: 'email', sortable: true, filter: true },
        { headerName: 'Address', field: 'streetaddress', sortable: true, filter: true },
        { headerName: 'Postcode', field: 'postcode', sortable: true, filter: true },
        { headerName: 'City', field: 'city', sortable: true, filter: true },
        { headerName: 'Phone', field: 'phone', sortable: true, filter: true },
        {
            filterable: false,
            sortable: false,
            width: 100,
            cellRenderer: row => <EditCustomer editCustomer={editCustomer} customer={row.data} />
        },
        {
            headerName: 'Delete',
            field: 'links.self.href',
            width: 90,
            cellRenderer: (params) => (
                <DeleteCustomer params={params} getCustomers={getCustomers} />
            ),
        },
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

    const saveCustomer = (c) => {
        fetch('https://traineeapp.azurewebsites.net/api/customers', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(c),
        })
            .then(response => {
                if (response.ok)
                    getCustomers()
                else
                    alert("Something went wrong")
            })
            .catch(err => console.error(err))
    }

    const editCustomer = (c, link) => {
        fetch(link, {
            method: 'PUT',
            headers: { 'Content-type': "application/json" },
            body: JSON.stringify(c),
        })
            .then(res => fetchData())
            .then(err => console.log(err))
    }

    const fetchData = () => {
        fetch('https://traineeapp.azurewebsites.net/api/customers')
            .then((response) => response.json())
            .then((responseData) => {
                setCustomers(responseData.content)
            })
    }


    console.log(customer)
    return (
        <>
            <h3>
                List of customers
            </h3>
            <AddCustomer saveCustomer={saveCustomer} />
            <div className="ag-theme-material" style={{ height: 700, width: '100%', margin: 'auto' }}>
                <AgGridReact
                    columnDefs={columns}
                    rowData={customer}
                    animateRows={true}
                    suppressCellSelection={true}
                    pagination={true}
                    paginationPageSize={15}
                    ref={gridRef}
                    onGridReady={params => gridRef.current = params.api}
                />
            </div>
        </>
    )
}