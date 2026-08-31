import React, { useCallback, useEffect, useRef, useState } from 'react';
import MuiAutocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDebounceCb } from '../../helpers/hooks';
import { useModulesManager } from '../../helpers/modules';
import { useTranslations } from '../../helpers/i18n';
import { formatAdvancedFilterDisplayValue } from '../../utils/advancedFilterLocationUtils';

const DEFAULT_DEBOUNCE_MS = 300;
const DEFAULT_MIN_LENGTH = 2;

function FilterSuggestionsAutocomplete({
  label,
  value = '',
  onChange,
  fetchSuggestions,
  minLength = DEFAULT_MIN_LENGTH,
  debounceMs = DEFAULT_DEBOUNCE_MS,
  readOnly = false,
  freeSolo = true,
  getOptionLabel = (option) => (typeof option === 'string' ? option : option?.label ?? option?.value ?? ''),
}) {
  const modulesManager = useModulesManager();
  const { formatMessage } = useTranslations('core.FilterSuggestionsAutocomplete', modulesManager);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState(() => formatAdvancedFilterDisplayValue(value));
  const [loading, setLoading] = useState(false);
  const requestIdRef = useRef(0);

  useEffect(() => {
    const nextValue = formatAdvancedFilterDisplayValue(value);
    setInputValue((prev) => (prev === nextValue ? prev : nextValue));
  }, [value]);

  const loadSuggestions = useCallback(async (search) => {
    const trimmed = (search ?? '').trim();
    if (trimmed.length < minLength) {
      setOptions([]);
      return;
    }
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setLoading(true);
    try {
      const result = await fetchSuggestions(trimmed);
      if (requestIdRef.current === requestId) {
        setOptions(Array.isArray(result) ? result : []);
      }
    } catch {
      if (requestIdRef.current === requestId) {
        setOptions([]);
      }
    } finally {
      if (requestIdRef.current === requestId) {
        setLoading(false);
      }
    }
  }, [fetchSuggestions, minLength]);

  const debouncedLoad = useDebounceCb(loadSuggestions, debounceMs);

  const handleInputChange = (_, newInput, reason) => {
    if (reason === 'reset') {
      // MUI Autocomplete emits "reset" when options refresh — do not wipe in-progress typing
      if ((newInput ?? '') === '' && inputValue) {
        return;
      }
      setInputValue(newInput ?? '');
      return;
    }
    if (reason === 'input' || reason === 'clear') {
      const next = newInput ?? '';
      setInputValue(next);
      onChange(next);
      if (reason === 'input') {
        debouncedLoad(next);
      }
      if (reason === 'clear') {
        setOptions([]);
      }
    }
  };

  const handleChange = (_, option) => {
    const next = typeof option === 'string'
      ? option
      : (option?.label ?? option?.value ?? '');
    setInputValue(next);
    onChange(next);
  };

  return (
    <MuiAutocomplete
      freeSolo={freeSolo}
      fullWidth
      disabled={readOnly}
      options={options}
      loading={loading}
      inputValue={inputValue}
      getOptionLabel={getOptionLabel}
      getOptionSelected={(option, selected) => {
        const optionValue = typeof option === 'string' ? option : option?.value;
        const selectedValue = typeof selected === 'string' ? selected : selected?.value;
        return optionValue === selectedValue;
      }}
      noOptionsText={formatMessage('noOptions', { defaultMessage: 'No suggestions' })}
      loadingText={formatMessage('loading', { defaultMessage: 'Loading…' })}
      onInputChange={handleInputChange}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="standard"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={18} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}

export default FilterSuggestionsAutocomplete;
