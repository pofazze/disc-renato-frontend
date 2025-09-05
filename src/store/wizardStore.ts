import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WizardState {
  currentStep: number;
  totalSteps: number;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetWizard: () => void;
  getProgressPercentage: () => number;
}

export const useWizardStore = create<WizardState>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      totalSteps: 24, // landing + personal data + 20 blocks + review + results
      isLoading: false,
      error: null,
      
      setCurrentStep: (step: number) => 
        set({ currentStep: Math.max(1, Math.min(step, get().totalSteps)) }),
      
      nextStep: () => {
        const { currentStep, totalSteps } = get();
        if (currentStep < totalSteps) {
          set({ currentStep: currentStep + 1 });
        }
      },
      
      previousStep: () => {
        const { currentStep } = get();
        if (currentStep > 1) {
          set({ currentStep: currentStep - 1 });
        }
      },
      
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      setError: (error: string | null) => set({ error }),
      resetWizard: () => set({ currentStep: 1, error: null, isLoading: false }),
      
      getProgressPercentage: () => {
        const { currentStep, totalSteps } = get();
        return Math.round((currentStep / totalSteps) * 100);
      }
    }),
    {
      name: 'disc-wizard-store',
      partialize: (state) => ({ currentStep: state.currentStep })
    }
  )
);