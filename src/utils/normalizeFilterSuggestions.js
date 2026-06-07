export function normalizeFilterSuggestions(raw) {
  if (!raw) return [];
  if (!Array.isArray(raw)) return [];
  return raw.map((item) => {
    if (typeof item === 'string') {
      return { label: item, value: item };
    }
    const value = item?.value ?? item?.label ?? '';
    const label = item?.label ?? item?.value ?? String(value);
    return { label: String(label), value: String(value) };
  });
}
