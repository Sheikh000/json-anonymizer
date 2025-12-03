import type { MaskRule } from '../types';

export function maskName(value: string, rule: MaskRule): string {
  const maskChar = (rule.maskChar || '*').charAt(0);
  const keepStart = rule.keepStart ?? 1;
  // mask each word preserving keepStart letters
  return value
    .split(/(\s+)/)
    .map((part) => {
      if (/^\s+$/.test(part)) return part;
      if (part.length <= keepStart) return part;
      return part.slice(0, keepStart) + maskChar.repeat(part.length - keepStart);
    })
    .join('');
}
