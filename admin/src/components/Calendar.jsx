// components/Calendar.jsx
import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import frLocale from '@fullcalendar/core/locales/fr';
import { fetchWithAuth } from '../utils/fetchWithAuth';

export default function Calendar({ token, onLogout }) {
    const [events, setEvents] = useState([]);

    const fetchReservations = async () => {
        const response = await fetchWithAuth(
            'https://tahar.projetsmmichamps.fr/API/index.php',
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            },
            onLogout
        );

        if (!response) return;

        const data = await response.json();

        console.log(data);

        const formattedEvents = data.map(res => ({
            id: res.id,
            title: `${res.first_name} ${res.last_name} (${parseInt(res.participants, 10)} pers)`,
            start: res.date_time,
            end: new Date(new Date(res.date_time).getTime() + 90 * 60 * 1000).toISOString(),
        }));

        setEvents(formattedEvents);
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    return (
        <div style={{ padding: '1rem', flexGrow: 1 }}>
            <h2 style={{ marginBottom: '1rem' }}>Calendrier des réservations</h2>
            <FullCalendar
                plugins={[timeGridPlugin]}
                initialView="timeGridWeek"
                locale={frLocale}
                events={events}
                allDaySlot={false}
                slotMinTime="10:00:00"
                slotMaxTime="20:00:00"
                height="auto"

                validRange={{
                    start: '2025-03-24',
                    end: '2025-05-25'
                }}
                initialDate="2025-03-24"
                nowIndicator={true}
            />
        </div>
    );
}
