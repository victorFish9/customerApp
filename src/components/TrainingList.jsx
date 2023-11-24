import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';


export default function TrainingList() {

    //const for data manage and for future agGrid colummns 
    const [training, setTraining] = useState([]);
    const columns = [
        { headerName: "Activity", field: "activity", sortable: true, filter: true },
        { headerName: "Duration", field: "duration", sortable: true, filter: true },
        { headerName: "Customer", field: "customer", sortable: true, filter: true },
        {
            headerName: "Date", field: "date", sortable: true, filter: true, valueGetter: (params) => format(new Date(params.data.date), 'dd/MM/yyyy hh:mm')
        },
    ];

    //fetching information from api rest

    useEffect(() => {
        fetch('https://traineeapp.azurewebsites.net/api/trainings')
            .then(response => response.json())
            .then((responseData) => {
                //training sorting with map 
                const x = responseData.content.map(training => {

                    const fetchedLink = training.links.find(link => link.rel === 'customer');
                    //if fetchedLink true return fetch information in json
                    if (fetchedLink) {
                        return fetch(fetchedLink.href)
                            .then(response => response.json())
                            //customer data returning in one variable as firstname and lastname
                            .then(customerData => {
                                training.customer = customerData.firstname + " " + customerData.lastname;
                                return training;
                            });
                    }
                });

                Promise.all(x)
                    .then(updatedTraining => setTraining(updatedTraining));
            });
    }, [])



    //returning fetched information in AgGrid
    return (
        <div className="ag-theme-material" style={{ height: 700, width: '80%', margin: 'auto' }}>
            <AgGridReact
                rowData={training}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={20}
                suppressCellSelection={true}
                rowHeight={30}
            />

        </div>
    );
}