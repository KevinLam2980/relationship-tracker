import React from "react";
import { formatDate } from "../utils/dateUtils";
import { getCycleInfo, getCyclePhase } from "../utils/cycleUtils";
import { Event, Cycle } from '../types';

interface EventListProps {
  events: Event[];
  cycles: Cycle[];
  onEdit: (event: Event) => void;
  onDelete: (eventId: string) => void;
}

const EventList = ({ events, cycles, onEdit, onDelete }: EventListProps) => {
  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-4">
      {sortedEvents.map((event) => {
        const eventCycleInfo = getCycleInfo(event.date, cycles);

        return (
          <div key={event.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">
                  {formatDate(event.date)}
                </h3>
                <p className="text-gray-500">
                  {event.type === "nice" && "Was Nice to Me"}
                  {event.type === "mean" && "Was Mean to Me"}
                  {event.type === "argument" && "We Had an Argument"}
                  {event.type === "gift" && "Gave Me a Gift"}
                  {event.type === "food" && "Bought Me Food"}
                  {event.type === "intercourse" && "Intercourse"}
                </p>
                {eventCycleInfo.cycle && (
                  <p className="text-sm text-gray-500">
                    Cycle Day: {eventCycleInfo.cycleDay}, Phase:{" "}
                    {getCyclePhase(
                      eventCycleInfo.cycleDay,
                      eventCycleInfo.cycle.periodLength
                    )}
                  </p>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit(event)}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (event.id) {
                      onDelete(event.id);
                    }
                  }}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
            {event.notes && <p className="mt-2 text-gray-600">{event.notes}</p>}
          </div>
        );
      })}
    </div>
  );
};

export default EventList;
