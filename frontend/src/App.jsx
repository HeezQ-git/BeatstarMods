/* eslint-disable indent */

// Global imports
import { createContext, useState } from 'react';
import './assets/global.css';

// MUI v5
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { blue } from '@mui/material/colors';
import { Button } from '@mui/material';

// Pages
import { Login } from './pages/Login/Login';
import { SignUp } from './pages/SignUp/SignUp';
import { DiscordAuth } from './pages/DiscordAuth';
import { ConfigCreator } from './pages/Editors/ConfigCreator/ConfigCreator';
import { SelectorScreen } from './pages/Editors/ConfigCreator/SelectorScreen';
import { EditConfig } from './pages/Editors/ConfigCreator/EditConfig';
import { Header } from './pages/Header/Header';

// Routes and routes
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './config/routes';

// Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// TimeAgo
import en from 'javascript-time-ago/locale/en';
import TimeAgo from 'javascript-time-ago';

TimeAgo.addDefaultLocale(en); // add default locate when App loads

// Icons
import { MdClose } from 'react-icons/md';

// Cookies
import { useCookies } from 'react-cookie';

export const ThemeContext = createContext();

function App() {
    const [cookies, setCookie] = useCookies(['mobile-device-warning']);
    const [mode, setMode] = useState(cookies.theme ? cookies.theme : 'light');

    const isMobile = window.innerWidth <= 575;

    const modeTheme = createTheme({
        palette: {
            mode,
            ...(mode === 'light'
                ? {
                      primary: {
                          main: blue[600],
                      },
                      background: {
                          default: '#edebec',
                          paper: '#f2f2f2',
                      },
                  }
                : {
                      primary: {
                          main: blue[600],
                      },
                  }),
        },
    });

    const theme = createTheme(modeTheme, [mode]);

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
            <ThemeContext.Provider value={mode}>
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
                            <Route
                                path={routes.selectorScreen}
                                element={<SelectorScreen />}
                            />
                            <Route
                                path={routes.configCreator}
                                element={<ConfigCreator />}
                            />
                            <Route
                                path={routes.editConfig}
                                element={<EditConfig />}
                            />
                            <Route
                                path={routes.editConfigId}
                                element={<ConfigCreator editMode />}
                            />
                        </Routes>
                        <ToastContainer
                            newestOnTop
                            limit={3}
                        />
                    </div>
                </ThemeProvider>
            </ThemeContext.Provider>
        </BrowserRouter>
    );
}

export default App;
