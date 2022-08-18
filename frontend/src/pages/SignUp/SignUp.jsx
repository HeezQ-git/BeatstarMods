import { Button, Divider, Paper } from '@mui/material';
import { SignUpStyles } from './SignUp.styles';
import { MdOutlineLock } from 'react-icons/md';
import { FormTextField } from '../../components/FormComponents/FormTextField';
import { useForm } from 'react-hook-form';
import { Password } from '../../components/Login/Password';
import { LoadingButton } from '@mui/lab';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const { control, handleSubmit, getValues } = useForm({
        reValidateMode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const handleOnSubmit = (data) => {
        console.log(data);
    };

    return (
        <form
            className={SignUpStyles.root}
            id='signup-form'
            onSubmit={handleSubmit(handleOnSubmit, (data) => console.log('fail', data))}
        >
            <Paper
                elevation={4}
                className={SignUpStyles.paper}
            >
                <h1>Sign Up</h1>
                <p className={SignUpStyles.protected}>
                    <MdOutlineLock size={20} />
                    <span>Your data is protected</span>
                </p>
                <div className={SignUpStyles.loginFields}>
                    <FormTextField
                        control={control}
                        name='username'
                        label='Username'
                        rules={{
                            required: true,
                            minLength: 4,
                            maxLength: 16,
                            pattern: {
                                value: /^[a-z0-9_.]+$/gi,
                                message: 'Username cannot contain illegal characters',
                            },
                        }}
                        fullWidth
                    />
                    <FormTextField
                        control={control}
                        name='email'
                        label='Email'
                        type='email'
                        rules={{
                            required: true,
                            pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/gi,
                        }}
                        fullWidth
                    />
                    <Password control={control} />
                    <Password
                        control={control}
                        getValues={getValues}
                        confirmPassword
                    />
                    <LoadingButton
                        loading={loading}
                        type='submit'
                        form='signup-form'
                        variant='contained'
                        fullWidth
                    >
                        Sign up
                    </LoadingButton>
                </div>
                <Divider className={SignUpStyles.divider} />
                <div className={SignUpStyles.membership}>
                    <p>Already a member?</p>
                    <Link to='/login'>
                        <Button>Login</Button>
                    </Link>
                </div>
            </Paper>
        </form>
    );
};
