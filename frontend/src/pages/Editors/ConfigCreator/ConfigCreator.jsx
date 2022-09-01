import React, { createContext, useEffect, useReducer, useState } from 'react';
import { Divider, Grid, Paper, Step, StepLabel, Stepper } from '@mui/material';
import { GS } from '../../../assets/global.styles';
import { baseConfigTypes } from '../../../config/variables';
import { configCreatorReducer } from '../../../hooks/configCreatorReducer';
import { ConfigNavigation } from './Navigation';
import { StepManager } from './Steps/StepManager';
import { PropTypes } from 'prop-types';
import { userService } from '../../../services/user.service';
import { useParams } from 'react-router';

export const ConfigContext = createContext();

export const ConfigCreator = ({ editMode }) => {
    const [state, dispatch] = useReducer(configCreatorReducer, baseConfigTypes);
    const [step, setStep] = useState(0);

    const steps = ['Base', 'Gradients', 'Streak', 'Final'];
    const amountOfSteps = steps.length;

    const { configId } = useParams();

    const configContextValue = {
        state,
        dispatch,
        step,
        setStep,
        amountOfSteps,
    };

    useEffect(() => {
        if (!editMode) {
            return;
        }

        (async () => {
            const { data } = userService.getConfig({ configId });

            console.log(data);
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
                        <span className={GS.title}>Create new config.json</span>
                        <Divider />
                        <Stepper activeStep={step}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <StepManager />
                        <ConfigNavigation />
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
