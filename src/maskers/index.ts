import type { MaskRule } from '../types';
import { maskGeneric } from './generic';
import { maskEmail } from './email';
import { maskPhone } from './phone';
import { maskCard } from './card';
import { maskName } from './name';

export function applyMask(value: unknown, rule: MaskRule): unknown {
  if (value === null || value === undefined) return value;
  if (typeof value !== 'string') return value;

  switch (rule.type) {
    case 'email':
      return maskEmail(value, rule);
    case 'phone':
      return maskPhone(value, rule);
    case 'card':
      return maskCard(value, rule);
    case 'name':
      return maskName(value, rule);
    default:
      return maskGeneric(value, rule);
  }
}
