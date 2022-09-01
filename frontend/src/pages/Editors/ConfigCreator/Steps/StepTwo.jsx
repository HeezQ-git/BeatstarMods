import { Box, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import { ColorGradient } from './StepTwo/ColorGradient';

export const portal = document.createElement('div');
document.body.appendChild(portal);

export const StepTwo = () => {
    const [value, setValue] = useState(0);

    const handleChange = (_, newValue) => setValue(newValue);

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: '20px' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                >
                    <Tab
                        label={'Color Gradient'}
                        key={0}
                    />
                    <Tab
                        label={'Color Gradient In-Game'}
                        key={1}
                    />
                </Tabs>
            </Box>
            <ColorGradient
                hidden={value !== 0}
                configColorType='ColorGradient'
            />
            <ColorGradient
                hidden={value !== 1}
                configColorType='ColorGradientInGame'
            />
        </>
    );
};
