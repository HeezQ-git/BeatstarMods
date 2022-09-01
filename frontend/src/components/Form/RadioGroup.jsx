import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText, FormControlLabel, RadioGroup, Radio, FormLabel } from '@mui/material';
import { Controller } from 'react-hook-form';
import { errorMessages } from './messages';

export const FormRadioGroup = ({ control, name, rules, errorReason, formLabel, options, ...props }) => (
    <Controller
        control={control}
        name={name}
        rules={rules}
        defaultValue={options.filter((option) => option.default)[0].value}
        render={({ field, formState: { error } }) => (
            <FormControl error={!!error}>
                <FormLabel>{formLabel}</FormLabel>
                <RadioGroup
                    {...field}
                    {...props}
                    value={field.value}
                >
                    {options.map((option) => (
                        <FormControlLabel
                            key={option.value}
                            value={option.value}
                            control={<Radio />}
                            label={option.label}
                            disabled={option?.disabled}
                        />
                    ))}
                </RadioGroup>
                {!!error && <FormHelperText>{errorReason}</FormHelperText>}
            </FormControl>
        )}
    />
);

FormRadioGroup.propTypes = {
    control: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    label: PropTypes.string,
    rules: PropTypes.object,
    errorReason: PropTypes.string,
    formLabel: PropTypes.string,
};

FormRadioGroup.defaultProps = {
    label: '',
    rules: {},
    errorReason: errorMessages.required,
    formLabel: '',
};
