import { Divider, Grid } from '@mui/material';
import React, { useContext } from 'react';
import { StageTile } from '../../../../components/Beatstar/Tiles/StageTile';
import { baseConfigTypes } from '../../../../config/variables';
import { ConfigContext } from '../ConfigCreator';
import { ConfigCreatorStyles } from '../ConfigCreator.styles';
import { ButtonGroup } from '../../../../components/ColorPicker/ConfigFile/ButtonGroup.jsx';

export const StepOne = () => {
    const { state } = useContext(ConfigContext);

    return (
        <>
            <Grid
                item
                justifyContent={'space-evenly'}
                flexDirection={{ xs: 'column', sm: 'row' }}
                alignItems='center'
                mb={4}
                className={ConfigCreatorStyles.colorSelectors}
            >
                <ButtonGroup
                    name='BaseColor'
                    label='Base color'
                />
                <div className={ConfigCreatorStyles.gradientBox}>
                    <div className={ConfigCreatorStyles.gradient(state.BaseColor, state.DarkColor)} />
                    <span>Result</span>
                </div>
                <ButtonGroup
                    name='DarkColor'
                    label='Dark color'
                />
            </Grid>
            <Divider />
            <Grid
                item
                justifyContent='space-evenly'
                flexDirection='row'
                alignItems='center'
                className={ConfigCreatorStyles.colorSelectors}
            >
                <ButtonGroup
                    name='CheckpointOutlineColour'
                    label='Outline color'
                />
                <StageTile color={state.CheckpointOutlineColour} />
            </Grid>
        </>
    );
};
