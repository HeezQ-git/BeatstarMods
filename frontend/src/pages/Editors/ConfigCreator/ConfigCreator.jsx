import React, { createContext, useEffect, useReducer, useState, useContext } from 'react';
import { Divider, Grid, LinearProgress, Paper, Step, StepButton, StepLabel, Stepper } from '@mui/material';
import { GS } from '../../../assets/global.styles';
import { baseConfigTypes } from '../../../config/variables';
import { configCreatorReducer } from '../../../hooks/configCreatorReducer';
import { ConfigNavigation } from './Navigation';
import { StepManager } from './Steps/StepManager';
import { PropTypes } from 'prop-types';
import { userService } from '../../../services/user.service';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { AppContext } from '../../../App';

export const ConfigContext = createContext();

export const ConfigCreator = ({ editMode }) => {
    const [state, dispatch] = useReducer(configCreatorReducer, baseConfigTypes);
    const [step, setStep] = useState(0);
    const [configName, setConfigName] = useState('');
    const [loading, setLoading] = useState(true);

    const { isMobile } = useContext(AppContext);

    const steps = ['Base', 'Gradients', 'Streak', 'Final'];
    const amountOfSteps = steps.length;

    const { configId } = useParams();

    const configContextValue = {
        state,
        dispatch,
        step,
        setStep,
        amountOfSteps,
        editMode,
        configName,
        configId,
    };

    useEffect(() => {
        if (!editMode) {
            setLoading(false);
            return;
        }

        (async () => {
            setLoading(true);

            const { data } = await toast.promise(userService.getConfig({ configId }), {
                pending: 'Loading config...',
                success: 'Config loaded!',
                error: {
                    render({ data }) {
                        window.location.reload();
                        return data?.response?.data?.errorInfo?.msg || 'Error loading config, please refresh the page';
                    },
                },
            });

            dispatch({
                type: 'SET_CONFIG',
                payload: data.config?.SongTemplate,
            });

            setConfigName(data.configName);

            setLoading(false);
        })();
    }, []);

    return (
        <ConfigContext.Provider value={configContextValue}>
            <Grid
                container
                alignItems='center'
                justifyContent='center'
                className={GS.animation('swipeToBottom')}
            >
                <Grid
                    item
                    xs={12}
                    sm={8}
                    lg={8}
                    xl={6}
                    py={{
                        xs: 2,
                    }}
                >
                    <Paper className={GS.paper}>
                        <span className={GS.title}>
                            {editMode ? `Editing: ${configName}` : 'Create new config.json'}
                        </span>
                        {!loading ? (
                            <div>
                                <Divider />
                                {!isMobile && (
                                    <Stepper
                                        nonLinear
                                        activeStep={step}
                                    >
                                        {steps.map((label) => (
                                            <Step key={label}>
                                                <StepButton
                                                    color='inherit'
                                                    onClick={() => setStep(steps.indexOf(label))}
                                                >
                                                    <StepLabel>{label}</StepLabel>
                                                </StepButton>
                                            </Step>
                                        ))}
                                    </Stepper>
                                )}
                                <StepManager />
                                <ConfigNavigation />
                            </div>
                        ) : (
                            <div style={{ marginTop: '15px' }}>
                                <LinearProgress />
                                <p style={{ marginTop: '15px', fontSize: '18px', fontWeight: 600 }}>
                                    Loading content, please wait...
                                </p>
                            </div>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </ConfigContext.Provider>
    );
};

ConfigCreator.propTypes = {
    editMode: PropTypes.bool,
};

ConfigCreator.defaultProps = {
    editMode: false,
};
