export interface Respondent {
  name: string;
  whatsapp: string;
  email: string;
  consentGiven: boolean;
}

export interface QuestionOption {
  id: string;
  text: string;
  archetype: Archetype;
}

export interface QuestionBlock {
  id: number;
  options: QuestionOption[];
}

export interface BlockAnswer {
  blockId: number;
  mostId: string;
  leastId: string;
}

export interface ArchetypeScore {
  raw: number;
  percentage: number;
  mostCount: number;
  leastCount: number;
}

export interface Results {
  warrior: ArchetypeScore;
  king: ArchetypeScore;
  lover: ArchetypeScore;
  mage: ArchetypeScore;
  predominantArchetype: Archetype;
  submittedAt?: Date;
}

export type Archetype = 'warrior' | 'king' | 'lover' | 'mage';

export interface WizardStep {
  id: string;
  title: string;
  component: React.ComponentType;
}

export interface TelemetryEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp: Date;
}