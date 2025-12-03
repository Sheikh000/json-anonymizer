import type { MaskRule } from '../types';

export function maskPhone(value: string, rule: MaskRule): string {
  const maskChar = (rule.maskChar || '*').charAt(0);
  const keepEnd = rule.keepEnd ?? 4;
  // preserve non-digits, only mask digits
  let digits = 0;
  for (let i = value.length - 1; i >= 0; i--) {
    if (/[0-9]/.test(value.charAt(i))) digits++;
  }
  let toKeep = keepEnd;
  let kept = 0;
  let out = '';
  for (let i = value.length - 1; i >= 0; i--) {
    const ch = value.charAt(i);
    if (/[0-9]/.test(ch)) {
      if (kept < toKeep) {
        out = ch + out;
        kept++;
      } else {
        out = maskChar + out;
      }
    } else {
      out = ch + out;
    }
  }
  return out;
}
