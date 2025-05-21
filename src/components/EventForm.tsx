import React, { useState } from 'react';
import { getCycleInfo, getCyclePhase } from '../utils/cycleUtils';
import { Event, Cycle } from '../types';

interface EventFormProps {
    cycles: Cycle[];
    initialEvent?: Event | null;
    onSubmit: (event: Event) => void;
    onCancel: () => void;
  }


const EventForm = ({ cycles, initialEvent, onSubmit, onCancel }: EventFormProps) => {
    const [event, setEvent] = useState<Event>(
      initialEvent || {
        date: new Date().toISOString().split('T')[0],
        type: 'nice',
        notes: '',
      }
    );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(event);
  };

  const eventCycleInfo = getCycleInfo(event.date, cycles);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={event.date}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
        {eventCycleInfo.cycle && (
          <p className="mt-1 text-sm text-gray-500">
            Cycle Day: {eventCycleInfo.cycleDay}, Phase: {getCyclePhase(eventCycleInfo.cycleDay, eventCycleInfo.cycle.periodLength)}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Event Type
        </label>
        <select
          id="type"
          name="type"
          value={event.type}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        >
          <option value="nice">Was Nice to Me</option>
          <option value="mean">Was Mean to Me</option>
          <option value="argument">We Had an Argument</option>
          <option value="gift">Gave Me a Gift</option>
          <option value="food">Bought Me Food</option>
          <option value="intercourse">Intercourse</option>
        </select>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          value={event.notes}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Add any additional notes..."
        ></textarea>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {initialEvent ? 'Update Event' : 'Add Event'}
        </button>
      </div>
    </form>
  );
};

export default EventForm;