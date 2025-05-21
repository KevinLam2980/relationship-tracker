import { Event, Cycle } from '../types';
  
  interface DefaultCycleData {
    averageCycleLength: number;
    periodLength: number;
  }
  
  const CYCLES_KEY = 'cycles';
  const EVENTS_KEY = 'events';
  const DEFAULT_CYCLE_DATA_KEY = 'defaultCycleData';
  
  export const loadCycles = (): Cycle[] => {
    const storedCycles = localStorage.getItem(CYCLES_KEY);
    return storedCycles ? JSON.parse(storedCycles) : [];
  };
  
  export const saveCycles = (cycles: Cycle[]) => {
    localStorage.setItem(CYCLES_KEY, JSON.stringify(cycles));
  };
  
  export const loadEvents = (): Event[] => {
    const storedEvents = localStorage.getItem(EVENTS_KEY);
    return storedEvents ? JSON.parse(storedEvents) : [];
  };
  
  export const saveEvents = (events: Event[]) => {
    localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  };
  
  export const loadDefaultCycleData = (): DefaultCycleData => {
    const storedDefaultCycleData = localStorage.getItem(DEFAULT_CYCLE_DATA_KEY);
    return storedDefaultCycleData
      ? JSON.parse(storedDefaultCycleData)
      : {
          averageCycleLength: 28,
          periodLength: 5,
        };
  };
  
  export const saveDefaultCycleData = (defaultCycleData: DefaultCycleData) => {
    localStorage.setItem(DEFAULT_CYCLE_DATA_KEY, JSON.stringify(defaultCycleData));
  };