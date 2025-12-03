import type { AnonymizeConfig, MaskRule } from './types';
import { walk } from './utils/traverse';

export function anonymize<T = unknown>(obj: T, config: AnonymizeConfig): T {
  const normalized: AnonymizeConfig = {};
  for (const k of Object.keys(config)) {
    const r = { maskChar: '*', keepStart: 0, keepEnd: 0, ...(config[k] || {}) } as MaskRule;
    normalized[k] = r;
  }
  return walk(obj, normalized) as T;
}

export default anonymize;
