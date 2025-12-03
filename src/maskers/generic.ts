import type { MaskRule } from '../types';

export function maskGeneric(value: string, rule: MaskRule): string {
  const maskChar = (rule.maskChar || '*').charAt(0);
  const keepStart = Math.max(0, rule.keepStart || 0);
  const keepEnd = Math.max(0, rule.keepEnd || 0);
  const len = value.length;
  if (keepStart + keepEnd >= len) return value;
  const middleLen = Math.max(0, len - keepStart - keepEnd);
  return value.slice(0, keepStart) + maskChar.repeat(middleLen) + value.slice(len - keepEnd);
}
