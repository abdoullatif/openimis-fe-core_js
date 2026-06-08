import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCustomFilterValueSuggestions } from '../../actions';
import { normalizeFilterSuggestions } from '../../utils/normalizeFilterSuggestions';
import FilterSuggestionsAutocomplete from './FilterSuggestionsAutocomplete';

function CustomFilterValueSuggestionsInput({
  label,
  value,
  onChange,
  readOnly,
  field,
  moduleName = 'social_protection',
  objectTypeName = 'BenefitPlan',
  uuidOfObject,
  fetchCustomFilterValueSuggestions: fetchSuggestionsAction,
  minLength = 1,
  onSuggestionsLoaded,
  getOptionLabel,
}) {
  const fetchSuggestions = useCallback(async (search) => {
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
    const normalized = normalizeFilterSuggestions(raw);
    onSuggestionsLoaded?.(normalized);
    return normalized;
  }, [
    field,
    moduleName,
    objectTypeName,
    uuidOfObject,
    fetchSuggestionsAction,
    onSuggestionsLoaded,
  ]);

  return (
    <FilterSuggestionsAutocomplete
      label={label}
      value={value ?? ''}
      onChange={onChange}
      fetchSuggestions={fetchSuggestions}
      minLength={minLength}
      debounceMs={300}
      readOnly={readOnly}
      freeSolo
      getOptionLabel={getOptionLabel}
    />
  );
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchCustomFilterValueSuggestions,
}, dispatch);

export default connect(null, mapDispatchToProps)(CustomFilterValueSuggestionsInput);
