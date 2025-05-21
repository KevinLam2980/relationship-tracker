export interface Event {
    id?: string;
    date: string;
    type: string;
    notes: string;
  }

export interface Cycle {
    id?: string;
    startDate: string;
    periodLength: number;
    calculatedLength?: number;
  }
  