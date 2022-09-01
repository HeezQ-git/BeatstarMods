import React, { useState } from 'react';
import { FormTextField } from '../Form/TextField';
import zxcvbn from 'zxcvbn';
import { PropTypes } from 'prop-types';

export const Password = ({ control, getValues, confirmPassword, checkCorrectPassword, error }) => {
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
            isError={!!error.msg || (!confirmPassword ? passwordResult?.score < 2 : false)}
            errorReason={
                error.msg || (!confirmPassword ? passwordResult?.feedback?.warning || 'Password is too weak' : '')
            }
            rules={{
                required: true,
                validate: {
                    password: (value) => !checkCorrectPassword || (confirmPassword ? true : checkPassword(value)),
                    confirmPassword: (value) =>
                        !checkCorrectPassword || (confirmPassword ? value === getValues('password') : true),
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
    checkCorrectPassword: PropTypes.bool,
    error: PropTypes.object,
};

Password.defaultProps = {
    confirmPassword: false,
    getValues: () => {},
    checkCorrectPassword: true,
    error: {
        msg: '',
        success: false,
    },
};
