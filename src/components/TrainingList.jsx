import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Button } from '@mui/material';


export default function TrainingList() {

    //const for data manage and for future agGrid colummns 
    const [training, setTraining] = useState([]);
    const columns = [
        { headerName: "Activity", field: "activity", sortable: true, filter: true },
        { headerName: "Duration", field: "duration", sortable: true, filter: true },
        {
            headerName: "Customer", field: "customer", sortable: true, filter: true, cellRenderer: params => (
                params.data.customer ? `${params.data.customer.firstname} ` + `${params.data.customer.lastname}` : ""
            ),
        },
        {
            headerName: "Date", field: "date", sortable: true, filter: true, valueGetter: (params) => format(new Date(params.data.date), 'hh:mm dd/MM/yyyy')
        },
        {
            headerName: 'Delete',
            cellRenderer: params => (
                <Button onClick={() => deleteTraining(params)}>
                    Delete
                </Button>
            )
        }
    ];

    const deleteTraining = (params) => {
        const id = params.data.id;
        if (window.confirm("Are you sure?")) {
            fetch(`https://traineeapp.azurewebsites.net/api/trainings/${id}`,
                { method: 'DELETE' })
                .then((response) => {
                    if (response.ok) {
                        setTraining(prevData => prevData.filter((row) => row.id !== id))
                    }
                })
                .catch((err) => {
                    console.error(err)
                })
        }
    }



    useEffect(() => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('HTTP error!')
                }
                return response.json()
            })
            .then((data) => setTraining(data))
            .catch((error) => console.error("Error", error))
    }, [])




    //returning fetched information in AgGrid
    return (
        <div className="ag-theme-material" style={{ height: 700, width: '90%', margin: 'auto' }}>
            <AgGridReact
                rowData={training}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={20}
                suppressCellSelection={true}
                rowHeight={50}
            />

        </div>
    );
}