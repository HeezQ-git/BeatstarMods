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
import { toast } from 'react-toastify';
import { workshopService } from '../../../services/workshop.service';
import { routes } from '../../../config/routes';
import { useNavigate } from 'react-router';

const icons = {
    hard: HardIcon,
    hardPlus: HardIcon,
    extreme: ExtremeIcon,
    extremePlus: ExtremeIcon,
    insane: InsaneIcon,
    insanePlus: InsaneIcon,
};

export const UploadSongForm = () => {
    const { state, dispatch } = useContext(UploadSongContext);
    const { mode } = useContext(AppContext);
    const [uploading, setUploading] = useState(false);

    const navigate = useNavigate();

    const [artistsList] = useState(['Ariana Grande', 'Katy Perry']);
    const [genresList] = useState([
        'Pop',
        'Rock',
        'Rap',
        'Dance',
        'Hip Hop',
        'R&B',
        'Country',
        'EDM',
        'Jazz',
        'Classical',
        'Metal',
        'Folk',
        'Reggae',
        'Soul',
        'Blues',
        'Punk',
        'Funk',
        'Disco',
        'Techno',
        'House',
        'Trance',
        'Indie',
    ]);

    const { image, imageName, title, difficulty, artists, bpm, genre, duration, description } = state;

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (uploading) {
            return;
        }

        setUploading(true);

        if (!image) {
            return toast.error('Please upload an image');
        }

        const { data } = await toast.promise(
            workshopService.uploadSong({
                image,
                imageName,
                title,
                difficulty,
                artists,
                bpm,
                genre,
                duration,
                description: description === '<p><br></p>' ? '' : description,
            }),
            {
                pending: 'Uploading song...',
                success: 'Song uploaded successfully',
                error: 'Error uploading song',
            },
            {
                toastId: 'uploadSong',
            }
        );

        navigate(routes.workshopSong.replace(':songId', data.songId));
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
                            required
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
                        <FormControl fullWidth>
                            <InputLabel>Genre(s)</InputLabel>
                            <Select
                                onChange={(e) =>
                                    dispatch({
                                        type: 'SET_FIELD',
                                        field: 'genre',
                                        payload: e.target.value,
                                    })
                                }
                                value={genre}
                                multiple
                                renderValue={(selected) => selected.join(', ')}
                            >
                                {genresList.map((_genre) => (
                                    <MenuItem
                                        key={_genre}
                                        value={_genre}
                                    >
                                        <ListItemText primary={_genre} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box
                        display='flex'
                        alignItems='center'
                        gap='20px'
                        width={{
                            xs: '100%',
                            md: '65%',
                        }}
                    >
                        <span>Duration</span>
                        <Grid
                            display='flex'
                            gap='20px'
                            width='100%'
                        >
                            <TextField
                                label='Minutes'
                                value={duration?.minutes}
                                type='number'
                                onChange={(e) =>
                                    e.target.value >= 0 &&
                                    e.target.value < 60 &&
                                    dispatch({
                                        type: 'SET_FIELD',
                                        field: 'duration',
                                        payload: {
                                            ...duration,
                                            minutes: e.target.value,
                                        },
                                    })
                                }
                                fullWidth
                            />
                            <TextField
                                label='Seconds'
                                value={duration?.seconds}
                                type='number'
                                onChange={(e) =>
                                    e.target.value >= 0 &&
                                    e.target.value < 60 &&
                                    dispatch({
                                        type: 'SET_FIELD',
                                        field: 'duration',
                                        payload: {
                                            ...duration,
                                            seconds: e.target.value,
                                        },
                                    })
                                }
                                fullWidth
                            />
                        </Grid>
                    </Box>
                </Grid>
            </form>
        </Grid>
    );
};
