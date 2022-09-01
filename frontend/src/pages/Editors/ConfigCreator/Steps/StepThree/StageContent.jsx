import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import { ButtonGroup } from '../../../../../components/ColorPicker/ConfigFile/ButtonGroup';
import { Divider, Grid } from '@mui/material';
import { ConfigContext } from '../../ConfigCreator';
import { PerfectBar } from '../../../../../components/Beatstar/Tiles/PerfectBar';
import { SelectCopy } from './SelectCopy';
import { StageGlowVFX } from './StageGlowVFX';

export const StageContent = ({ stage, hidden }) => {
    const { state } = useContext(ConfigContext);

    return (
        <div style={{ paddingBottom: '20px', display: hidden ? 'none' : 'block' }}>
            <div>
                <Grid
                    item
                    sx={{ display: 'flex', alignItems: 'flex-end', pb: '10px' }}
                    justifyContent='space-evenly'
                    flexDirection='row'
                    alignItems='center'
                >
                    <StageGlowVFX stage={stage} />
                </Grid>
                <Divider />
                <Grid
                    item
                    sx={{ display: 'flex', pb: '10px' }}
                    justifyContent='space-evenly'
                    flexDirection='row'
                    alignItems='center'
                >
                    <ButtonGroup
                        name={stage}
                        label='Perfect bar color'
                        color='perfectBarColor'
                        isStage
                        canUnset
                    />
                    <PerfectBar color={state.StreakConfig.streak[stage]?.perfectBarColor} />
                </Grid>
                <Divider />
                <Grid
                    item
                    sx={{ display: 'flex', pt: '10px' }}
                    justifyContent='space-evenly'
                    flexDirection='row'
                    alignItems='center'
                >
                    <SelectCopy stage={stage} />
                </Grid>
            </div>
        </div>
    );
};

StageContent.propTypes = {
    stage: PropTypes.number.isRequired,
    hidden: PropTypes.bool,
};
