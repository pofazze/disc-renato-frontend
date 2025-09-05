import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, User, Phone, Mail, Shield } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { PhoneInput } from '../ui/PhoneInput';
import { useWizardStore } from '../../store/wizardStore';
import { useRespondentStore } from '../../store/respondentStore';
import { validateName, validateWhatsApp, validateEmail } from '../../lib/validators';

export const PersonalDataStep: React.FC = () => {
  const { nextStep, previousStep } = useWizardStore();
  const { 
    name = '', 
    whatsapp = '', 
    email = '', 
    consentGiven = false, 
    setRespondent 
  } = useRespondentStore();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (field: string, value: any) => {
    switch (field) {
      case 'name':
        return validateName(value) ? '' : 'Digite pelo menos nome e sobrenome';
      case 'whatsapp':
        return validateWhatsApp(value) ? '' : 'Digite um WhatsApp válido';
      case 'email':
        return validateEmail(value) ? '' : 'Digite um e-mail válido';
      case 'consentGiven':
        return value ? '' : 'É necessário aceitar os termos';
      default:
        return '';
    }
  };

  const handleFieldChange = (field: string, value: any) => {
    setRespondent({ [field]: value });
    
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const value = field === 'name' ? name : field === 'whatsapp' ? whatsapp : field === 'email' ? email : consentGiven;
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleSubmit = () => {
    // Validate all fields
    const allErrors: Record<string, string> = {};
    allErrors.name = validateField('name', name);
    allErrors.whatsapp = validateField('whatsapp', whatsapp);
    allErrors.email = validateField('email', email);
    allErrors.consentGiven = validateField('consentGiven', consentGiven);

    setErrors(allErrors);
    setTouched({ name: true, whatsapp: true, email: true, consentGiven: true });

    const hasErrors = Object.values(allErrors).some(error => error !== '');
    
    if (!hasErrors) {
      nextStep();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        className="max-w-md w-full relative z-10"
      >
        <Card padding="lg">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <User className="w-8 h-8 text-blue-400 mr-3" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Dados Pessoais
              </h1>
            </div>
            <p className="text-slate-400">
              Precisamos de algumas informações para personalizar seus resultados
            </p>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <User className="absolute left-3 top-9 w-4 h-4 text-slate-400" />
              <Input
                label="Nome Completo"
                value={name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                onBlur={() => handleBlur('name')}
                placeholder="João Silva"
                error={errors.name}
                required
                className="pl-10"
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-9 w-4 h-4 text-slate-400" />
              <PhoneInput
                value={whatsapp}
                onChange={(value) => handleFieldChange('whatsapp', value)}
                error={errors.whatsapp}
                required
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-9 w-4 h-4 text-slate-400" />
              <Input
                label="E-mail"
                type="email"
                value={email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                placeholder="joao@exemplo.com"
                error={errors.email}
                required
                className="pl-10"
              />
            </div>

            <div className="space-y-2 p-4 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-600/30">
              <div className="flex items-center space-x-2 mb-3">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-sm font-medium text-slate-300">Proteção de Dados</span>
              </div>
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={consentGiven}
                  onChange={(e) => handleFieldChange('consentGiven', e.target.checked)}
                  className="mt-1 w-4 h-4 text-blue-600 bg-slate-800/50 border-slate-600 rounded focus:ring-blue-500 focus:ring-2 backdrop-blur-sm"
                />
                <span className="text-sm text-slate-300 leading-relaxed">
                  Concordo com o tratamento dos meus dados pessoais conforme a{' '}
                  <a href="#" className="text-blue-400 hover:text-blue-300 underline hover:glow">
                    Política de Privacidade
                  </a>{' '}
                  e autorizo o recebimento dos resultados por WhatsApp e e-mail.
                </span>
              </label>
              {errors.consentGiven && (
                <p className="text-sm text-red-400">{errors.consentGiven}</p>
              )}
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={previousStep}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>

            <Button onClick={handleSubmit}>
              Continuar
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};