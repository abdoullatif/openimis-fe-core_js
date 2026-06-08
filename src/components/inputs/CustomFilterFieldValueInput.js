import React, { useCallback, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchCustomFilterValueSuggestions } from '../../actions';
import { normalizeFilterSuggestions } from '../../utils/normalizeFilterSuggestions';
import {
  canUseLocationPickerFallback,
  formatAdvancedFilterDisplayValue,
  isLocationAwareFilterField,
  normalizeLocationFilterValue,
  normalizeTypeLocationToLevel,
  resolveSavedFilterInputMode,
} from '../../utils/advancedFilterLocationUtils';
import CustomFilterValueSuggestionsInput from './CustomFilterValueSuggestionsInput';
import PublishedComponent from '../generics/PublishedComponent';

const INPUT_MODES = {
  PENDING: 'pending',
  SUGGESTIONS: 'suggestions',
  LOCATION: 'location',
};

function CustomFilterFieldValueInput({
  label,
  value,
  onChange,
  readOnly,
  field,
  filterMeta,
  moduleName = 'social_protection',
  objectTypeName = 'BenefitPlan',
  uuidOfObject,
  fetchCustomFilterValueSuggestions: fetchSuggestionsAction,
  minLength = 1,
}) {
  const suggestionsLockedRef = useRef(false);
  const [inputMode, setInputMode] = useState(() => resolveSavedFilterInputMode(value, filterMeta));

  const locationAware = isLocationAwareFilterField(filterMeta);

  useEffect(() => {
    suggestionsLockedRef.current = false;
    setInputMode(resolveSavedFilterInputMode(value, filterMeta));
  }, [field, uuidOfObject, filterMeta?.typeLocation, filterMeta?.referential]);

  const probeSuggestions = useCallback(async (search = '') => {
    if (!field || !moduleName || !objectTypeName || !uuidOfObject) {
      return [];
    }
    const action = await fetchSuggestionsAction({
      moduleName,
      objectTypeName,
      field,
      search,
      uuidOfObject,
      limit: 20,
    });
    if (action?.error || action?.payload?.errors) {
      return [];
    }
    const raw = action?.payload?.data?.customFilterValueSuggestions;
    return normalizeFilterSuggestions(raw);
  }, [field, moduleName, objectTypeName, uuidOfObject, fetchSuggestionsAction]);

  useEffect(() => {
    if (!locationAware || !uuidOfObject || inputMode !== INPUT_MODES.PENDING) {
      return undefined;
    }

    let cancelled = false;

    (async () => {
      const suggestions = await probeSuggestions('');
      if (cancelled) return;

      if (suggestions.length > 0) {
        suggestionsLockedRef.current = true;
        setInputMode(INPUT_MODES.SUGGESTIONS);
        return;
      }

      if (canUseLocationPickerFallback(filterMeta)) {
        setInputMode(INPUT_MODES.LOCATION);
        return;
      }

      setInputMode(INPUT_MODES.SUGGESTIONS);
    })();

    return () => {
      cancelled = true;
    };
  }, [locationAware, uuidOfObject, inputMode, field, filterMeta, probeSuggestions]);

  const handleSuggestionsLoaded = useCallback((results) => {
    if (results?.length > 0) {
      suggestionsLockedRef.current = true;
      if (inputMode !== INPUT_MODES.SUGGESTIONS) {
        setInputMode(INPUT_MODES.SUGGESTIONS);
      }
    }
  }, [inputMode]);

  const handleLocationChange = (location) => {
    if (!location) {
      onChange('');
      return;
    }
    onChange(normalizeLocationFilterValue(location));
  };

  if (!locationAware) {
    return (
      <CustomFilterValueSuggestionsInput
        label={label}
        value={formatAdvancedFilterDisplayValue(value)}
        onChange={onChange}
        readOnly={readOnly}
        field={field}
        moduleName={moduleName}
        objectTypeName={objectTypeName}
        uuidOfObject={uuidOfObject}
        minLength={minLength}
      />
    );
  }

  if (inputMode === INPUT_MODES.PENDING) {
    return <CircularProgress size={20} />;
  }

  if (inputMode === INPUT_MODES.LOCATION) {
    const locationLevel = normalizeTypeLocationToLevel(filterMeta?.typeLocation);
    if (locationLevel === undefined) {
      return (
        <CustomFilterValueSuggestionsInput
          label={label}
          value={formatAdvancedFilterDisplayValue(value)}
          onChange={onChange}
          readOnly={readOnly}
          field={field}
          moduleName={moduleName}
          objectTypeName={objectTypeName}
          uuidOfObject={uuidOfObject}
          minLength={minLength}
          onSuggestionsLoaded={handleSuggestionsLoaded}
        />
      );
    }

    const locationValue = typeof value === 'object' && value !== null ? value : null;

    return (
      <PublishedComponent
        pubRef="location.LocationPicker"
        label={label}
        value={locationValue}
        onChange={handleLocationChange}
        readOnly={readOnly}
        locationLevel={locationLevel}
        nameOnly
      />
    );
  }

  return (
    <CustomFilterValueSuggestionsInput
      label={label}
      value={formatAdvancedFilterDisplayValue(value)}
      onChange={onChange}
      readOnly={readOnly}
      field={field}
      moduleName={moduleName}
      objectTypeName={objectTypeName}
      uuidOfObject={uuidOfObject}
      minLength={minLength}
      onSuggestionsLoaded={handleSuggestionsLoaded}
      getOptionLabel={(option) => (
        typeof option === 'string' ? option : (option?.label ?? option?.value ?? '')
      )}
    />
  );
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchCustomFilterValueSuggestions,
}, dispatch);

export default connect(null, mapDispatchToProps)(CustomFilterFieldValueInput);
