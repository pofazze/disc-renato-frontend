export const validateName = (name: string): boolean => {
  const trimmed = name.trim();
  return trimmed.length >= 2 && trimmed.split(' ').length >= 2;
};

export const validateWhatsApp = (phone: string): boolean => {
  // Brazilian WhatsApp format: (XX) 9XXXX-XXXX or 11999999999
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 11;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const formatWhatsApp = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  } else if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  
  return phone;
};