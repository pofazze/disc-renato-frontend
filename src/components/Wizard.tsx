import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useWizardStore } from '../store/wizardStore';
import { LandingStep } from './steps/LandingStep';
import { PersonalDataStep } from './steps/PersonalDataStep';
import { QuestionBlockStep } from './steps/QuestionBlockStep';
import { ReviewStep } from './steps/ReviewStep';
import { ResultsStep } from './steps/ResultsStep';

export const Wizard: React.FC = () => {
  const { currentStep } = useWizardStore();

  const renderStep = () => {
    // Step 1: Landing
    if (currentStep === 1) {
      return <LandingStep key="landing" />;
    }
    
    // Step 2: Personal Data
    if (currentStep === 2) {
      return <PersonalDataStep key="personal-data" />;
    }
    
    // Steps 3-22: Question Blocks (20 blocks)
    if (currentStep >= 3 && currentStep <= 22) {
      const blockNumber = currentStep - 2; // Block 1-20
      return <QuestionBlockStep key={`block-${blockNumber}`} blockNumber={blockNumber} />;
    }
    
    // Step 23: Review
    if (currentStep === 23) {
      return <ReviewStep key="review" />;
    }
    
    // Step 24: Results
    if (currentStep === 24) {
      return <ResultsStep key="results" />;
    }

    // Default fallback
    return <LandingStep key="fallback" />;
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {renderStep()}
    </AnimatePresence>
  );
};