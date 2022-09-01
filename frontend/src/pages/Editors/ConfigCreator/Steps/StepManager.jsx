/* eslint-disable indent */
import React, { useContext } from 'react';
import { ConfigContext } from '../ConfigCreator';
import { Result } from './Result';
import { StepFour } from './StepFour';
import { StepOne } from './StepOne';
import { StepThree } from './StepThree';
import { StepTwo } from './StepTwo';

export const StepManager = () => {
    const { step } = useContext(ConfigContext);

    switch (step) {
        case 0:
            return <StepOne />;
        case 1:
            return <StepTwo />;
        case 2:
            return <StepThree />;
        case 3:
            return <StepFour />;
        case 4:
            return <Result />;
        default:
            return null;
    }
};
