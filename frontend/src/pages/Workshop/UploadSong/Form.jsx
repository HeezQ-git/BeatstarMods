import {
    Autocomplete,
    Box,
    FormControl,
    Grid,
    InputLabel,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import React, { useContext, useMemo, useRef, useState } from 'react';
import { UploadSongContext } from './UploadSong';
import JoditEditor from 'jodit-react';
import { AppContext } from '../../../App';
import HardIcon from '../../../assets/icons/hard.png';
import ExtremeIcon from '../../../assets/icons/extreme.png';
import InsaneIcon from '../../../assets/icons/insane.png';
import { difficulties } from '../../../config/variables';

const icons = {
    hard: HardIcon,
    extreme: ExtremeIcon,
    insane: InsaneIcon,
};

export const UploadSongForm = () => {
    const { state, dispatch } = useContext(UploadSongContext);
    const { mode } = useContext(AppContext);

    const [artistsList] = useState(['Hello', 'World']);

    const { title, difficulty, artists, bpm, tags, description } = state;

    const editor = useRef(null);

    const config = {
        readonly: false,
        placeholder: 'Description (optional)',
        theme: mode,
        toolbarAdaptive: false,
        maxHeight: 400,
        maxWidth: 600,
        disablePlugins: 'powered-by-jodit,video,add-new-line',
        buttons:
            'bold,italic,underline,strikethrough,eraser,ul,ol,fontsize,paragraph,classSpan,lineHeight,superscript,subscript,file,spellcheck,cut,copy',
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const descriptionComponent = useMemo(
        () => (
            <JoditEditor
                ref={editor}
                value={description}
                config={config}
                tabIndex={1}
                onBlur={(newContent) => dispatch({ type: 'SET_FIELD', field: 'description', payload: newContent })}
            />
        ),
        [description],
    );

    return (
        <Grid>
            <form
                id='upload-song'
                onSubmit={handleSubmit}
            >
                <Grid
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    maxWidth='600px'
                    gap='15px'
                >
                    <Box
                        display='flex'
                        flexDirection='column'
                        maxWidth='600px'
                        gap='15px'
                    >
                        <Grid
                            display='flex'
                            gap='10px'
                            width='100%'
                        >
                            <TextField
                                label='Title'
                                value={title}
                                onChange={(e) =>
                                    dispatch({
                                        type: 'SET_FIELD',
                                        field: 'title',
                                        payload: e.target.value,
                                    })
                                }
                                fullWidth
                                required
                            />
                            <FormControl
                                fullWidth
                                required
                            >
                                <InputLabel>Difficulty</InputLabel>
                                <Select
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'SET_FIELD',
                                            field: 'difficulty',
                                            payload: e.target.value,
                                        })
                                    }
                                    value={difficulty}
                                    renderValue={(selected) => (
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                            }}
                                        >
                                            {icons?.[selected] && (
                                                <img
                                                    src={icons[selected]}
                                                    alt={selected}
                                                    style={{
                                                        width: '20px',
                                                        height: '20px',
                                                    }}
                                                />
                                            )}
                                            {difficulties.find((d) => d.value === selected).label}
                                        </div>
                                    )}
                                >
                                    {difficulties.map((diff) => (
                                        <MenuItem
                                            key={diff.value}
                                            value={diff.value}
                                        >
                                            {icons?.[diff.value] && (
                                                <ListItemIcon>
                                                    <img
                                                        src={icons[diff.value]}
                                                        alt={diff.value}
                                                        width='20px'
                                                        height='20px'
                                                    />
                                                </ListItemIcon>
                                            )}
                                            <ListItemText primary={diff.label} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        {descriptionComponent}
                    </Box>
                    <Grid
                        display='flex'
                        gap='10px'
                        width='100%'
                    >
                        <Autocomplete
                            value={artists}
                            options={artistsList}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label='Artist(s)'
                                    fullWidth
                                />
                            )}
                            onChange={(_, newValue) =>
                                (newValue.length ? newValue?.[newValue?.length - 1]?.length < 30 : true) &&
                                dispatch({
                                    type: 'SET_FIELD',
                                    field: 'artists',
                                    payload: newValue ?? [],
                                })
                            }
                            multiple
                            freeSolo
                            fullWidth
                        />
                        <TextField
                            label='BPM'
                            value={bpm}
                            type='number'
                            onChange={(e) =>
                                e.target.value >= 0 &&
                                e.target.value < 1000 &&
                                dispatch({
                                    type: 'SET_FIELD',
                                    field: 'bpm',
                                    payload: e.target.value,
                                })
                            }
                            fullWidth
                        />
                    </Grid>
                    <Box width='100%'>
                        <TextField
                            label='Tags'
                            value={tags}
                            onChange={(e) =>
                                dispatch({
                                    type: 'SET_FIELD',
                                    field: 'tags',
                                    payload: e.target.value,
                                })
                            }
                            fullWidth
                        />
                    </Box>
                </Grid>
            </form>
        </Grid>
    );
};
