import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Download, RotateCcw, Target, Users, BarChart3, CheckCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useResultsStore } from '../../store/resultsStore';
import { useRespondentStore } from '../../store/respondentStore';
import { useAnswersStore } from '../../store/answersStore';
import { useWizardStore } from '../../store/wizardStore';
import { Archetype } from '../../types';

export const ResultsStep: React.FC = () => {
  const { results, clearResults } = useResultsStore();
  const { name, clearRespondent } = useRespondentStore();
  const { clearAnswers } = useAnswersStore();
  const { resetWizard } = useWizardStore();
  const [shareLoading, setShareLoading] = useState(false);

  const handleReset = () => {
    clearResults();
    clearAnswers();
    clearRespondent();
    resetWizard();
    window.location.reload();
  };

  if (!results) {
    return (
      <div className="page-container">
        <div className="content-area flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-slate-400">Processando resultados...</p>
          </div>
        </div>
      </div>
    );
  }

  const archetypeInfo = {
    warrior: {
      name: 'Guerreiro',
      icon: Target,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500',
      description: 'Orientado à ação, direto e focado em resultados. Você enfrenta desafios de frente e busca eficiência.',
      traits: ['Assertivo', 'Orientado a resultados', 'Decisivo', 'Competitivo']
    },
    king: {
      name: 'Rei',
      icon: Users,
      color: 'text-yellow-300',
      bgColor: 'bg-yellow-400',
      description: 'Visionário e estratégico, você inspira outros e pensa no longo prazo com autoridade natural.',
      traits: ['Visionário', 'Líder natural', 'Estratégico', 'Inspirador']
    },
    lover: {
      name: 'Amante',
      icon: CheckCircle,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-600',
      description: 'Empático e colaborativo, você valoriza relacionamentos e busca harmonia no ambiente.',
      traits: ['Empático', 'Colaborativo', 'Comunicativo', 'Harmonioso']
    },
    mage: {
      name: 'Mago',
      icon: BarChart3,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-700',
      description: 'Analítico e precisão técnica, você busca conhecimento e qualidade em todas as atividades.',
      traits: ['Analítico', 'Preciso', 'Conhecedor', 'Metódico']
    }
  };

  const predominant = archetypeInfo[results.predominantArchetype];
  const allArchetypes = Object.keys(archetypeInfo) as Archetype[];

  const handleShare = async () => {
    setShareLoading(true);
    
    try {
      const message = `🎯 Acabei de descobrir meu arquétipo no Teste DISC Mitológico!\n\nMeu perfil predominante: ${predominant.name} (${results[results.predominantArchetype].percentage}%)\n\nFaça você também: [link]`;
      
      if (navigator.share) {
        await navigator.share({
          title: 'Meu Resultado DISC Mitológico',
          text: message
        });
      } else {
        await navigator.clipboard.writeText(message);
        alert('Resultado copiado para a área de transferência!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    } finally {
      setShareLoading(false);
    }
  };

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
          
          {/* Header */}
          <Card variant="default" padding="lg" className="text-center">
            <h1 className="heading-xl mb-2">
              Parabéns, {name?.split(' ')[0]}!
            </h1>
            <p className="text-muted">
              Seu perfil DISC foi calculado com sucesso
            </p>
          </Card>

          {/* Predominant Archetype */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card variant="default" padding="lg" className="text-center">
              <div className="space-y-6">
                <div className="flex justify-center">
                  <predominant.icon className={`w-16 h-16 ${predominant.color}`} />
                </div>


                <div>
                  <h2 className={`heading-xl mb-2 ${predominant.color}`}>
                    {predominant.name}
                  </h2>
                  <div className={`inline-block px-4 py-2 rounded-full text-black font-semibold ${predominant.bgColor}`}>
                    {results[results.predominantArchetype].percentage}%
                  </div>
                </div>

                <p className="text-body max-w-2xl mx-auto">
                  {predominant.description}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {predominant.traits.map((trait, index) => (
                    <div
                      key={trait}
                      className="bg-gray-700 px-3 py-2 rounded-lg text-sm text-yellow-300"
                    >
                      {trait}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* All Scores */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card variant="default" padding="lg">


              <h3 className="heading-lg text-center mb-6">
                Seu Perfil Completo
              </h3>

              <div className="space-y-4">
                {allArchetypes.map((archetype, index) => {
                  const info = archetypeInfo[archetype];
                  const score = results[archetype];
                  const isPredominant = archetype === results.predominantArchetype;

                  return (
                    <motion.div
                      key={archetype}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.8 + (index * 0.1) }}
                      className={`p-4 rounded-lg border transition-all ${
                        isPredominant 
                          ? 'border-yellow-500 bg-yellow-900/20' 
                          : 'border-yellow-600/30 bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <info.icon className={`w-6 h-6 ${info.color}`} />
                          <div>
                            <h4 className={`font-semibold ${info.color}`}>
                              {info.name}
                            </h4>
                            {isPredominant && (
                              <span className="text-xs text-yellow-400">Predominante</span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${info.color}`}>
                            {score.percentage}%
                          </div>
                          <div className="text-xs text-yellow-500/70">
                            {score.mostCount} respostas
                          </div>
                        </div>
                      </div>

                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <motion.div
                          className={`h-full rounded-full ${info.bgColor}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${score.percentage}%` }}
                          transition={{ duration: 1, delay: 1 + (index * 0.1) }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </motion.div>

          {/* Actions */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <Button
              variant="primary"
              onClick={handleShare}
              loading={shareLoading}
              leftIcon={<Share2 className="w-4 h-4" />}
            >
              Compartilhar
            </Button>
            
            <Button
              variant="secondary"
              onClick={() => window.print()}
              leftIcon={<Download className="w-4 h-4" />}
            >
              Baixar PDF
            </Button>
            
            <Button
              variant="outline"
              onClick={handleReset}
              leftIcon={<RotateCcw className="w-4 h-4" />}
            >
              Novo Teste
            </Button>
          </motion.div>

          {/* Footer */}
          <div className="text-center text-yellow-500/70 text-sm">
            <p>
              Resultado gerado em {results.submittedAt?.toLocaleString('pt-BR')}
            </p>
          </div>

        </motion.div>
      </div>
    </motion.div>
  );
};