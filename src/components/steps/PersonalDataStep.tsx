import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, User, Phone, Mail, Shield, Eye, EyeOff } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
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
    <div className="page-container">
      <div className="content-area">
        <div className="container-mobile spacing-mobile">
          
          <Card variant="default" padding="lg">
            {/* Header */}
            <div className="text-center space-y-2 mb-6">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <User className="w-6 h-6 text-blue-400" />
                <h1 className="heading-lg">Dados Pessoais</h1>
              </div>
              <p className="text-muted">
                Precisamos de algumas informações para personalizar seus resultados
              </p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              
              {/* Name Field */}
              <div className="form-group">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Nome Completo <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    placeholder="João Silva Santos"
                    className={`input-base pl-10 ${errors.name ? 'input-error' : ''}`}
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-red-400 mt-1">{errors.name}</p>
                )}
              </div>

              {/* WhatsApp Field */}
              <div className="form-group">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  WhatsApp <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => handleFieldChange('whatsapp', e.target.value)}
                    onBlur={() => handleBlur('whatsapp')}
                    placeholder="(11) 99999-9999"
                    className={`input-base pl-10 ${errors.whatsapp ? 'input-error' : ''}`}
                  />
                </div>
                {errors.whatsapp && (
                  <p className="text-sm text-red-400 mt-1">{errors.whatsapp}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="form-group">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  E-mail <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    placeholder="joao@exemplo.com"
                    className={`input-base pl-10 ${errors.email ? 'input-error' : ''}`}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-400 mt-1">{errors.email}</p>
                )}
              </div>

              {/* Privacy Section */}
              <Card variant="default" padding="md" className="bg-slate-800/50">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span className="text-sm font-medium text-slate-300">Proteção de Dados</span>
                  </div>

                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consentGiven}
                      onChange={(e) => handleFieldChange('consentGiven', e.target.checked)}
                      className="checkbox-base mt-1"
                    />
                    <div className="text-sm text-slate-300 leading-relaxed">
                      <p className="mb-2">
                        Concordo com o tratamento dos meus dados pessoais e autorizo 
                        o recebimento dos resultados por WhatsApp e e-mail.
                      </p>
                      <button
                        type="button"
                        onClick={() => setShowPrivacyDetails(!showPrivacyDetails)}
                        className="text-blue-400 hover:text-blue-300 underline inline-flex items-center"
                      >
                        {showPrivacyDetails ? 'Ocultar' : 'Ver'} Política de Privacidade
                        {showPrivacyDetails ? 
                          <EyeOff className="w-3 h-3 ml-1" /> : 
                          <Eye className="w-3 h-3 ml-1" />
                        }
                      </button>
                    </div>
                  </label>

                  {showPrivacyDetails && (
                    <div className="mt-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700 text-xs text-slate-400 space-y-2">
                      <p><strong>• Coleta:</strong> Apenas dados fornecidos voluntariamente</p>
                      <p><strong>• Uso:</strong> Exclusivamente para gerar e enviar resultados</p>
                      <p><strong>• Armazenamento:</strong> Dados criptografados e seguros</p>
                      <p><strong>• Compartilhamento:</strong> Nunca compartilhamos com terceiros</p>
                      <p><strong>• Direitos:</strong> Você pode solicitar exclusão a qualquer momento</p>
                    </div>
                  )}

                  {errors.consentGiven && (
                    <p className="text-sm text-red-400">{errors.consentGiven}</p>
                  )}
                </div>
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
                onClick={handleSubmit}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="order-1 sm:order-2"
              >
                Continuar
              </Button>
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
};