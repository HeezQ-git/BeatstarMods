import React from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel, Checkbox } from '@mui/material';
import { Controller } from 'react-hook-form';

export const FormCheckbox = ({ control, name, defaultChecked, getValue, ...props }) => (
    <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange, ...field } }) => (
            <FormControlLabel
                checked={value || defaultChecked}
                control={(
                    <Checkbox
                        {...field}
                        onChange={(event) => {
                            onChange(event);
                            getValue(event.target.checked);
                        }}
                    />
                )}
                {...props}
            />
        )}
    />
);

FormCheckbox.propTypes = {
    control: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    rules: PropTypes.object,
    defaultChecked: PropTypes.bool,
    getValue: PropTypes.func,
};

FormCheckbox.defaultProps = {
    label: '',
    rules: {},
    defaultChecked: false,
    getValue: () => { },
};
