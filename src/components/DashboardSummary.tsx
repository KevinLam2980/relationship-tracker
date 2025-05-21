import React from 'react';
import { getEventLabel } from '../utils/eventUtils';
import { getCyclePhase } from '../utils/cycleUtils';
import { Event, Cycle } from '../types';

interface DashboardSummaryProps {
  cycles: Cycle[];
  events: Event[];
  selectedCycle: number;
  summaryView: string;
  setSummaryView: (view: string) => void;
}

const DashboardSummary = ({
  cycles,
  events,
  selectedCycle,
  summaryView,
  setSummaryView,
}: DashboardSummaryProps) => {
  const stats = calculateStats(events, cycles, selectedCycle, summaryView);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Event Summary</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setSummaryView('current')}
            className={`px-4 py-2 rounded ${
              summaryView === 'current' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Current Cycle
          </button>
          <button
            onClick={() => setSummaryView('all')}
            className={`px-4 py-2 rounded ${
              summaryView === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            All Time
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {Object.entries(stats.eventsByType).map(([type, count]) => (
          <div key={type} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">{getEventLabel(type)}</h3>
            <p className="text-3xl font-bold">{count}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Events by Cycle Phase</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(stats.eventsByPhase).map(([phase, counts]) => (
            <div key={phase} className="bg-white p-4 rounded shadow">
              <h4 className="text-lg font-semibold mb-2">{phase}</h4>
              {Object.entries(counts).map(([type, count]) => (
                <p key={type}>
                  {getEventLabel(type)}: {count}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const calculateStats = (
  events: Event[],
  cycles: Cycle[],
  selectedCycle: number,
  summaryView: string
) => {
  const filteredEvents =
    summaryView === 'current'
      ? events.filter((event) => {
          const eventCycleInfo = getCycleInfo(event.date, cycles);
          return eventCycleInfo.cycleNumber === selectedCycle;
        })
      : events;

  const eventsByType: Record<string, number> = {};
  const eventsByPhase: Record<string, Record<string, number>> = {
    Menstruation: {},
    Follicular: {},
    Ovulation: {},
    Luteal: {},
  };

  filteredEvents.forEach((event) => {
    const { type, date } = event;
    eventsByType[type] = (eventsByType[type] || 0) + 1;

    const eventCycleInfo = getCycleInfo(date, cycles);
    if (eventCycleInfo.cycleDay && eventCycleInfo.cycle) {
      const phase = getCyclePhase(eventCycleInfo.cycleDay, eventCycleInfo.cycle.periodLength);
      eventsByPhase[phase][type] = (eventsByPhase[phase][type] || 0) + 1;
    }
  });

  return {
    eventsByType,
    eventsByPhase,
  };
};

const getCycleInfo = (date: string, cycles: Cycle[]) => {
  const eventDate = new Date(date);
  for (let i = 0; i < cycles.length; i++) {
    const cycle = cycles[i];
    const cycleStart = new Date(cycle.startDate);
    const cycleEnd = new Date(cycleStart);
    cycleEnd.setDate(cycleStart.getDate() + cycle.periodLength - 1);

    if (eventDate >= cycleStart && eventDate <= cycleEnd) {
      const cycleDay = Math.floor((eventDate.getTime() - cycleStart.getTime()) / 86400000) + 1;
      return { cycleNumber: i, cycleDay, cycle };
    }
  }
  return { cycleNumber: null, cycleDay: null, cycle: null };
};

export default DashboardSummary;