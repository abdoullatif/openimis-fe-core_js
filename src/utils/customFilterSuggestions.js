import { BOOLEAN } from '../constants';

export function shouldUseCustomFilterValueSuggestions(filter) {
  if (!filter?.field) return false;
  if (filter.referential || filter.typeLocation) return false;
  if (filter.type === BOOLEAN) return false;
  return true;
}
