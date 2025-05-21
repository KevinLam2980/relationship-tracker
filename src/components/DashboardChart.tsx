/* eslint-disable react/prop-types */
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceArea,
  ReferenceLine,
} from 'recharts';
import { getCycleInfo, getCyclePhase, formatCycleDisplay } from '../utils/cycleUtils';
import { Event, Cycle } from '../types';

interface DashboardChartProps {
  cycles: Cycle[];
  events: Event[];
  selectedCycle: number;
  setSelectedCycle: (cycleNumber: number) => void;
}

const DashboardChart = ({
  cycles,
  events,
  selectedCycle,
  setSelectedCycle,
}: DashboardChartProps) => {
  const sortedCycles = [...cycles].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  const chartData = prepareChartData(selectedCycle, cycles, events);

  const formatTooltip = (value: number, name: string, props: any) => {
    const { payload } = props;
    const { phase } = payload;
    return `Day ${value} (${phase})`;
  };

  const renderPhaseAreas = () => {
    const cycle = sortedCycles[selectedCycle];
    if (!cycle) return null;

    const boundaries = getPhaseBoundaries(cycle.periodLength);
    return boundaries.map((phase, index) => (
      <ReferenceArea
        key={`phase-${index}`}
        x1={phase.start}
        x2={phase.end}
        fill={phase.color}
        label={{
          value: phase.phase,
          position: 'insideBottom',
          fontSize: 10,
          fill: '#666',
        }}
      />
    ));
  };

  const renderTodayLine = () => {
    if (selectedCycle !== 0) return null;

    const todayInfo = getCycleInfo(new Date().toISOString().split('T')[0], sortedCycles);
    if (!todayInfo.cycleDay) return null;

    return (
      <ReferenceLine
        x={todayInfo.cycleDay}
        stroke="#ff0000"
        strokeDasharray="5 5"
        strokeWidth={2}
        label={{
          value: 'Today',
          position: 'top',
          fontSize: 12,
          fill: '#ff0000',
        }}
      />
    );
  };

  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="cycleDay" />
          <YAxis />
          <Tooltip formatter={formatTooltip} />
          <Legend />
          <Line type="monotone" dataKey="nice" stroke="#8884d8" />
          <Line type="monotone" dataKey="mean" stroke="#82ca9d" />
          <Line type="monotone" dataKey="argument" stroke="#ffc658" />
          {renderPhaseAreas()}
          {renderTodayLine()}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const prepareChartData = (cycleNumber: number, cycles: Cycle[], events: Event[]) => {
  const cycle = cycles[cycleNumber];
  if (!cycle) return [];

  const cycleEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    const cycleStart = new Date(cycle.startDate);
    const cycleEnd = new Date(cycleStart);
    cycleEnd.setDate(cycleStart.getDate() + cycle.periodLength - 1);
    return eventDate >= cycleStart && eventDate <= cycleEnd;
  });

  const chartData = [];
  for (let cycleDay = 1; cycleDay <= cycle.periodLength; cycleDay++) {
    const dayEvents = cycleEvents.filter((event) => {
      const eventInfo = getCycleInfo(event.date, cycles);
      return eventInfo.cycleNumber === cycleNumber && eventInfo.cycleDay === cycleDay;
    });

    const nice = dayEvents.filter((event) => event.type === 'nice').length;
    const mean = dayEvents.filter((event) => event.type === 'mean').length;
    const argument = dayEvents.filter((event) => event.type === 'argument').length;

    chartData.push({
      cycleDay,
      nice,
      mean,
      argument,
      phase: getCyclePhase(cycleDay, cycle.periodLength),
    });
  }

  return chartData;
};

const getPhaseBoundaries = (periodLength: number) => {
  const boundaries = [
    { phase: 'Menstruation', start: 1, end: periodLength, color: 'rgba(255, 0, 0, 0.1)' },
    { phase: 'Follicular', start: periodLength + 1, end: 13, color: 'rgba(0, 255, 0, 0.1)' },
    { phase: 'Ovulation', start: 14, end: 14, color: 'rgba(0, 0, 255, 0.1)' },
    { phase: 'Luteal', start: 15, end: 28, color: 'rgba(255, 255, 0, 0.1)' },
  ];
  return boundaries;
};

export default DashboardChart;