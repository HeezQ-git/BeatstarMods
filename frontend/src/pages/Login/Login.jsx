import { useState, useEffect } from 'react';
import { Button, Divider, IconButton, Paper, Tooltip } from '@mui/material';
import { LoginStyles } from './Login.styles';
import { SiDiscord } from 'react-icons/si';
import { MdLogin, MdOutlineLock } from 'react-icons/md';
import { FormTextField } from '../../components/Form/TextField';
import { useForm } from 'react-hook-form';
import { Password } from '../../components/Login/Password';
import { LoadingButton } from '@mui/lab';
import { Link, useNavigate } from 'react-router-dom';
import { config } from '../../config/config';
import { loginService } from '../../services/login.service';
import { GS } from '../../assets/global.styles';
import { useCookies } from 'react-cookie';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { routes } from '../../config/routes';

export const Login = () => {
    const [isReady, setReady] = useState(false);
    const [loading, setLoading] = useState(false);
    const { getError, setError, clearError } = useErrorHandler();

    const [cookies, setCookie] = useCookies(['token']);
    const navigate = useNavigate();

    const { control, handleSubmit } = useForm({
        reValidateMode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const handleOnSubmit = async (formData) => {
        setLoading(true);

        const { data } = await loginService.loginUser({ email: formData.email, password: formData.password });

        if (!data.success) {
            setError({
                name: data.category,
                hasError: !data.success,
                message: data.msg,
            });
        } else {
            clearError('all');
            setCookie('token', data.token, { path: '/' });
            window.location.href = routes.profile;
        }

        setLoading(false);
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
                className={LoginStyles.root}
                id='login-form'
                onSubmit={handleSubmit(handleOnSubmit, (data) => console.log('fail', data))}
            >
                <Paper
                    elevation={4}
                    className={[LoginStyles.paper, GS.animation('swipeToLeft')].join(' ')}
                >
                    <h1>LOGIN</h1>
                    <p className={LoginStyles.protected}>
                        <MdOutlineLock size={20} />
                        <span>Your data is protected</span>
                    </p>
                    <div className={LoginStyles.loginFields}>
                        <FormTextField
                            control={control}
                            name='email'
                            label='Email'
                            isError={getError('email')}
                            errorReason=''
                            rules={{
                                required: true,
                                pattern: {
                                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/gi,
                                    message: 'Please enter a valid email',
                                },
                            }}
                            fullWidth
                        />
                        <Password
                            control={control}
                            checkCorrectPassword={false}
                            error={
                                (getError('password', 'hasError') || getError('user', 'hasError')) && {
                                    msg: getError('password', 'message') || getError('user', 'message'),
                                }
                            }
                        />
                        <LoadingButton
                            type='submit'
                            form='login-form'
                            variant='contained'
                            loading={loading}
                            loadingPosition='start'
                            startIcon={<MdLogin />}
                            fullWidth
                        >
                            Login
                        </LoadingButton>
                    </div>
                    <Divider className={LoginStyles.divider} />
                    <div className={LoginStyles.loginButtonsOuter}>
                        <p>Or login using...</p>
                        <div className={LoginStyles.loginButtons}>
                            {/* TODO: Login with Google */}

                            {/* <Tooltip title='Login with Google'>
                            <IconButton>
                                <FcGoogle />
                            </IconButton>
                        </Tooltip> */}
                            <Tooltip title='Login with Discord'>
                                <a
                                    href={`https://discord.com/api/oauth2/authorize?client_id=${config.clientId}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdiscord-auth%2F&response_type=token&scope=identify`}
                                >
                                    <IconButton>
                                        <SiDiscord color='#5865F2' />
                                    </IconButton>
                                </a>
                            </Tooltip>
                        </div>
                    </div>
                    <Divider className={LoginStyles.divider} />
                    <div className={LoginStyles.membership}>
                        <p>Not yet a member?</p>
                        <Link to='/signup'>
                            <Button>Sign Up</Button>
                        </Link>
                    </div>
                </Paper>
            </form>
        )
    );
};
