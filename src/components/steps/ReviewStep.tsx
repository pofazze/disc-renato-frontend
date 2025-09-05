import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useWizardStore } from '../../store/wizardStore';
import { useRespondentStore } from '../../store/respondentStore';
import { useAnswersStore } from '../../store/answersStore';
import { useResultsStore } from '../../store/resultsStore';
import { DISCCalculator } from '../../lib/disc/calculator';

export const ReviewStep: React.FC = () => {
  const { nextStep, previousStep, setLoading } = useWizardStore();
  const respondent = useRespondentStore();
  const { answers } = useAnswersStore();
  const { setResults, setCalculating } = useResultsStore();
  
  const [finalConsent, setFinalConsent] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

  const handleFinish = async () => {
    if (!finalConsent) return;

    setLoading(true);
    setCalculating(true);

    try {
      // Simulate calculation delay for UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Calculate results
      const results = DISCCalculator.calculateResults(answers);
      setResults(results);
      
      // Here you would typically send data to backend
      console.log('Submitting data:', { respondent, answers, results });
      
      nextStep();
    } catch (error) {
      console.error('Error calculating results:', error);
    } finally {
      setLoading(false);
      setCalculating(false);
    }
  };

  const completedBlocks = answers.filter(a => a.mostId && a.leastId && a.mostId !== a.leastId).length;

  return (
    <div className="min-h-screen bg-slate-900 p-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
        >
          <Card padding="lg">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-slate-100 mb-2">
                Revisão Final
              </h1>
              <p className="text-slate-400">
                Confirme seus dados antes de gerar os resultados
              </p>
            </div>

            {/* Personal Data Summary */}
            <div className="mb-8 p-4 bg-slate-700 rounded-lg">
              <h3 className="font-semibold text-slate-200 mb-3">Dados Pessoais</h3>
              <div className="space-y-2 text-sm">
                <p className="text-slate-300">
                  <span className="text-slate-400">Nome:</span> {respondent.name}
                </p>
                <p className="text-slate-300">
                  <span className="text-slate-400">WhatsApp:</span> {respondent.whatsapp}
                </p>
                <p className="text-slate-300">
                  <span className="text-slate-400">E-mail:</span> {respondent.email}
                </p>
              </div>
            </div>

            {/* Answers Summary */}
            <div className="mb-8 p-4 bg-slate-700 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-slate-200">
                  Respostas ({completedBlocks}/20)
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAnswers(!showAnswers)}
                >
                  {showAnswers ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showAnswers ? 'Ocultar' : 'Mostrar'}
                </Button>
              </div>

              {completedBlocks === 20 ? (
                <div className="flex items-center text-green-400">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  Todas as questões foram respondidas
                </div>
              ) : (
                <div className="flex items-center text-orange-400">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                  {20 - completedBlocks} questões incompletas
                </div>
              )}

              {showAnswers && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 space-y-1 text-xs text-slate-400 max-h-40 overflow-y-auto"
                >
                  {answers.map(answer => (
                    <div key={answer.blockId} className="flex justify-between">
                      <span>Bloco {answer.blockId}:</span>
                      <span>
                        + {answer.mostId} / - {answer.leastId}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Final Consent */}
            <div className="mb-8 p-4 border border-blue-600 rounded-lg bg-blue-900/10">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={finalConsent}
                  onChange={(e) => setFinalConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 text-blue-600 bg-slate-800 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
                />
                <div className="text-sm text-slate-300 leading-relaxed">
                  <p className="mb-2">
                    <strong>Confirmação Final:</strong>
                  </p>
                  <p>
                    Confirmo que todas as informações fornecidas são verdadeiras e 
                    autorizo o processamento dos meus dados para gerar o relatório 
                    DISC personalizado. Entendo que os resultados serão enviados 
                    para o e-mail e WhatsApp informados.
                  </p>
                </div>
              </label>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={previousStep}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>

              <Button
                onClick={handleFinish}
                disabled={!finalConsent || completedBlocks < 20}
              >
                Gerar Resultados
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};