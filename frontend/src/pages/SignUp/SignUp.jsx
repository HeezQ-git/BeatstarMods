import { Button, Divider, Paper } from '@mui/material';
import { SignUpStyles } from './SignUp.styles';
import { MdOutlineLock } from 'react-icons/md';
import { FormTextField } from '../../components/Form/TextField';
import { useForm } from 'react-hook-form';
import { Password } from '../../components/Login/Password';
import { LoadingButton } from '@mui/lab';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GS } from '../../assets/global.styles';
import { loginService } from '../../services/login.service';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { useCookies } from 'react-cookie';

export const SignUp = () => {
    const [isReady, setReady] = useState(false);
    const [loading, setLoading] = useState(false);

    const [cookies, setCookie] = useCookies(['token']);
    const navigate = useNavigate();

    const { getError, setError, clearError } = useErrorHandler();
    const { control, handleSubmit, getValues } = useForm({
        reValidateMode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const handleOnSubmit = async (formData) => {
        setLoading(true);
        const { data } = await loginService.registerUser(formData);

        if (!data.success) {
            setError({
                name: data.category,
                hasError: !data.success,
                message: data.msg,
            });
        } else {
            clearError('all');
            setCookie('token', data.token, { path: '/' });
            navigate('/profile/finish-signup');
        }
        setLoading(false);
    };

    const checkIfTaken = async (type, value) => {
        const { data } =
            type === 'username'
                ? await loginService.checkUsername({ username: value })
                : await loginService.checkEmail({ email: value });

        if (data.isTaken) {
            setError({
                name: data.category,
                hasError: data.isTaken,
                message: data.msg,
            });
        } else {
            clearError(type);
        }
    };

    useEffect(() => {
        if (cookies['token']) {
            navigate('/profile');
        } else {
            setReady(true);
        }
    }, []);

    return (
        isReady && (
            <form
                className={SignUpStyles.root}
                id='signup-form'
                onSubmit={handleSubmit(handleOnSubmit)}
            >
                <Paper
                    elevation={4}
                    className={[SignUpStyles.paper, GS.animation('swipeToLeft')].join(' ')}
                >
                    <h1>SIGN UP</h1>
                    <p className={SignUpStyles.protected}>
                        <MdOutlineLock size={20} />
                        <span>Your data is protected</span>
                    </p>
                    <div className={SignUpStyles.loginFields}>
                        <FormTextField
                            control={control}
                            name='username'
                            label='Username'
                            debounceTime={500}
                            getValue={(value) => checkIfTaken('username', value)}
                            isError={getError('username', 'hasError')}
                            errorReason={getError('username', 'message')}
                            rules={{
                                required: true,
                                minLength: 4,
                                maxLength: 16,
                                pattern: {
                                    value: /^[a-z0-9_.]+$/gi,
                                    message: 'Username cannot contain illegal characters',
                                },
                                validate: {
                                    isUsernameTaken: () => !getError('username', 'hasError'),
                                },
                            }}
                            fullWidth
                        />
                        <FormTextField
                            control={control}
                            name='email'
                            label='Email'
                            type='email'
                            isError={getError('email', 'hasError')}
                            errorReason={getError('email', 'message')}
                            debounceTime={500}
                            getValue={(value) => checkIfTaken('email', value)}
                            rules={{
                                required: true,
                                pattern: {
                                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/gi,
                                    message: 'Please enter a valid email',
                                },
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
        )
    );
};
