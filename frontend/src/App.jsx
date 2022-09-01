/* eslint-disable indent */
import { createContext, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Header } from './pages/Header/Header';
import './assets/global.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './config/routes';
import { Login } from './pages/Login/Login';
import { blue } from '@mui/material/colors';
import { SignUp } from './pages/SignUp/SignUp';
import DiscordAuth from './pages/DiscordAuth';
import { Button } from '@mui/material';
import { MdClose } from 'react-icons/md';
import { useCookies } from 'react-cookie';
import { ConfigCreator } from './pages/Editors/ConfigCreator/ConfigCreator';
import { SelectorScreen } from './pages/Editors/ConfigCreator/SelectorScreen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EditConfig } from './pages/Editors/ConfigCreator/EditConfig';

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
