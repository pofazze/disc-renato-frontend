import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
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

  const [selectedId, setSelectedId] = useState<string>(existingAnswer?.selectedId || '');
  const [error, setError] = useState<string>('');

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
    <div className="page-container">
      <div className="content-area">
        <div className="container-mobile spacing-mobile">
          
          {/* Progress Header */}
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm text-slate-400">
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
            <div className="space-y-3 mb-6">
              {block.options.map((option) => (
                <OptionCard
                  key={option.id}
                  option={option}
                  selected={selectedId === option.id}
                  onSelect={() => handleOptionSelect(option.id)}
                />
              ))}
            </div>

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
              <div className="mb-6 p-4 bg-green-900/20 border border-green-500/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <p className="text-green-300 text-sm">
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

        </div>
      </div>
    </div>
  );
};

interface OptionCardProps {
  option: QuestionOption;
  selected: boolean;
  onSelect: () => void;
}

const OptionCard: React.FC<OptionCardProps> = ({ option, selected, onSelect }) => {
  return (
    <Card
      variant={selected ? 'selected' : 'interactive'}
      padding="md"
      onClick={onSelect}
      className="transition-all duration-200"
    >
      <div className="flex items-start space-x-3">
        <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-1 transition-colors ${
          selected 
            ? 'bg-blue-500 border-blue-500' 
            : 'border-slate-400 hover:border-slate-300'
        }`}>
          {selected && (
            <div className="w-full h-full rounded-full bg-white scale-50" />
          )}
        </div>
        <p className="text-slate-200 leading-relaxed">{option.text}</p>
      </div>
    </Card>
  );
};