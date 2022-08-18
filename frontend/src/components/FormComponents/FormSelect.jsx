import React from 'react';
import PropTypes from 'prop-types';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { Controller } from 'react-hook-form';
import { errorMessages } from './FormMessages';

export const FormSelect = ({ control, name, rules, errorReason, ...props }) => (
    <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
            <FormControl error={!!error} fullWidth>
                <InputLabel>{props.label}</InputLabel>
                <Select {...field} {...props} value={field.value}>
                    {props.options.map((item) => (
                        <MenuItem key={item.value || item.label} value={item.value || item.label}>
                            {item.label}
                        </MenuItem>
                    ))}
                </Select>
                {!!error && <FormHelperText>{errorReason}</FormHelperText>}
            </FormControl>
        )}
    />
);

FormSelect.propTypes = {
    control: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    label: PropTypes.string,
    rules: PropTypes.object,
    errorReason: PropTypes.string,
};

FormSelect.defaultProps = {
    label: '',
    rules: {},
    errorReason: errorMessages.required,
};
