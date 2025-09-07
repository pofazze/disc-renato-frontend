import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, User, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
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

  const handleFinish = async () => {
    if (!finalConsent) return;

    setLoading(true);
    setCalculating(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const results = DISCCalculator.calculateResults(answers);
      setResults(results);
      
      console.log('Submitting data:', { respondent, answers, results });
      
      nextStep();
    } catch (error) {
      console.error('Error calculating results:', error);
    } finally {
      setLoading(false);
      setCalculating(false);
    }
  };

  const completedBlocks = answers.filter(a => a.selectedId).length;
  const isComplete = completedBlocks === 20;

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
          
          <Card variant="default" padding="lg">
            {/* Header */}
            <div className="text-center space-y-2 mb-8">
              <h1 className="heading-lg">Revisão Final</h1>
              <p className="text-muted">
                Confirme seus dados antes de gerar os resultados
              </p>
            </div>

            <div className="space-y-6">
              
              {/* Personal Data Summary */}
              <Card variant="default" padding="md" className="bg-gray-800/50">
                <div className="flex items-center space-x-2 mb-4">
                  <User className="w-5 h-5 text-yellow-400" />
                  <h3 className="heading-md">Dados Pessoais</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-yellow-400/70">Nome:</span>
                    <span className="text-yellow-200">{respondent.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-yellow-400/70">WhatsApp:</span>
                    <span className="text-yellow-200">{respondent.whatsapp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-yellow-400/70">E-mail:</span>
                    <span className="text-yellow-200">{respondent.email}</span>
                  </div>
                </div>
              </Card>

              {/* Answers Summary */}
              <Card variant="default" padding="md" className="bg-gray-800/50">
                <div className="flex items-center space-x-2 mb-4">
                  <MessageSquare className="w-5 h-5 text-yellow-400" />
                  <h3 className="heading-md">Respostas</h3>
                </div>
                
                <div className="flex items-center space-x-3">
                  {isComplete ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                      <span className="text-yellow-400 text-sm">
                        Todas as 20 questões foram respondidas
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0" />
                      <span className="text-orange-400 text-sm">
                        {completedBlocks}/20 questões respondidas
                      </span>
                    </>
                  )}
                </div>
              </Card>

              {/* Final Consent */}
              <Card variant="default" padding="md" className="border-yellow-500/30 bg-yellow-900/10">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={finalConsent}
                    onChange={(e) => setFinalConsent(e.target.checked)}
                    className="checkbox-base mt-1"
                  />
                  <div className="text-sm text-yellow-300 leading-relaxed">
                    <p className="font-medium mb-2">Confirmação Final:</p>
                    <p>
                      Confirmo que todas as informações fornecidas são verdadeiras e 
                      autorizo o processamento dos meus dados para gerar o relatório 
                      DISC personalizado. Entendo que os resultados serão enviados 
                      para o e-mail e WhatsApp informados.
                    </p>
                  </div>
                </label>
              </Card>
            </div>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-between mt-8">
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
                onClick={handleFinish}
                disabled={!finalConsent || !isComplete}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="order-1 sm:order-2"
              >
                Gerar Resultados
              </Button>
            </div>
          </Card>

        </motion.div>
      </div>
    </motion.div>
  );
};