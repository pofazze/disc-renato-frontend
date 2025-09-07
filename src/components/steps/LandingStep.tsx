import React from 'react';
import { motion } from 'framer-motion';
import { Sword, Crown, Heart, Sparkles, ArrowRight, Zap, Target, Users, Brain, Star, Rocket, Shield } from 'lucide-react';
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
      color: 'text-primary-500',
      bgColor: 'bg-primary-500/10',
      borderColor: 'border-primary-500/30'
    },
    {
      icon: Crown,
      name: 'Rei',
      emoji: '👑',
      description: 'Visionário e estratégico',
      color: 'text-primary-600',
      bgColor: 'bg-primary-600/10',
      borderColor: 'border-primary-600/30'
    },
    {
      icon: Heart,
      name: 'Amante',
      emoji: '💙',
      description: 'Empático e colaborativo',
      color: 'text-primary-400',
      bgColor: 'bg-primary-400/10',
      borderColor: 'border-primary-400/30'
    },
    {
      icon: Sparkles,
      name: 'Mago',
      emoji: '🧙‍♂️',
      description: 'Analítico e precisão técnica',
      color: 'text-primary-700',
      bgColor: 'bg-primary-700/10',
      borderColor: 'border-primary-700/30'
    }
  ];

  const features = [
    {
      icon: Target,
      text: '20 blocos de questões',
      color: 'text-primary-400'
    },
    {
      icon: Brain,
      text: 'Análise comportamental',
      color: 'text-primary-500'
    },
    {
      icon: Users,
      text: 'Relatório personalizado',
      color: 'text-primary-600'
    },
    {
      icon: Zap,
      text: '5-8 minutos',
      color: 'text-primary-400'
    }
  ];

  return (
    <div className="step-content ">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}  
        className="max-w-5xl w-full"
      >
        <Card variant="glow" padding="lg" className="text-center max-h-screen-safe custom-scrollbar">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Header with animated icons */}
            <div className="flex items-center justify-center mb-6">
              
              <h1 className="text-4xl md:text-6xl font-bold text-gradient tracking-wide">
                Teste DISC Mitológico
              </h1>
              
            </div>

            {/* Subtitle with enhanced styling */}
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Descubra seu arquétipo comportamental através de uma jornada 
              de autoconhecimento baseada em <span className="text-primary-400 font-semibold text-glow">mitologia</span> e <span className="text-primary-500 font-semibold text-glow">psicologia</span>.
            </p>
          </motion.div>

          {/* Archetypes Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {archetypes.map((archetype, index) => (
              <motion.div
                key={archetype.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  transition: { duration: 0.2 }
                }}
                className={`
                  p-6 glass-card cursor-pointer group
                  ${archetype.bgColor}
                  border ${archetype.borderColor} 
                  shadow-lg hover:shadow-xl hover:shadow-primary-500/20
                  transition-all duration-300
                `}
              >
                <motion.div 
                  className="text-4xl mb-3"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {archetype.emoji}
                </motion.div>
                
                <archetype.icon className={`w-8 h-8 ${archetype.color} mx-auto mb-3 group-hover:animate-pulse`} />
                
                <h3 className={`font-bold text-lg ${archetype.color} mb-2`}>
                  {archetype.name}
                </h3>
                
                <p className="text-sm text-gray-400 leading-relaxed">
                  {archetype.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex flex-col items-center space-y-2 p-4 bg-gray-800/50 rounded-xl border border-gray-600/30"
                >
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  <span className="text-sm text-gray-300 text-center font-medium">
                    {feature.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex items-center justify-center space-x-2 text-gray-400 mb-6"
              >
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-sm">100% Gratuito • Resultados Instantâneos • Dados Protegidos</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1 }}
              >
                <Button
                  variant="futuristic"
                  size="lg"
                  onClick={nextStep}
                  className=" py-4 flex flex-column flex-nowrap text-lg font-bold shadow-2xl shadow-primary-500/30 hover:shadow-primary-500/50"
                >
    
                  Iniciar Jornada
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
};