import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Progress } from '../ui/Progress';
import { useWizardStore } from '../../store/wizardStore';
import { useAnswersStore } from '../../store/answersStore';
import { questionBlocks } from '../../data/questions';
import { QuestionOption } from '../../types';
import { shuffleArray } from '../../lib/utils';

interface QuestionBlockStepProps {
  blockNumber: number;
}

export const QuestionBlockStep: React.FC<QuestionBlockStepProps> = ({ blockNumber }) => {
  const { nextStep, previousStep } = useWizardStore();
  const { setBlockAnswer, getBlockAnswer } = useAnswersStore();

  const block = questionBlocks.find(b => b.id === blockNumber);
  const existingAnswer = getBlockAnswer(blockNumber);

  const [selectedId, setSelectedId] = useState<string>(existingAnswer?.selectedId || '');
  const [error, setError] = useState<string>('');
  const [shuffledOptions, setShuffledOptions] = useState<QuestionOption[]>([]);

  // Embaralha as opções quando o bloco muda
  useEffect(() => {
    if (block) {
      setShuffledOptions(shuffleArray(block.options));
    }
  }, [blockNumber, block]);

  const handleOptionSelect = (optionId: string) => {
    setError('');
    setSelectedId(selectedId === optionId ? '' : optionId);
  };

  const validateAndContinue = () => {
    if (!selectedId) {
      setError('Selecione uma opção para continuar');
      return;
    }
    setBlockAnswer(blockNumber, selectedId);
    nextStep();
  };

  if (!block) return null;

  const progress = ((blockNumber - 1) / 20) * 100;
  const isComplete = !!selectedId;

  return (
    <motion.div 
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="content-area">
        <motion.div 
          className="container-mobile spacing-mobile"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          
          {/* Progress Header */}
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm text-yellow-400/70">
              <span>Pergunta {blockNumber} de 20</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} />
          </div>

          <Card variant="default" padding="lg">
            {/* Question Header */}
            <div className="space-y-4 mb-6">
              <h1 className="heading-lg">Bloco {blockNumber}</h1>
              <p className="text-body">
                Selecione a alternativa que melhor representa você:
              </p>
            </div>

            {/* Options */}
            <motion.div 
              className="space-y-3 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {shuffledOptions.map((option, index) => (
                <OptionCard
                  key={option.id}
                  option={option}
                  selected={selectedId === option.id}
                  onSelect={() => handleOptionSelect(option.id)}
                  index={index}
                />
              ))}
            </motion.div>

            {/* Status Messages */}
            {error && (
              <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              </div>
            )}

            {isComplete && !error && (
              <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-500/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <p className="text-yellow-300 text-sm">
                    Resposta selecionada! Pronto para continuar.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
              <Button
                variant="outline"
                onClick={previousStep}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
                className="order-2 sm:order-1"
              >
                Voltar
              </Button>

              <Button
                variant="primary"
                onClick={validateAndContinue}
                disabled={!isComplete}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="order-1 sm:order-2"
              >
                Continuar
              </Button>
            </div>
          </Card>

        </motion.div>
      </div>
    </motion.div>
  );
};

interface OptionCardProps {
  option: QuestionOption;
  selected: boolean;
  onSelect: () => void;
  index: number;
}

const OptionCard: React.FC<OptionCardProps> = ({ option, selected, onSelect, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        variant={selected ? 'selected' : 'interactive'}
        padding="md"
        onClick={onSelect}
        className="transition-all duration-200"
      >
        <div className="flex items-start space-x-3">
          <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-1 transition-colors ${
            selected 
              ? 'bg-yellow-500 border-yellow-500' 
              : 'border-yellow-400/60 hover:border-yellow-300'
          }`}>
            {selected && (
              <div className="w-full h-full rounded-full bg-black scale-50" />
            )}
          </div>
          <p className="text-yellow-200 leading-relaxed">{option.text}</p>
        </div>
      </Card>
    </motion.div>
  );
};