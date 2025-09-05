import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Respondent } from '../types';

interface RespondentState extends Partial<Respondent> {
  // Actions
  setRespondent: (data: Partial<Respondent>) => void;
  clearRespondent: () => void;
  isValid: () => boolean;
}

const initialState: Partial<Respondent> = {
  name: '',
  whatsapp: '',
  email: '',
  consentGiven: false
};

export const useRespondentStore = create<RespondentState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      setRespondent: (data: Partial<Respondent>) =>
        set((state) => ({ ...state, ...data })),
      
      clearRespondent: () => set(initialState),
      
      isValid: () => {
        const state = get();
        return !!(
          state.name && 
          state.name.trim().split(' ').length >= 2 &&
          state.whatsapp && 
          state.email && 
          state.consentGiven
        );
      }
    }),
    {
      name: 'disc-respondent-store'
    }
  )
);