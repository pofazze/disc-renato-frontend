import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, User, Phone, Mail, Shield, Lock, Eye, EyeOff } from 'lucide-react';
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
  const [showPrivacyDetails, setShowPrivacyDetails] = useState(false);

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
    <div className="step-content">
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        className="max-w-md w-full"
      >
        <Card variant="glow" padding="lg" className="max-h-screen-safe overflow-y-auto custom-scrollbar">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div 
              className="flex items-center justify-center mb-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <User className="w-10 h-10 text-primary-400 mr-3" />
              </motion.div>
              <h1 className="text-2xl font-bold text-gradient">
                Dados Pessoais
              </h1>
            </motion.div>
            <p className="text-gray-400 leading-relaxed">
              Precisamos de algumas informações para personalizar seus resultados
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Input
                label="Nome Completo"
                value={name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                onBlur={() => handleBlur('name')}
                placeholder="João Silva Santos"
                error={errors.name}
                required
                icon={<User className="w-4 h-4" />}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  WhatsApp
                  <span className="text-red-400 ml-1">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <PhoneInput
                    value={whatsapp}
                    onChange={(value) => handleFieldChange('whatsapp', value)}
                    error={errors.whatsapp}
                    required
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Input
                label="E-mail"
                type="email"
                value={email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                placeholder="joao@exemplo.com"
                error={errors.email}
                required
                icon={<Mail className="w-4 h-4" />}
              />
            </motion.div>

            {/* Privacy Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-4 p-6 bg-gray-800/50 rounded-xl border border-gray-600/30"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-6 h-6 text-green-400" />
                <span className="text-lg font-semibold text-gray-300">Proteção de Dados</span>
                <Lock className="w-4 h-4 text-gray-400" />
              </div>

              <label className="flex items-start space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={consentGiven}
                  onChange={(e) => handleFieldChange('consentGiven', e.target.checked)}
                  className="custom-checkbox mt-1"
                />
                <div className="text-sm text-gray-300 leading-relaxed">
                  <p className="mb-3">
                    <strong className="text-primary-400">Confirmação de Consentimento:</strong>
                  </p>
                  <p className="mb-2">
                    Concordo com o tratamento dos meus dados pessoais conforme a{' '}
                    <button
                      type="button"
                      onClick={() => setShowPrivacyDetails(!showPrivacyDetails)}
                      className="text-primary-400 hover:text-primary-300 underline inline-flex items-center"
                    >
                      Política de Privacidade
                      {showPrivacyDetails ? <EyeOff className="w-3 h-3 ml-1" /> : <Eye className="w-3 h-3 ml-1" />}
                    </button>
                  </p>
                  <p>
                    Autorizo o recebimento dos resultados por WhatsApp e e-mail.
                  </p>
                </div>
              </label>

              {/* Privacy Details */}
              {showPrivacyDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700/50 text-xs text-gray-400 space-y-2"
                >
                  <p><strong>• Coleta:</strong> Apenas dados fornecidos voluntariamente</p>
                  <p><strong>• Uso:</strong> Exclusivamente para gerar e enviar resultados</p>
                  <p><strong>• Armazenamento:</strong> Dados criptografados e seguros</p>
                  <p><strong>• Compartilhamento:</strong> Nunca compartilhamos com terceiros</p>
                  <p><strong>• Direitos:</strong> Você pode solicitar exclusão a qualquer momento</p>
                </motion.div>
              )}

              {errors.consentGiven && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-red-400 flex items-center space-x-2"
                >
                  <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                  <span>{errors.consentGiven}</span>
                </motion.p>
              )}
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={previousStep}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>

            <Button 
              variant="futuristic"
              onClick={handleSubmit}
            >
              Continuar
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};