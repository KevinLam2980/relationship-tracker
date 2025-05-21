import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import EventForm from '../components/EventForm';
import EventList from '../components/EventList';
import ConfirmDialog from '../components/ConfirmDialog';
import { loadEvents, saveEvents } from '../utils/localStorageUtils';
import { loadCycles } from '../utils/localStorageUtils';
import { Event } from '../types';

const AddEvents = () => {
  const history = useHistory();
  const [events, setEvents] = useState<Event[]>(loadEvents());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);

  const cycles = loadCycles();

  const handleAddEvent = (newEvent: Event) => {
    const eventWithId = { ...newEvent, id: Date.now().toString() };
    const updatedEvents = [...events, eventWithId];
    setEvents(updatedEvents);
    saveEvents(updatedEvents);
    history.push('/add-events');
  };

  const handleUpdateEvent = (updatedEvent: Event) => {
    const updatedEvents = events.map((event) =>
      event.id === updatedEvent.id ? updatedEvent : event
    );
    setEvents(updatedEvents);
    saveEvents(updatedEvents);
    setSelectedEvent(null);
    history.push('/add-events');
  };

  const handleDeleteEvent = (eventId: string ) => {
    const eventToDelete = events.find((event) => event.id === eventId);
    if (eventToDelete) {
      setEventToDelete(eventToDelete);
      setIsConfirmDialogOpen(true);
    }
  };

  const confirmDeleteEvent = () => {
    if (eventToDelete) {
      const updatedEvents = events.filter((event) => event.id !== eventToDelete.id);
      setEvents(updatedEvents);
      saveEvents(updatedEvents);
      setIsConfirmDialogOpen(false);
      setEventToDelete(null);
    }
  };

  const cancelDeleteEvent = () => {
    setIsConfirmDialogOpen(false);
    setEventToDelete(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">Add New Event</h2>
          <EventForm
            cycles={cycles}
            onSubmit={selectedEvent ? handleUpdateEvent : handleAddEvent}
            onCancel={() => setSelectedEvent(null)}
            initialEvent={selectedEvent}
          />
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Events</h2>
          <EventList
            events={events}
            cycles={cycles}
            onEdit={(event) => setSelectedEvent(event)}
            onDelete={handleDeleteEvent}
          />
        </div>
      </div>

      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        title="Delete Event"
        message={`Are you sure you want to delete the event on ${
          eventToDelete ? eventToDelete.date : ''
        }?`}
        onConfirm={confirmDeleteEvent}
        onCancel={cancelDeleteEvent}
      />
    </div>
  );
};

export default AddEvents;