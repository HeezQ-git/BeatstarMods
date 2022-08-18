import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { errorMessages } from './FormMessages';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

export const FormTextField = ({
    control,
    name,
    rules,
    isError,
    errorReason,
    getValue,
    defaultValue,
    password,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            defaultValue={defaultValue}
            render={({ field: { onChange, ...field }, fieldState: { error } }) =>
                password ? (
                    <TextField
                        {...field}
                        {...props}
                        value={field.value || ''}
                        error={!!error || isError}
                        helperText={
                            ((!!error || isError) &&
                                (!error?.message ? errorMessages[error?.type] || errorReason : error?.message)) ||
                            props.helperText
                        }
                        onChange={(event) => {
                            onChange(event);
                            getValue(event.target.value);
                        }}
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        edge='end'
                                    >
                                        {showPassword ? <MdVisibilityOff size={22.5} /> : <MdVisibility size={22.5} />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                ) : (
                    <TextField
                        {...field}
                        {...props}
                        value={field.value || ''}
                        error={!!error || isError}
                        helperText={
                            ((!!error || isError) &&
                                (!error?.message ? errorMessages[error?.type] || errorReason : error?.message)) ||
                            props.helperText
                        }
                        onChange={(event) => {
                            onChange(event);
                            getValue(event.target.value);
                        }}
                    />
                )
            }
        />
    );
};

FormTextField.propTypes = {
    control: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    isError: PropTypes.bool,
    errorReason: PropTypes.string,
    rules: PropTypes.object,
    getValue: PropTypes.func,
    defaultValue: PropTypes.string,
    helperText: PropTypes.string,
    password: PropTypes.bool,
};

FormTextField.defaultProps = {
    isError: false,
    errorReason: errorMessages.required,
    rules: {},
    getValue: () => {},
    defaultValue: '',
    helperText: '',
    password: false,
};
