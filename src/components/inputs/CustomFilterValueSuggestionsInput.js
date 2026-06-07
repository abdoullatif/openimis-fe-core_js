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
  moduleName,
  objectTypeName,
  uuidOfObject,
  fetchCustomFilterValueSuggestions: fetchSuggestionsAction,
  minLength = 1,
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
    return normalizeFilterSuggestions(raw);
  }, [
    field,
    moduleName,
    objectTypeName,
    uuidOfObject,
    fetchSuggestionsAction,
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
    />
  );
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchCustomFilterValueSuggestions,
}, dispatch);

export default connect(null, mapDispatchToProps)(CustomFilterValueSuggestionsInput);
