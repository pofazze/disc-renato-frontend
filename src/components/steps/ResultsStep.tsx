import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Download, Sparkles, Crown, Sword, Heart } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useResultsStore } from '../../store/resultsStore';
import { useRespondentStore } from '../../store/respondentStore';
import { useAnswersStore } from '../../store/answersStore';
import { useWizardStore } from '../../store/wizardStore';
import { Archetype } from '../../types';

export const ResultsStep: React.FC = () => {
  const { clearResults } = useResultsStore();
  const { clearAnswers } = useAnswersStore();
  const { clearRespondent } = useRespondentStore();
  const { resetWizard } = useWizardStore();

  const handleReset = () => {
    clearResults();
    clearAnswers();
    clearRespondent();
    resetWizard();
    window.location.reload(); // Garante que tudo volte ao início
  };
  const { results } = useResultsStore();
  const { name } = useRespondentStore();
  const [shareLoading, setShareLoading] = useState(false);

  if (!results) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-400">Processando resultados...</p>
        </div>
      </div>
    );
  }

  const archetypeInfo = {
    warrior: {
      name: 'Guerreiro',
      emoji: '⚔️',
      icon: Sword,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500',
      description: 'Orientado à ação, direto e focado em resultados. Você enfrenta desafios de frente e busca eficiência.',
      traits: ['Assertivo', 'Orientado a resultados', 'Decisivo', 'Competitivo']
    },
    king: {
      name: 'Rei',
      emoji: '👑',
      icon: Crown,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500',
      description: 'Visionário e estratégico, você inspira outros e pensa no longo prazo com autoridade natural.',
      traits: ['Visionário', 'Líder natural', 'Estratégico', 'Inspirador']
    },
    lover: {
      name: 'Amante',
      emoji: '💙',
      icon: Heart,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500',
      description: 'Empático e colaborativo, você valoriza relacionamentos e busca harmonia no ambiente.',
      traits: ['Empático', 'Colaborativo', 'Comunicativo', 'Harmonioso']
    },
    mage: {
      name: 'Mago',
      emoji: '🧙‍♂️',
      icon: Sparkles,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-500',
      description: 'Analítico e precisão técnica, você busca conhecimento e qualidade em todas as atividades.',
      traits: ['Analítico', 'Preciso', 'Conhecedor', 'Metódico']
    }
  };

  const predominant = archetypeInfo[results.predominantArchetype];
  const allArchetypes = Object.keys(archetypeInfo) as Archetype[];

  const handleShare = async () => {
    setShareLoading(true);
    
    try {
      const message = `🎯 Acabei de descobrir meu arquétipo no Teste DISC Mitológico!\n\nMeu perfil predominante: ${predominant.emoji} ${predominant.name} (${results[results.predominantArchetype].percentage}%)\n\nFaça você também: [link]`;
      
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
    <div className="min-h-screen bg-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <Card padding="lg" className="text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-3xl font-bold text-slate-100 mb-2">
                Parabéns, {name?.split(' ')[0]}!
              </h1>
              <p className="text-slate-400">
                Seu perfil DISC foi calculado com sucesso
              </p>
            </motion.div>
          </Card>

          {/* Predominant Archetype */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card padding="lg" className="text-center">
              <div className="mb-6">
                <div className="text-6xl mb-4">{predominant.emoji}</div>
                <h2 className={`text-3xl font-bold mb-2 ${predominant.color}`}>
                  {predominant.name}
                </h2>
                <div className={`inline-block px-4 py-2 rounded-full text-white font-semibold ${predominant.bgColor}`}>
                  {results[results.predominantArchetype].percentage}%
                </div>
              </div>

              <p className="text-slate-300 text-lg mb-6 max-w-2xl mx-auto">
                {predominant.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {predominant.traits.map((trait, index) => (
                  <motion.div
                    key={trait}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="bg-slate-700 px-3 py-2 rounded-lg text-sm text-slate-300"
                  >
                    {trait}
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* All Scores */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card padding="lg">
              <h3 className="text-xl font-semibold text-slate-100 mb-6 text-center">
                Seu Perfil Completo
              </h3>

              <div className="space-y-4">
                {allArchetypes.map((archetype) => {
                  const info = archetypeInfo[archetype];
                  const score = results[archetype];
                  const isPredominant = archetype === results.predominantArchetype;

                  return (
                    <motion.div
                      key={archetype}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + allArchetypes.indexOf(archetype) * 0.1 }}
                      className={`
                        p-4 rounded-lg border transition-all
                        ${isPredominant 
                          ? 'border-blue-500 bg-blue-900/20' 
                          : 'border-slate-600 bg-slate-700'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{info.emoji}</span>
                          <div>
                            <h4 className={`font-semibold ${info.color}`}>
                              {info.name}
                            </h4>
                            {isPredominant && (
                              <span className="text-xs text-blue-400">Predominante</span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${info.color}`}>
                            {score.percentage}%
                          </div>
                          <div className="text-xs text-slate-500">
                            +{score.mostCount} / -{score.leastCount}
                          </div>
                        </div>
                      </div>

                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${score.percentage}%` }}
                          transition={{ delay: 0.8 + allArchetypes.indexOf(archetype) * 0.1, duration: 0.8 }}
                          className={`h-full rounded-full ${info.bgColor}`}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex gap-4 justify-center"
          >
            <Button
              onClick={handleShare}
              loading={shareLoading}
              className="px-6"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar
            </Button>
            <Button
              variant="outline"
              onClick={() => window.print()}
              className="px-6"
            >
              <Download className="w-4 h-4 mr-2" />
              Baixar PDF
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
              className="px-6"
            >
              Resetar e começar do início
            </Button>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center text-slate-500 text-sm"
          >
            <p>
              Resultado gerado em {results.submittedAt?.toLocaleString('pt-BR')}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};