import FullCalendar from "@fullcalendar/react";
import { useEffect, useState } from "react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';


export default function Schedule() {
    const [day, setDay] = useState([])

    useEffect(() => async () => {
        try {
            const response = await fetch('https://traineeapp.azurewebsites.net/gettrainings')

            const data = await response.json()

            const formattedEvents = data.map((training) => {
                const customerName = training.customer && training.customer.firstname ? `${training.customer.firstname} ${training.customer.lastname || ''}`
                    : '';

                return {
                    title: `${training.activity} - ${customerName}`,
                    start: training.date,
                }
            })
            setDay(formattedEvents)
        } catch (error) {
            console.error('Error', error)
        }

    }, [])
    return (
        <div style={{ margin: '10px', padding: '5px' }}>
            <FullCalendar eventMinHeight={90}
                eventColor="blue"
                contentHeight='600px'
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="timeGridWeek"
                events={day}
            />
        </div>
    )
}