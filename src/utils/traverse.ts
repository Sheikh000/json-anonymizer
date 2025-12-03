import type { AnonymizeConfig } from '../types';
import { applyMask } from '../maskers';

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === 'object' && !Array.isArray(v);
}

export function walk(value: unknown, config: AnonymizeConfig, currentPath = ''): unknown {
  if (Array.isArray(value)) {
    return value.map((v, i) => walk(v, config, `${currentPath}[${i}]`));
  }

  if (isPlainObject(value)) {
    const res: Record<string, unknown> = {};
    for (const key of Object.keys(value)) {
      const path = currentPath ? `${currentPath}.${key}` : key;
      const rule = config[path] ?? config[key];
      const val = (value as Record<string, unknown>)[key];
      if (rule) {
        res[key] = applyMask(val, rule);
      } else {
        res[key] = walk(val, config, path);
      }
    }
    return res;
  }

  return value;
}
