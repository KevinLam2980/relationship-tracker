import React, { useState } from 'react';
import { Cycle } from "../types";

interface CycleFormProps {
    initialCycle?: Cycle | null;
    defaultPeriodLength: number;
    onSubmit: (cycle: Cycle) => void;
    onCancel: () => void;
  }

  const CycleForm = ({
    initialCycle,
    defaultPeriodLength,
    onSubmit,
    onCancel,
  }: CycleFormProps) => {
    const [cycle, setCycle] = useState<Cycle>(
      initialCycle || {
        startDate: '',
        periodLength: defaultPeriodLength,
      }
    );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCycle((prevCycle) => ({
      ...prevCycle,
      [name]: name === 'periodLength' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(cycle);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Period Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={cycle.startDate}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Period Length (days)
          </label>
          <input
            type="number"
            name="periodLength"
            min="2"
            max="10"
            value={cycle.periodLength}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            required
          />
        </div>

        <div className="flex space-x-2">
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            {initialCycle ? 'Update Cycle' : 'Add Cycle'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default CycleForm;