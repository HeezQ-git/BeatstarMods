import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Header } from './pages/Header/Header';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './config/routes';
import { Login } from './pages/Login/Login';
import { blue } from '@mui/material/colors';
import { SignUp } from './pages/SignUp/SignUp';
import DiscordAuth from './pages/DiscordAuth';
import { Button } from '@mui/material';
import { MdClose } from 'react-icons/md';
import { useCookies } from 'react-cookie';

function App() {
    const [cookies, setCookie] = useCookies(['mobile-device-warning']);
    const [mode, setMode] = useState(cookies.theme ? cookies.theme : 'light');

    const isMobile = window.innerWidth <= 575;

    const modeTheme = createTheme({
        palette: {
            mode,
        },
    });

    const darkTheme = {
        palette: {
            type: 'dark',
            primary: {
                main: blue[500],
            },
            background: {
                default: '#121212',
                paper: '#151515',
            },
        },
    };
    const lightTheme = {
        palette: {
            type: 'light',
            primary: {
                main: blue[600],
            },
            background: {
                default: '#edebec',
                paper: '#f2f2f2',
            },
        },
    };

    const theme = mode === 'dark' ? createTheme(modeTheme, darkTheme) : createTheme(modeTheme, lightTheme);

    const changeTheme = () => {
        const newMode = mode === 'light' ? 'dark' : 'light';

        setMode(newMode);
        setCookie('theme', newMode, { path: '/' });
    };

    if (!cookies.theme) {
        setCookie('theme', 'light', { path: '/' });
    }

    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {isMobile && !cookies['mobile-device-warning'] ? (
                    <div className='warning'>
                        <h1>Warning!</h1>
                        <p>This website is not intended to be used on mobile devices!</p>
                        <Button
                            variant='outlined'
                            color='error'
                            startIcon={<MdClose />}
                            onClick={() => setCookie('mobile-device-warning', 'true', { path: '/' })}
                        >
                            Close
                        </Button>
                    </div>
                ) : null}
                <Header
                    theme={mode}
                    changeTheme={changeTheme}
                />
                <div className='root'>
                    <Routes>
                        <Route
                            path={routes.root}
                            element={<div>Home</div>}
                        />
                        <Route
                            path={routes.login}
                            element={<Login />}
                        />
                        <Route
                            path={routes.signup}
                            element={<SignUp />}
                        />
                        <Route
                            path={routes.discordAuth}
                            element={<DiscordAuth />}
                        />
                    </Routes>
                </div>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
