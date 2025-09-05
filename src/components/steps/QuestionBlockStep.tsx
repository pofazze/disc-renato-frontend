import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, Plus, Minus } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Progress } from '../ui/Progress';
import { useWizardStore } from '../../store/wizardStore';
import { useAnswersStore } from '../../store/answersStore';
import { questionBlocks } from '../../data/questions';
import { QuestionOption } from '../../types';

interface QuestionBlockStepProps {
  blockNumber: number;
}

export const QuestionBlockStep: React.FC<QuestionBlockStepProps> = ({ blockNumber }) => {
  const { nextStep, previousStep } = useWizardStore();
  const { setBlockAnswer, getBlockAnswer } = useAnswersStore();
  
  const block = questionBlocks.find(b => b.id === blockNumber);
  const existingAnswer = getBlockAnswer(blockNumber);
  
  const [mostSelected, setMostSelected] = useState<string>(existingAnswer?.mostId || '');
  const [leastSelected, setLeastSelected] = useState<string>(existingAnswer?.leastId || '');
  const [error, setError] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOptionSelect = (optionId: string, type: 'most' | 'least') => {
    setError('');
    
    if (type === 'most') {
      if (mostSelected === optionId) {
        // Deselect if clicking the same option
        setMostSelected('');
      } else {
        setMostSelected(optionId);
        // If this option was selected as least, clear it
        if (leastSelected === optionId) {
          setLeastSelected('');
        }
      }
    } else {
      if (leastSelected === optionId) {
        // Deselect if clicking the same option
        setLeastSelected('');
      } else {
        setLeastSelected(optionId);
        // If this option was selected as most, clear it
        if (mostSelected === optionId) {
          setMostSelected('');
        }
      }
    }
  };

  const validateAndContinue = () => {
    if (!mostSelected && !leastSelected) {
      setError('Selecione pelo menos uma opção MAIS ou MENOS');
      return;
    }

    if (mostSelected && leastSelected && mostSelected === leastSelected) {
      setError('As opções MAIS e MENOS devem ser diferentes');
      return;
    }

    setIsProcessing(true);
    setBlockAnswer(blockNumber, mostSelected, leastSelected);
    // Small delay for better UX
    setTimeout(() => {
      nextStep();
      setIsProcessing(false);
    }, 300);
  };

  if (!block) return null;

  const progress = ((blockNumber - 1) / 20) * 100;
  const isComplete = (mostSelected || leastSelected) && (!mostSelected || !leastSelected || mostSelected !== leastSelected);
  const canContinue = isComplete && !isProcessing;

  return (
    <div className="min-h-screen bg-slate-900 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 font-medium">
              Pergunta {blockNumber} de 20
            </span>
            <span className="text-slate-400 font-medium">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} />
        </motion.div>

        {/* Question Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
        >
          <Card padding="lg">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-slate-100 mb-4">
                Bloco {blockNumber}
              </h1>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Selecione a característica que <strong className="text-green-400">MAIS</strong> se identifica com você 
                e a que <strong className="text-red-400">MENOS</strong> se identifica com você:
              </p>
            </div>

            <div className="space-y-4">
              {block.options.map((option) => (
                <OptionButton
                  key={option.id}
                  option={option}
                  mostSelected={mostSelected === option.id}
                  leastSelected={leastSelected === option.id}
                  onSelectMost={() => handleOptionSelect(option.id, 'most')}
                  onSelectLeast={() => handleOptionSelect(option.id, 'least')}
                  disabled={isProcessing}
                />
              ))}
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 p-4 bg-red-900/30 border border-red-500/50 rounded-xl backdrop-blur-sm"
              >
                <div className="flex items-center space-x-3">
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-red-300 font-medium">{error}</p>
                </div>
              </motion.div>
            )}

            {isComplete && !error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-green-900/30 border border-green-500/50 rounded-xl backdrop-blur-sm text-center"
              >
                <div className="flex items-center justify-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <p className="text-green-300 font-medium">
                    Respostas válidas! Pronto para continuar.
                  </p>
                </div>
              </motion.div>
            )}

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={previousStep}
                disabled={isProcessing}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>

              <Button
                onClick={validateAndContinue}
                disabled={!canContinue}
                loading={isProcessing}
              >
                {isProcessing ? 'Processando...' : 'Continuar'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

interface OptionButtonProps {
  option: QuestionOption;
  mostSelected: boolean;
  leastSelected: boolean;
  onSelectMost: () => void;
  onSelectLeast: () => void;
  disabled: boolean;
}

const OptionButton: React.FC<OptionButtonProps> = ({
  option,
  mostSelected,
  leastSelected,
  onSelectMost,
  onSelectLeast,
  disabled
}) => {
  const isSelected = mostSelected || leastSelected;
  
  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.01 } : undefined}
      whileTap={!disabled ? { scale: 0.99 } : undefined}
      className={`
        p-6 rounded-xl border transition-all duration-300 backdrop-blur-sm
        ${mostSelected ? 'bg-green-900/30 border-green-500/70 shadow-lg shadow-green-500/20' : 
          leastSelected ? 'bg-red-900/30 border-red-500/70 shadow-lg shadow-red-500/20' : 
          'bg-slate-800/50 border-slate-600/50 hover:border-slate-500/70 hover:bg-slate-700/50'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <p className="text-slate-100 mb-4 font-medium leading-relaxed">{option.text}</p>
      
      <div className="flex gap-3">
        <button
          onClick={onSelectMost}
          disabled={disabled}
          className={`
            px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 backdrop-blur-sm flex items-center space-x-2
            ${mostSelected 
              ? 'bg-green-600/90 text-white shadow-lg shadow-green-600/30 border border-green-500/50' 
              : 'bg-slate-600/70 text-slate-300 hover:bg-green-600/80 hover:text-white hover:shadow-lg hover:shadow-green-600/20 border border-slate-500/30'}
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-600/70
          `}
        >
          <Plus className="w-3 h-3" />
          <span>MAIS</span>
        </button>
        
        <button
          onClick={onSelectLeast}
          disabled={disabled}
          className={`
            px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 backdrop-blur-sm flex items-center space-x-2
            ${leastSelected 
              ? 'bg-red-600/90 text-white shadow-lg shadow-red-600/30 border border-red-500/50' 
              : 'bg-slate-600/70 text-slate-300 hover:bg-red-600/80 hover:text-white hover:shadow-lg hover:shadow-red-600/20 border border-slate-500/30'}
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-600/70
          `}
        >
          <Minus className="w-3 h-3" />
          <span>MENOS</span>
        </button>
      </div>
    </motion.div>
  );
};