import { Box, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import { StageContent } from './StepThree/StageContent';

export const stages = ['Intro', 'Stage 2', 'Stage 3', 'Stage 4', 'Final Stage'];

export const StepThree = () => {
    const [value, setValue] = useState(0);

    const handleChange = (_, newValue) => setValue(newValue);

    return (
        <>
            <div style={{ marginTop: '20px' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                    >
                        {stages.map((stage) => (
                            <Tab
                                label={stage}
                                key={stage}
                            />
                        ))}
                    </Tabs>
                </Box>
                {stages.map((stage, index) => (
                    <StageContent
                        key={stage}
                        stage={index}
                        hidden={value !== index}
                    />
                ))}
            </div>
        </>
    );
};
