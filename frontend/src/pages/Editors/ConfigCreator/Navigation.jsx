/* eslint-disable indent */
import { Button, Grid } from '@mui/material';
import React, { useContext, useState } from 'react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { routes } from '../../../config/routes';
import { ConfigContext } from './ConfigCreator';
import { LoadingButton } from '@mui/lab';

export const ConfigNavigation = () => {
    const { step, setStep, amountOfSteps } = useContext(ConfigContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleStepChange = (nextStep) => {
        if (step === amountOfSteps && nextStep === 1) {
            setLoading(true);

            setTimeout(() => {
                return navigate(`${routes.editConfig}`);
            }, 500);
        }

        if (step === 0 && nextStep === -1) {
            return navigate(-1);
        }

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
                disabled={step < 0}
            >
                Back
            </Button>
            <LoadingButton
                onClick={() => handleStepChange(1)}
                variant='contained'
                endIcon={<MdArrowForward />}
                disabled={step > amountOfSteps}
                loading={loading}
            >
                {step === amountOfSteps ? 'Edit page' : step === amountOfSteps - 1 ? 'Finish' : 'Next'}
            </LoadingButton>
        </Grid>
    );
};
