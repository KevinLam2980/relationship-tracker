import React from "react";
import { formatDate } from "../utils/dateUtils";
import { Cycle } from "../types";

interface CycleListProps {
  cycles: Cycle[];
  onEdit: (cycle: Cycle) => void;
  onDelete: (cycleId: string) => void;
}

const CycleList = ({ cycles, onEdit, onDelete }: CycleListProps) => {
  const sortedCycles = [...cycles].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  return (
    <div className="space-y-4">
      {sortedCycles.map((cycle) => (
        <div key={cycle.id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">
                {formatDate(cycle.startDate)}
              </h3>
              <p className="text-gray-500">
                Period Length: {cycle.periodLength} days
                {cycle.calculatedLength && (
                  <span> • Cycle Length: {cycle.calculatedLength} days</span>
                )}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(cycle)}
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  if (cycle.id) {
                    onDelete(cycle.id);
                  }
                }}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CycleList;
