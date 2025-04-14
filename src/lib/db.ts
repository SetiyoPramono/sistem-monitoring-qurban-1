
import { QurbanData } from "@/types";

// Initial default data
const DEFAULT_DATA: QurbanData = {
  goats: {
    total: 200,
    outOfPen: 0,
    slaughtered: 0
  },
  sheep: {
    total: 500,
    outOfPen: 0,
    slaughtered: 0
  },
  cows: {
    total: 50,
    outOfPen: 0,
    slaughtered: 0
  },
  packaging: {
    total: 1500,
    completed: 0
  },
  distribution: {
    total: 1500,
    completed: 0
  }
};

// Local storage key
const STORAGE_KEY = 'qurban_data';

// Load data from local storage or use defaults
export const loadData = (): QurbanData => {
  if (typeof window === 'undefined') {
    return DEFAULT_DATA;
  }
  
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    saveData(DEFAULT_DATA);
    return DEFAULT_DATA;
  }
  
  try {
    return JSON.parse(saved) as QurbanData;
  } catch (e) {
    console.error('Error parsing saved data:', e);
    return DEFAULT_DATA;
  }
};

// Save data to local storage
export const saveData = (data: QurbanData): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
};

// Reset to default data
export const resetData = (): QurbanData => {
  saveData(DEFAULT_DATA);
  return DEFAULT_DATA;
};
