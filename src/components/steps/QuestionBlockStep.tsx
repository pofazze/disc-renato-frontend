import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
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

  // Nova lógica: apenas uma seleção por bloco
  const [selectedId, setSelectedId] = useState<string>(existingAnswer?.selectedId || '');
  const [error, setError] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOptionSelect = (optionId: string) => {
    setError('');
    setSelectedId(selectedId === optionId ? '' : optionId);
  };

  const validateAndContinue = () => {
    if (!selectedId) {
      setError('Selecione uma opção para continuar');
      return;
    }
    setIsProcessing(true);
    setBlockAnswer(blockNumber, selectedId);
    setTimeout(() => {
      nextStep();
      setIsProcessing(false);
    }, 500);
  };

  if (!block) return null;

  const progress = ((blockNumber - 1) / 20) * 100;
  const isComplete = !!selectedId;
  const canContinue = isComplete && !isProcessing;

  return (
    <div className="min-h-screen bg-slate-900 p-4">
      {/* CORREÇÃO 1: Container com altura controlada */}
      <div className="h-screen overflow-y-auto">
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
          {/* CORREÇÃO 1: Card com altura máxima */}
          <Card padding="lg" className="max-h-[calc(100vh-12rem)] overflow-y-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-slate-100 mb-4">
                Bloco {blockNumber}
              </h1>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Selecione a alternativa que melhor representa você neste bloco:
              </p>
            </div>

            <div className="space-y-4">
              {block.options.map((option) => (
                <SingleOptionButton
                  key={option.id}
                  option={option}
                  selected={selectedId === option.id}
                  onSelect={() => handleOptionSelect(option.id)}
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
                    Resposta válida! Pronto para continuar.
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
    </div>
  );
};

// Novo botão para seleção única
interface SingleOptionButtonProps {
  option: QuestionOption;
  selected: boolean;
  onSelect: () => void;
  disabled: boolean;
}

const SingleOptionButton: React.FC<SingleOptionButtonProps> = ({
  option,
  selected,
  onSelect,
  disabled
}) => {
  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.01 } : undefined}
      whileTap={!disabled ? { scale: 0.99 } : undefined}
      className={`
        p-6 rounded-xl border transition-all duration-300 backdrop-blur-sm
        /* CORREÇÃO 2: Substituir cores azuis por amarelas */
        ${selected ? 'bg-yellow-900/30 border-yellow-500/70 shadow-lg shadow-yellow-500/20' : 'bg-slate-800/50 border-slate-600/50 hover:border-slate-500/70 hover:bg-slate-700/50'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      onClick={!disabled ? onSelect : undefined}
    >
      <p className="text-slate-100 mb-4 font-medium leading-relaxed">{option.text}</p>
    </motion.div>
  );
};