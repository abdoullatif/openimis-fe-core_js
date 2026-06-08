const JSON_EXT_LOCATION_FIELDS = new Set([
  'region',
  'prefecture',
  'sous_prefecture',
  'district',
]);

const TYPE_LOCATION_LEVELS = {
  R: 0,
  Region: 0,
  D: 1,
  District: 1,
  W: 2,
  Ward: 2,
  Municipality: 2,
  V: 3,
  Village: 3,
};

export function isLocationAwareFilterField(filter) {
  if (!filter?.field) return false;
  const field = String(filter.field).toLowerCase();
  if (JSON_EXT_LOCATION_FIELDS.has(field)) return true;
  if (filter.typeLocation || filter.referential === 'Location') return true;
  return false;
}

export function canUseLocationPickerFallback(filter) {
  return !!(filter?.typeLocation || filter?.referential === 'Location');
}

export function normalizeTypeLocationToLevel(typeLocation) {
  if (typeLocation === null || typeLocation === undefined || typeLocation === '') {
    return undefined;
  }
  const key = String(typeLocation).trim();
  if (Object.prototype.hasOwnProperty.call(TYPE_LOCATION_LEVELS, key)) {
    return TYPE_LOCATION_LEVELS[key];
  }
  const match = Object.keys(TYPE_LOCATION_LEVELS).find(
    (candidate) => candidate.toLowerCase() === key.toLowerCase(),
  );
  return match !== undefined ? TYPE_LOCATION_LEVELS[match] : undefined;
}

export function formatAdvancedFilterDisplayValue(value) {
  if (value === null || value === undefined || value === '') return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object') {
    return value.name ?? value.label ?? value.value ?? '';
  }
  return String(value);
}

export function normalizeLocationFilterValue(location) {
  if (!location || typeof location !== 'object') return '';
  return {
    name: location.name ?? '',
    ...(location.code ? { code: location.code } : {}),
    ...(location.uuid ? { uuid: location.uuid } : {}),
  };
}

export function serializeCriteriaValueForSave(value) {
  if (value === null || value === undefined || value === '') return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && value.name) {
    return normalizeLocationFilterValue(value);
  }
  return formatAdvancedFilterDisplayValue(value);
}

export function resolveSavedFilterInputMode(value, filter) {
  if (typeof value === 'object' && value !== null && (value.name || value.uuid)) {
    return 'location';
  }
  if (typeof value === 'string' && value !== '') {
    return 'suggestions';
  }
  if (isLocationAwareFilterField(filter)) {
    return 'pending';
  }
  return 'suggestions';
}
