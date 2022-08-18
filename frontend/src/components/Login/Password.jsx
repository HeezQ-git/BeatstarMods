import React, { useState } from 'react';
import { FormTextField } from '../FormComponents/FormTextField';
import zxcvbn from 'zxcvbn';
import { PropTypes } from 'prop-types';

export const Password = ({ control, getValues, confirmPassword }) => {
    const [passwordResult, setPasswordResult] = useState({});

    const checkPassword = (value) => {
        const result = zxcvbn(value);

        setPasswordResult(result);
        return result.score >= 2;
    };

    return (
        <FormTextField
            control={control}
            name={confirmPassword ? 'confirmPassword' : 'password'}
            label={confirmPassword ? 'Confirm password' : 'Password'}
            isError={!confirmPassword ? passwordResult?.score < 2 : false}
            errorReason={!confirmPassword ? passwordResult?.feedback?.warning || 'Password is too weak' : ''}
            rules={{
                required: true,
                validate: {
                    password: (value) => (confirmPassword ? true : checkPassword(value)),
                    confirmPassword: (value) => (confirmPassword ? value === getValues('password') : true),
                },
            }}
            password
            fullWidth
        />
    );
};

Password.propTypes = {
    control: PropTypes.object.isRequired,
    getValues: PropTypes.func,
    confirmPassword: PropTypes.bool,
};

Password.defaultProps = {
    confirmPassword: false,
    getValues: () => {},
};
