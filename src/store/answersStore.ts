import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BlockAnswer } from '../types';

interface AnswersState {
  answers: BlockAnswer[];
  
  // Actions
  setBlockAnswer: (blockId: number, mostId: string, leastId: string) => void;
  getBlockAnswer: (blockId: number) => BlockAnswer | undefined;
  clearAnswers: () => void;
  isBlockComplete: (blockId: number) => boolean;
  getCompletedBlocksCount: () => number;
  isAllBlocksComplete: () => boolean;
}

export const useAnswersStore = create<AnswersState>()(
  persist(
    (set, get) => ({
      answers: [],
      
      setBlockAnswer: (blockId: number, mostId: string, leastId: string) =>
        set((state) => {
          const existingIndex = state.answers.findIndex(a => a.blockId === blockId);
          const newAnswer: BlockAnswer = { blockId, mostId, leastId };
          
          if (existingIndex >= 0) {
            const newAnswers = [...state.answers];
            newAnswers[existingIndex] = newAnswer;
            return { answers: newAnswers };
          } else {
            return { answers: [...state.answers, newAnswer] };
          }
        }),
      
      getBlockAnswer: (blockId: number) => 
        get().answers.find(a => a.blockId === blockId),
      
      clearAnswers: () => set({ answers: [] }),
      
      isBlockComplete: (blockId: number) => {
        const answer = get().getBlockAnswer(blockId);
        return !!(answer && answer.mostId && answer.leastId && answer.mostId !== answer.leastId);
      },
      
      getCompletedBlocksCount: () => {
        const { answers } = get();
        return answers.filter(a => a.mostId && a.leastId && a.mostId !== a.leastId).length;
      },
      
      isAllBlocksComplete: () => get().getCompletedBlocksCount() === 20
    }),
    {
      name: 'disc-answers-store'
    }
  )
);