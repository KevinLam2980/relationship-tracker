import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CycleForm from '../components/CycleForm';
import CycleList from '../components/CycleList';
import ConfirmDialog from '../components/ConfirmDialog';
import { loadCycles, saveCycles, loadDefaultCycleData } from '../utils/localStorageUtils';
import { calculateNextPeriod } from '../utils/cycleUtils';
import { Cycle } from '../types';

const CycleTracking = () => {
  const history = useHistory();
  const [cycles, setCycles] = useState<Cycle[]>(loadCycles());
  const [selectedCycle, setSelectedCycle] = useState<Cycle | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [cycleToDelete, setCycleToDelete] = useState<Cycle | null>(null);

  const defaultCycleData = loadDefaultCycleData();

  const handleAddCycle = (newCycle: Cycle) => {
    const cycleWithId = { ...newCycle, id: Date.now().toString() };
    const updatedCycles = [...cycles, cycleWithId];
    setCycles(updatedCycles);
    saveCycles(updatedCycles);
    setSelectedCycle(null);
    history.push('/cycle-tracking');
  };

  const handleUpdateCycle = (updatedCycle: Cycle) => {
    const updatedCycles = cycles.map((cycle) =>
      cycle.id === updatedCycle.id ? updatedCycle : cycle
    );
    setCycles(updatedCycles);
    saveCycles(updatedCycles);
    setSelectedCycle(null);
    history.push('/cycle-tracking');
  };

  const handleDeleteCycle = (cycleId: string) => {
    const cycleToDelete = cycles.find((cycle) => cycle.id === cycleId);
    if (cycleToDelete) {
      setCycleToDelete(cycleToDelete);
      setIsConfirmDialogOpen(true);
    }
  };

  const confirmDeleteCycle = () => {
    if (cycleToDelete) {
      const updatedCycles = cycles.filter((cycle) => cycle.id !== cycleToDelete.id);
      setCycles(updatedCycles);
      saveCycles(updatedCycles);
      setIsConfirmDialogOpen(false);
      setCycleToDelete(null);
    }
  };

  const cancelDeleteCycle = () => {
    setIsConfirmDialogOpen(false);
    setCycleToDelete(null);
  };

  const nextPeriod = calculateNextPeriod(cycles);

  return (
    <div className="space-y-6">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">Add New Cycle</h2>
          <CycleForm
            defaultPeriodLength={defaultCycleData.periodLength}
            onSubmit={selectedCycle ? handleUpdateCycle : handleAddCycle}
            onCancel={() => setSelectedCycle(null)}
            initialCycle={selectedCycle}
          />
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">Cycle History</h2>
          <CycleList cycles={cycles} onEdit={setSelectedCycle} onDelete={handleDeleteCycle} />
        </div>
      </div>

      {nextPeriod && (
        <div className="bg-blue-50 shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg leading-6 font-medium text-blue-800">
              Next Period Prediction
            </h2>
            <p className="mt-1 text-sm text-blue-600">
              Expected: {nextPeriod.toLocaleDateString()}
            </p>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        title="Delete Cycle"
        message={`Are you sure you want to delete the cycle starting on ${
          cycleToDelete ? cycleToDelete.startDate : ''
        }?`}
        onConfirm={confirmDeleteCycle}
        onCancel={cancelDeleteCycle}
      />
    </div>
  );
};

export default CycleTracking;