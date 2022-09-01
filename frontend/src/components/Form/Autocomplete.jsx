import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { errorMessages } from './messages';

export const FormAutocomplete = ({
    control,
    name,
    rules,
    errorReason,
    options,
    multiple,
    disablePortal,
    filterSelectedOptions,
    isOptionEqualToValue,
    getValue,
    renderTags,
    ...props
}) => (
    <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { value, ref, onChange, ...field }, fieldState: { error } }) => (
            <Autocomplete
                isOptionEqualToValue={isOptionEqualToValue}
                filterSelectedOptions={filterSelectedOptions}
                disablePortal={disablePortal}
                multiple={multiple}
                options={options.length ? options : ''}
                getOptionLabel={(option) => option.label || ''}
                onChange={(_, data) => {
                    onChange(data);
                    getValue(data);
                }}
                renderTags={renderTags}
                value={value}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        {...field}
                        {...props}
                        inputRef={ref}
                        error={!!error}
                        helperText={!!error && errorReason}
                    />
                )}
            />
        )}
    />
);

FormAutocomplete.propTypes = {
    control: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.array,
    rules: PropTypes.object,
    errorReason: PropTypes.string,
    multiple: PropTypes.bool,
    disablePortal: PropTypes.bool,
    filterSelectedOptions: PropTypes.bool,
    isOptionEqualToValue: PropTypes.func,
    renderTags: PropTypes.func,
    getValue: PropTypes.func,
};

FormAutocomplete.defaultProps = {
    options: [],
    rules: {},
    errorReason: errorMessages.required,
    multiple: false,
    disablePortal: false,
    filterSelectedOptions: false,
    isOptionEqualToValue: (option, value) => option.label === value.label,
    renderTags: null,
    getValue: () => {},
};
