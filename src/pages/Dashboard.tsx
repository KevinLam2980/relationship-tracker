import React, { useState } from 'react';
import DashboardChart from '../components/DashboardChart';
import DashboardSummary from '../components/DashboardSummary';
import { loadCycles, loadEvents } from '../utils/localStorageUtils';
import { getCycleInfo, calculateNextPeriod, getCyclePhase } from '../utils/cycleUtils';

const Dashboard = () => {
  const cycles = loadCycles();
  const events = loadEvents();
  const [selectedCycle, setSelectedCycle] = useState(0);
  const [summaryView, setSummaryView] = useState('current');

  const sortedCycles = [...cycles].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  const todayInfo = getCycleInfo(new Date().toISOString().split('T')[0], sortedCycles);
  const todayPhase = todayInfo.cycle
    ? getCyclePhase(todayInfo.cycleDay, todayInfo.cycle.periodLength)
    : 'Unknown';

  const nextPeriod = calculateNextPeriod(cycles);
  const daysUntilNextPeriod = nextPeriod
  ? Math.ceil((nextPeriod.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  : null;

  return (
    <div className="space-y-6">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
        <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">Today's Overview</h2>
          {cycles.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Current Cycle Day</p>
                <p className="text-2xl font-bold">{todayInfo.cycleDay || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Current Phase</p>
                <p className="text-lg font-medium">{todayPhase}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Next Period In</p>
                <p className="text-2xl font-bold">
                  {daysUntilNextPeriod !== null ? (
                    daysUntilNextPeriod > 0 ? (
                      `${daysUntilNextPeriod} days`
                    ) : (
                      'Today'
                    )
                  ) : (
                    'N/A'
                  )}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No cycle data available.</p>
          )}
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">Relationship Events by Cycle Day</h2>
          <DashboardChart
            cycles={cycles}
            events={events}
            selectedCycle={selectedCycle}
            setSelectedCycle={setSelectedCycle}
          />
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <DashboardSummary
            cycles={cycles}
            events={events}
            selectedCycle={selectedCycle}
            summaryView={summaryView}
            setSummaryView={setSummaryView}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;