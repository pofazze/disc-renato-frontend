import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Results } from '../types';

interface ResultsState {
  results: Results | null;
  isCalculating: boolean;
  
  // Actions
  setResults: (results: Results) => void;
  clearResults: () => void;
  setCalculating: (calculating: boolean) => void;
}

export const useResultsStore = create<ResultsState>()(
  persist(
    (set) => ({
      results: null,
      isCalculating: false,
      
      setResults: (results: Results) => set({ results }),
      clearResults: () => set({ results: null }),
      setCalculating: (calculating: boolean) => set({ isCalculating: calculating })
    }),
    {
      name: 'disc-results-store',
      partialize: (state) => ({ results: state.results })
    }
  )
);