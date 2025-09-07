import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Target, Clock, Users, BarChart3, Shield, CheckCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useWizardStore } from '../../store/wizardStore';

export const LandingStep: React.FC = () => {
  const { nextStep } = useWizardStore();

  const features = [
    {
      icon: Target,
      title: '20 Questões',
      description: 'Avaliação completa e precisa'
    },
    {
      icon: Clock,
      title: '5-8 Minutos',
      description: 'Rápido e eficiente'
    },
    {
      icon: BarChart3,
      title: 'Análise Detalhada',
      description: 'Relatório personalizado'
    },
    {
      icon: Users,
      title: 'Perfil Comportamental',
      description: 'Baseado em metodologia DISC'
    }
  ];

  const archetypes = [
    {
      icon: Target,
      name: 'Guerreiro',
      description: 'Orientado à ação e resultados',
      color: 'text-yellow-400'
    },
    {
      icon: Users,
      name: 'Rei',
      description: 'Visionário e estratégico',
      color: 'text-yellow-300'
    },
    {
      icon: CheckCircle,
      name: 'Amante',
      description: 'Empático e colaborativo',
      color: 'text-yellow-500'
    },
    {
      icon: BarChart3,
      name: 'Mago',
      description: 'Analítico e preciso',
      color: 'text-yellow-600'
    }
  ];

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
          <div className="text-center space-y-4">
            <h1 className="heading-xl text-gradient">
              Teste DISC Mitológico
            </h1>
            <p className="text-body max-w-2xl mx-auto">
              Descubra seu arquétipo comportamental através de uma jornada 
              de autoconhecimento baseada em mitologia e psicologia.
            </p>
          </div>

          {/* Features Grid */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {features.map((feature, index) => (
              <Card key={index} variant="default" padding="md">
                <div className="flex items-start space-x-3">
                  <feature.icon className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="heading-md mb-1">{feature.title}</h3>
                    <p className="text-muted">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </motion.div>

          {/* Archetypes */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="heading-lg text-center">Arquétipos Comportamentais</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {archetypes.map((archetype, index) => (
                <Card key={index} variant="default" padding="md">
                  <div className="flex items-center space-x-3">
                    <archetype.icon className={`w-8 h-8 ${archetype.color} flex-shrink-0`} />
                    <div>
                      <h3 className="heading-md mb-1">{archetype.name}</h3>
                      <p className="text-muted">{archetype.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Security Notice */}
          <Card variant="default" padding="md" className="bg-slate-800/50">
            <div className="flex items-center space-x-3 text-center">
              <Shield className="w-5 h-5 text-yellow-400 flex-shrink-0" />
              <p className="text-muted">
                100% Gratuito • Resultados Instantâneos • Dados Protegidos
              </p>
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <Button
              variant="primary"
              size="lg"
              onClick={nextStep}
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="w-full sm:w-auto"
            >
              Iniciar Teste
            </Button>
          </div>

        </motion.div>
      </div>
    </motion.div>
  );
};