import React, { useState, useContext } from 'react';
import { ButtonGroup } from '../../../../../components/ColorPicker/ConfigFile/ButtonGroup';
import { Tile } from '../../../../../components/Beatstar/Tiles/Tile';
import { ConfigContext } from '../../ConfigCreator';
import { PropTypes } from 'prop-types';
import { Checkbox, FormControlLabel } from '@mui/material';

export const StageGlowVFX = ({ stage }) => {
    const { state } = useContext(ConfigContext);
    const [showVFX, setShowVFX] = useState(false);

    return (
        <>
            <ButtonGroup
                name={stage}
                label='VFX color'
                color='VFXColor'
                isStage={true}
            />
            <ButtonGroup
                name={stage}
                label='Glow color'
                color='glowColor'
                isStage={true}
            />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                <Tile
                    VFX={showVFX ? state.StreakConfig.streak[stage]?.VFXColor : ''}
                    color={state.StreakConfig.streak[stage]?.glowColor}
                />
                <FormControlLabel
                    onChange={() => setShowVFX((prevValue) => !prevValue)}
                    control={<Checkbox value={showVFX} />}
                    label='Show VFX'
                    sx={{ marginRight: '0' }}
                />
            </div>
        </>
    );
};

StageGlowVFX.propTypes = {
    stage: PropTypes.number.isRequired,
};
