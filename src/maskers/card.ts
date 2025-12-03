import type { MaskRule } from '../types';

export function maskCard(value: string, rule: MaskRule): string {
  const maskChar = (rule.maskChar || '*').charAt(0);
  const keepStart = rule.keepStart ?? 1;
  const keepEnd = rule.keepEnd ?? 1;
  // mask digits but preserve separators (space/dash)
  const digits = value.replace(/[^0-9]/g, '');
  if (keepStart + keepEnd >= digits.length) return value;
  let keepLeft = keepStart;
  let keepRight = keepEnd;
  let leftCount = 0;
  let rightCount = 0;
  for (let i = 0; i < value.length; i++) {
    const ch = value.charAt(i);
    if (/[0-9]/.test(ch)) {
      leftCount++;
    }
  }
  let result = '';
  let seen = 0;
  for (let i = 0; i < value.length; i++) {
    const ch = value.charAt(i);
    if (/[0-9]/.test(ch)) {
      if (seen < keepLeft || seen >= leftCount - keepRight) {
        result += ch;
      } else {
        result += maskChar;
      }
      seen++;
    } else {
      result += ch;
    }
  }
  return result;
}
