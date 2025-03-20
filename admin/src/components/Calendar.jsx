import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import frLocale from '@fullcalendar/core/locales/fr';
import { fetchWithAuth } from '../utils/fetchWithAuth';
import '../styles/Calendar.css';

export default function Calendar({ token, onLogout }) {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false); 

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
            first_name: res.first_name,
            last_name: res.last_name,
            email: res.email,
            phone_number: res.phone_number,
            participants: res.participants,
            promo_code: res.promo_code,
        }));

        setEvents(formattedEvents);
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    const handleEventClick = (info) => {
        const eventId = info.event.id;
        const event = events.find(e => e.id === eventId); 
        setSelectedEvent(event); 
        setIsModalOpen(true); 
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    return (
        <div style={{ padding: '1rem', flexGrow: 1 }}>
            <h2 style={{ marginBottom: '1rem' }}>Calendrier des réservations</h2>
            <FullCalendar
                plugins={[timeGridPlugin]}
                initialView="timeGridWeek"
                locale={frLocale}
                events={events}
                allDaySlot={false}
                slotMinTime="09:30:00"
                slotMaxTime="20:00:00"
                height="auto"
                validRange={{
                    start: '2025-03-24',
                    end: '2025-05-25'
                }}
                initialDate="2025-03-24"
                eventClick={handleEventClick} 
            />

            {isModalOpen && selectedEvent && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-btn" onClick={closeModal}>&times;</span>
                        <h3>Détails de la réservation</h3>
                        <div className="modal-body">
                            <p><strong>Nom complet:</strong> {selectedEvent.first_name} {selectedEvent.last_name}</p>
                            <p><strong>Date et Heure:</strong> {new Date(selectedEvent.start).toLocaleString()}</p>
                            <p><strong>Participants:</strong> {selectedEvent.participants} personnes</p>
                            <p><strong>Email:</strong> {selectedEvent.email}</p>
                            <p><strong>Téléphone:</strong> {selectedEvent.phone_number}</p>
                            <p><strong>Code promo:</strong> {selectedEvent.promo_code === '1' ? 'Oui' : 'Non'}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
