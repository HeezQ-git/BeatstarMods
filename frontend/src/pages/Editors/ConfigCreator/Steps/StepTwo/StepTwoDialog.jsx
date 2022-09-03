import React, { useContext, useState } from 'react';
import { ColorPicker, useColor } from 'react-color-palette';
import { PropTypes } from 'prop-types';
import { ConfigContext } from '../../ConfigCreator';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Slider,
    TextField,
} from '@mui/material';
import { MdSave } from 'react-icons/md';
import { StepManagerStyles } from '../../ConfigCreator.styles';
import { Box } from '@mui/system';
import { ColorGradientContext } from './ColorGradient';

export const EditDialog = ({ item, open, setDialogOpen }) => {
    const [time, setTime] = useState(item.time * 100);
    const [color, setColor] = useColor('hex', item.color);
    const { dispatch } = useContext(ConfigContext);

    const { configColorType, filteredGradient } = useContext(ColorGradientContext);

    const marks = filteredGradient.map((item) => ({
        value: item.time * 100,
        label: <Box sx={{ bgcolor: 'background.default', p: '4px', borderRadius: '5px' }}>{item.color}</Box>,
    }));

    const newGradient = filteredGradient.map((el) => {
        if (el.id === item.id) {
            return { ...item, time: time / 100, color: color.hex };
        }
        return el;
    });

    return (
        <Dialog open={open}>
            <DialogTitle>Select the color & stop</DialogTitle>
            <DialogContent sx={{ overflowY: 'hidden' }}>
                <DialogContentText>Preview</DialogContentText>
                <div
                    className={StepManagerStyles.gradientPreview(
                        newGradient,
                        100,
                        configColorType === 'ColorGradient' ? 'radial' : 'linear',
                    )}
                />
            </DialogContent>
            <DialogContent sx={{ overflowY: 'hidden' }}>
                <Grid
                    container
                    spacing={2}
                >
                    <Grid
                        item
                        xs={12}
                    >
                        <ColorPicker
                            width={456}
                            height={228}
                            color={color}
                            onChange={setColor}
                            hideHSV
                            dark
                        />
                        <div className={StepManagerStyles.colorBox(color.hex)} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogContent sx={{ pt: 4, overflowY: 'hidden' }}>
                <div style={{ width: '420px', marginLeft: '13px' }}>
                    <Slider
                        onChange={(_, value) => setTime(value)}
                        value={time}
                        marks={marks}
                        valueLabelDisplay='auto'
                        max={100}
                        min={0}
                    />
                </div>
                <div style={{ width: '100px', marginTop: '20px' }}>
                    <TextField
                        size='small'
                        label='Stop'
                        type={'number'}
                        value={time}
                        onChange={(e) =>
                            Number(e.target.value) >= 0 &&
                            Number(e.target.value) <= 100 &&
                            setTime(Number(e.target.value))
                        }
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button
                    onClick={() => {
                        setDialogOpen(false);
                        dispatch({
                            type: 'UPDATE_GRADIENT',
                            payload: {
                                color: color.hex,
                                id: item.id,
                                time: time / 100,
                            },
                            configColorType,
                        });
                    }}
                    variant='contained'
                    startIcon={<MdSave />}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

EditDialog.propTypes = {
    item: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    setDialogOpen: PropTypes.func.isRequired,
};
