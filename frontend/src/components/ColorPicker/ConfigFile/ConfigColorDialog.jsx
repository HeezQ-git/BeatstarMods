import React, { useContext } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { MdClose, MdSave } from 'react-icons/md';
import { PropTypes } from 'prop-types';
import { ColorPicker, useColor } from 'react-color-palette';
import 'react-color-palette/lib/css/styles.css';
import { ConfigDialogStyles } from './ConfigColorDialog.styles';
import { ConfigContext } from '../../../pages/Editors/ConfigCreator/ConfigCreator';

export const ConfigColorDialog = ({ open, setOpen, name, isStage, colorprop, canUnset }) => {
    const { state, dispatch } = useContext(ConfigContext);

    const path = isStage ? state.StreakConfig.streak[name] : state[name];

    const [color, setColor] = useColor('hex', path[colorprop]);

    return (
        <Dialog open={open}>
            <DialogTitle>
                <span>Select your color</span>
            </DialogTitle>
            <DialogContent>
                <ColorPicker
                    width={456}
                    height={228}
                    color={color}
                    onChange={setColor}
                    hideHSV
                    dark
                />
                <div className={ConfigDialogStyles.colorBox(color.hex)} />
                {canUnset && (
                    <Button
                        sx={{ marginTop: '10px' }}
                        variant='outlined'
                        startIcon={<MdClose />}
                        onClick={() => {
                            setOpen(false);
                            dispatch({
                                type: isStage ? 'SET_STREAK_COLOR' : 'SET_COLOR',
                                payload: isStage ? { type: colorprop, color: '' } : '',
                                configColorType: name,
                            });
                        }}
                    >
                        Unset color
                    </Button>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Close</Button>
                <Button
                    startIcon={<MdSave />}
                    onClick={() => {
                        setOpen(false);
                        dispatch({
                            type: isStage ? 'SET_STREAK_COLOR' : 'SET_COLOR',
                            payload: isStage ? { type: colorprop, color: color.hex } : color.hex,
                            configColorType: name,
                        });
                    }}
                    variant='contained'
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ConfigColorDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    isStage: PropTypes.bool,
    colorprop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    canUnset: PropTypes.bool,
};
