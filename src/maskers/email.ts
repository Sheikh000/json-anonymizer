import type { MaskRule } from '../types';
import { maskGeneric } from './generic';

export function maskEmail(value: string, rule: MaskRule): string {
  const at = value.indexOf('@');
  if (at === -1) return maskGeneric(value, rule);
  const local = value.slice(0, at);
  const domain = value.slice(at);
  const localMasked = maskGeneric(local, { ...rule, keepEnd: rule.keepEnd ?? 0, keepStart: rule.keepStart ?? 1 });
  return localMasked + domain;
}
