import { Cycle } from '../types';

  
  export const getCycleInfo = (date: string, cycles: Cycle[]) => {
    const eventDate = new Date(date);
    for (let i = 0; i < cycles.length; i++) {
      const cycle = cycles[i];
      const cycleStart = new Date(cycle.startDate);
      const cycleEnd = new Date(cycleStart);
      cycleEnd.setDate(cycleStart.getDate() + cycle.periodLength - 1);
  
      if (eventDate >= cycleStart && eventDate <= cycleEnd) {
        const cycleDay = Math.floor((eventDate.getTime() - cycleStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        return { cycleNumber: i, cycleDay, cycle };
      }
    }
    return { cycleNumber: null, cycleDay: null, cycle: null };
  };
  
  export const getCyclePhase = (day: number, periodLength: number) => {
    if (day <= periodLength) {
      return 'Menstruation';
    } else if (day <= 14) {
      return 'Follicular';
    } else if (day <= 21) {
      return 'Ovulation';
    } else {
      return 'Luteal';
    }
  };
  
  export const formatCycleDisplay = (cycleNumber: number) => {
    if (cycleNumber === 0) {
      return 'Current Cycle';
    } else if (cycleNumber === 1) {
      return 'Previous Cycle';
    } else {
      return `${cycleNumber} Cycles Ago`;
    }
  };
  
  export const calculateNextPeriod = (cycles: Cycle[]) => {
    if (cycles.length === 0) {
      return null;
    }
  
    const sortedCycles = [...cycles].sort(
      (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );
  
    const mostRecentCycle = sortedCycles[0];
    const lastPeriodStart = new Date(mostRecentCycle.startDate);
  
    if (cycles.length === 1) {
      const nextPeriod = new Date(lastPeriodStart);
      nextPeriod.setDate(lastPeriodStart.getDate() + mostRecentCycle.periodLength);
      return nextPeriod;
    }
  
    let totalLength = 0;
    for (let i = 0; i < cycles.length - 1; i++) {
      const currentStart = new Date(cycles[i].startDate);
      const nextStart = new Date(cycles[i + 1].startDate);
      const length = Math.floor((currentStart.getTime() - nextStart.getTime()) / (1000 * 60 * 60 * 24));
      totalLength += length;
    }
  
    const averageLength = Math.round(totalLength / (cycles.length - 1));
    const nextPeriod = new Date(lastPeriodStart);
    nextPeriod.setDate(lastPeriodStart.getDate() + averageLength);
  
    return nextPeriod;
  };