import { Button, Divider, IconButton, Paper, Tooltip } from '@mui/material';
import { LoginStyles } from './Login.styles';
import { SiDiscord } from 'react-icons/si';
import { MdOutlineLock } from 'react-icons/md';
import { FormTextField } from '../../components/FormComponents/FormTextField';
import { useForm } from 'react-hook-form';
import { Password } from '../../components/Login/Password';
import { LoadingButton } from '@mui/lab';
import { Link } from 'react-router-dom';
import { config } from '../../config/config';

export const Login = () => {
    const { control, handleSubmit } = useForm({
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
            className={LoginStyles.root}
            id='login-form'
            onSubmit={handleSubmit(handleOnSubmit, (data) => console.log('fail', data))}
        >
            <Paper
                elevation={4}
                className={LoginStyles.paper}
            >
                <h1>Login</h1>
                <p className={LoginStyles.protected}>
                    <MdOutlineLock size={20} />
                    <span>Your data is protected</span>
                </p>
                <div className={LoginStyles.loginFields}>
                    <FormTextField
                        control={control}
                        name='email'
                        label='Email'
                        rules={{
                            required: true,
                            pattern: {
                                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/gi,
                                message: 'Please enter a valid email address',
                            },
                        }}
                        fullWidth
                    />
                    <Password control={control} />
                    <LoadingButton
                        type='submit'
                        form='login-form'
                        variant='contained'
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
    );
};
