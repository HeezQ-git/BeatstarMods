import { Button, Grid } from '@mui/material';
import React, { useContext } from 'react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { ConfigContext } from './ConfigCreator';

export const ConfigNavigation = () => {
    const { step, setStep, amountOfSteps } = useContext(ConfigContext);

    const handleStepChange = (nextStep) => {
        if (step < 0 || nextStep > amountOfSteps) {
            return;
        }

        setStep((prevStep) => prevStep + nextStep);
    };

    return (
        <Grid
            item
            alignItems='center'
            justifyContent='space-between'
            mt={4}
            sx={{ display: 'flex' }}
        >
            <Button
                onClick={() => handleStepChange(-1)}
                variant='contained'
                startIcon={<MdArrowBack />}
                disabled={step <= 0}
            >
                Back
            </Button>
            <Button
                onClick={() => handleStepChange(1)}
                variant='contained'
                endIcon={<MdArrowForward />}
                disabled={step >= amountOfSteps}
            >
                {step === amountOfSteps - 1 ? 'Finish' : 'Next'}
            </Button>
        </Grid>
    );
};
