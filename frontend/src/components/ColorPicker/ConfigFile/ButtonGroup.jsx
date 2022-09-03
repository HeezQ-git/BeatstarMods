import { Button } from '@mui/material';
import React, { useContext, useState } from 'react';
import { ButtonGroupStyles } from './ConfigColorDialog.styles';
import { PropTypes } from 'prop-types';
import { ConfigColorDialog } from './ConfigColorDialog';
import { ConfigContext } from '../../../pages/Editors/ConfigCreator/ConfigCreator';

export const ButtonGroup = ({ name, label, color, isStage, canUnset }) => {
    const [open, setOpen] = useState(false);
    const { state } = useContext(ConfigContext);

    const path = isStage ? state.StreakConfig[name][color] : state[name];

    return (
        <div className={ButtonGroupStyles.buttonGroup}>
            <div className={ButtonGroupStyles.buttonGroupBox}>
                <div
                    className={ButtonGroupStyles.colorBox(path)}
                    onClick={() => setOpen(true)}
                >
                    {!path && 'EMPTY'}
                </div>
                <span>
                    <Button
                        variant='outlined'
                        onClick={() => setOpen(true)}
                    >
                        {label}
                    </Button>
                </span>
            </div>
            <ConfigColorDialog
                open={open}
                setOpen={setOpen}
                name={name}
                isStage={isStage}
                colorprop={color}
                canUnset={canUnset}
            />
        </div>
    );
};

ButtonGroup.propTypes = {
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
    isStage: PropTypes.bool,
    color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    canUnset: PropTypes.bool,
};

ButtonGroup.defaultProps = {
    isStage: false,
    color: 'color',
    canUnset: false,
};
