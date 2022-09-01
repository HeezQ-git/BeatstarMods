import { Grid } from '@mui/material';
import React from 'react';
import { ButtonGroup } from '../../../../components/ColorPicker/ConfigFile/ButtonGroup';

export const StepFour = () => {
    return (
        <div style={{ marginTop: '20px' }}>
            <Grid
                item
                sx={{ display: 'flex', pb: '10px' }}
                justifyContent='space-evenly'
                flexDirection='row'
                alignItems='center'
            >
                <ButtonGroup
                    name='TrackIntensityGlow'
                    label='Track intensity glow'
                    canUnset
                />
                <ButtonGroup
                    name='VFXColor'
                    label='VFX Color'
                    canUnset
                />
                <ButtonGroup
                    name='VFXAlternativeColor'
                    label='VFX Alt Color'
                    canUnset
                />
            </Grid>
        </div>
    );
};
