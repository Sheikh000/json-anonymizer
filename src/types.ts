export type MaskType = 'email' | 'phone' | 'card' | 'name' | 'generic';

export interface MaskRule {
  type?: MaskType;
  keepStart?: number;
  keepEnd?: number;
  maskChar?: string;
}

export type AnonymizeConfig = Record<string, MaskRule>;
