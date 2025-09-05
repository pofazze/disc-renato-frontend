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
      color: 'text-orange-500',
      bgGradient: 'from-orange-500/20 via-red-500/20 to-orange-600/20',
      borderColor: 'border-orange-500/30',
      glowColor: 'shadow-orange-500/20'
    },
    {
      icon: Crown,
      name: 'Rei',
      emoji: '👑',
      description: 'Visionário e estratégico',
      color: 'text-purple-500',
      bgGradient: 'from-purple-500/20 via-pink-500/20 to-purple-600/20',
      borderColor: 'border-purple-500/30',
      glowColor: 'shadow-purple-500/20'
    },
    {
      icon: Heart,
      name: 'Amante',
      emoji: '💙',
      description: 'Empático e colaborativo',
      color: 'text-blue-500',
      bgGradient: 'from-blue-500/20 via-cyan-500/20 to-blue-600/20',
      borderColor: 'border-blue-500/30',
      glowColor: 'shadow-blue-500/20'
    },
    {
      icon: Sparkles,
      name: 'Mago',
      emoji: '🧙‍♂️',
      description: 'Analítico e precisão técnica',
      color: 'text-indigo-500',
      bgGradient: 'from-indigo-500/20 via-violet-500/20 to-indigo-600/20',
      borderColor: 'border-indigo-500/30',
      glowColor: 'shadow-indigo-500/20'
    }
  ];

  const features = [
    {
      icon: Target,
      text: '20 blocos de questões',
      color: 'text-blue-400'
    },
    {
      icon: Brain,
      text: 'Análise comportamental',
      color: 'text-purple-400'
    },
    {
      icon: Users,
      text: 'Relatório personalizado',
      color: 'text-cyan-400'
    },
    {
      icon: Zap,
      text: '5-8 minutos',
      color: 'text-orange-400'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/3 to-purple-500/3 rounded-full blur-3xl"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl w-full relative z-10"
      >
        <Card variant="glow" padding="lg" className="text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Header with animated icons */}
            <div className="flex items-center justify-center mb-6">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Rocket className="w-12 h-12 text-blue-400 mr-4" />
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gradient font-['Orbitron'] tracking-wide">
                Teste DISC Mitológico
              </h1>
              
              <motion.div
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-12 h-12 text-purple-400 ml-4" />
              </motion.div>
            </div>

            {/* Subtitle with enhanced styling */}
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Descubra seu arquétipo comportamental através de uma jornada 
              de autoconhecimento baseada em <span className="text-cyan-400 font-semibold text-glow">mitologia</span> e <span className="text-purple-400 font-semibold text-glow">psicologia</span>.
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
                  p-6 glass-card squircle cursor-pointer group
                  bg-gradient-to-br ${archetype.bgGradient} 
                  border ${archetype.borderColor} 
                  shadow-lg hover:shadow-xl ${archetype.glowColor}
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
                
                <h3 className={`font-bold text-lg ${archetype.color} mb-2 font-['Orbitron']`}>
                  {archetype.name}
                </h3>
                
                <p className="text-sm text-slate-400 leading-relaxed">
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
                  className="flex flex-col items-center space-y-2 p-4 glass-dark rounded-xl border border-slate-600/30"
                >
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  <span className="text-sm text-slate-300 text-center font-medium">
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
                className="flex items-center justify-center space-x-2 text-slate-400 mb-6"
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
                  className="px-12 py-4 text-lg font-bold shadow-2xl shadow-cyan-600/30 hover:shadow-cyan-600/50 font-['Orbitron']"
                >
                  <Rocket className="mr-3 w-6 h-6" />
                  Iniciar Jornada
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
};