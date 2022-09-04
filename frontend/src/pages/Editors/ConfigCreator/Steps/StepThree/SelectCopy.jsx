/* eslint-disable indent */
import { Button, Grid, MenuItem, Select } from '@mui/material';
import React, { useState, useContext } from 'react';
import { MdDone } from 'react-icons/md';
import { stages } from '../StepThree';
import { PropTypes } from 'prop-types';
import { ConfigContext } from '../../ConfigCreator';
import { toast } from 'react-toastify';

export const SelectCopy = ({ stage }) => {
    const { dispatch } = useContext(ConfigContext);

    const [fields, setFields] = useState([]);
    const [destination, setDestination] = useState([]);

    const fieldOptions = [
        {
            value: 'VFXColor',
            label: 'VFX Color',
        },
        {
            value: 'glowColor',
            label: 'Glow Color',
        },
        {
            value: 'perfectBarColor',
            label: 'Perfect Bar Color',
        },
    ];

    const handleCopy = () => {
        let stageToCopyTo = [];

        if (destination[0] === 'all') {
            stageToCopyTo = Array(5)
                .fill(0)
                .map((_, index) => index);
        } else {
            stageToCopyTo = destination;
        }

        let fieldsToCopy = [];
        if (fields[0] === 'all') {
            fieldsToCopy = fieldOptions.map(({ value }) => value);
        } else {
            fieldsToCopy = fields;
        }

        stageToCopyTo.forEach((destinationStage) => {
            fieldsToCopy.forEach((field) => {
                dispatch({
                    type: 'COPY_FIELD',
                    payload: {
                        destinationStage,
                        stage,
                        field,
                    },
                });
            });
        });

        toast.success('Copied fields to selected stages');

        setFields([]);
        setDestination([]);
    };

    return (
        <Grid
            flexDirection={{
                xs: 'column',
                md: 'row',
            }}
            sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
        >
            <Grid
                flexDirection={{
                    xs: 'column',
                    md: 'row',
                }}
                sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}
            >
                <span>Copy</span>
                <div style={{ width: '150px' }}>
                    <Select
                        size='small'
                        value={fields}
                        onChange={(e) => setFields(e.target.value)}
                        fullWidth
                        multiple
                    >
                        <MenuItem value={'all'}>everything</MenuItem>
                        {fieldOptions.map((option, index) => (
                            <MenuItem
                                key={index}
                                value={option.value}
                            >
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
                <span>
                    from <b>{stages[stage]}</b> to
                </span>{' '}
                <div style={{ width: '150px' }}>
                    <Select
                        size='small'
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        fullWidth
                        multiple
                    >
                        <MenuItem value={'all'}>everywhere</MenuItem>
                        {stages.map((_stage, index) => (
                            <MenuItem
                                key={index}
                                value={index}
                                disabled={index === stage}
                            >
                                {_stage}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            </Grid>
            <div style={{ alignSelf: 'flex-end' }}>
                <Button
                    variant='outlined'
                    startIcon={<MdDone />}
                    onClick={() => handleCopy()}
                >
                    Confirm
                </Button>
            </div>
        </Grid>
    );
};

SelectCopy.propTypes = {
    stage: PropTypes.number.isRequired,
};
