import React from 'react';
import { motion } from 'framer-motion';
import { Sword, Crown, Heart, Sparkles, ArrowRight, Zap, Target, Users, Brain } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useWizardStore } from '../../store/wizardStore';

export const LandingStep: React.FC = () => {
  const { nextStep } = useWizardStore();

  const archetypes = [
    {
      icon: Sword,
      name: 'Guerreiro',
      emoji: '⚔️',
      description: 'Orientado à ação e resultados',
      color: 'text-orange-500',
      bgGradient: 'from-orange-500/20 to-red-500/20',
      borderColor: 'border-orange-500/30'
    },
    {
      icon: Crown,
      name: 'Rei',
      emoji: '👑',
      description: 'Visionário e estratégico',
      color: 'text-purple-500',
      bgGradient: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-500/30'
    },
    {
      icon: Heart,
      name: 'Amante',
      emoji: '💙',
      description: 'Empático e colaborativo',
      color: 'text-blue-500',
      bgGradient: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500/30'
    },
    {
      icon: Sparkles,
      name: 'Mago',
      emoji: '🧙‍♂️',
      description: 'Analítico e precisão técnica',
      color: 'text-indigo-500',
      bgGradient: 'from-indigo-500/20 to-violet-500/20',
      borderColor: 'border-indigo-500/30'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full relative z-10"
      >
        <Card className="text-center" padding="lg">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-center mb-4">
              <Zap className="w-12 h-12 text-blue-400 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Teste DISC Mitológico
              </h1>
              <Zap className="w-12 h-12 text-purple-400 ml-4" />
            </div>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Descubra seu arquétipo comportamental através de uma jornada 
              de autoconhecimento baseada em <span className="text-cyan-400 font-semibold">mitologia</span> e <span className="text-purple-400 font-semibold">psicologia</span>.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {archetypes.map((archetype, index) => (
              <motion.div
                key={archetype.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`p-4 bg-gradient-to-br ${archetype.bgGradient} backdrop-blur-sm rounded-2xl border ${archetype.borderColor} shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <div className="text-3xl mb-2">{archetype.emoji}</div>
                <archetype.icon className={`w-6 h-6 ${archetype.color} mx-auto mb-2`} />
                <h3 className={`font-semibold ${archetype.color} mb-1`}>
                  {archetype.name}
                </h3>
                <p className="text-sm text-slate-400">
                  {archetype.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-slate-400 mb-6">
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-blue-400" />
                <span className="text-sm">20 blocos de questões</span>
              </div>
              <div className="flex items-center space-x-2">
                <Brain className="w-4 h-4 text-purple-400" />
                <span className="text-sm">Análise comportamental</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-cyan-400" />
                <span className="text-sm">Relatório personalizado</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-orange-400" />
                <span className="text-sm">5-8 minutos</span>
              </div>
            </div>

            <Button
              onClick={nextStep}
              size="lg"
              className="mt-8 px-12 py-4 text-lg shadow-2xl shadow-blue-600/30 hover:shadow-blue-600/40"
            >
              Começar Teste
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
};