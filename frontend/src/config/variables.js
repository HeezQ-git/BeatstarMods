export const baseConfigTypes = {
    BaseColor: '#9e544d',
    DarkColor: '#783633',
    ColorGradient: {
        gradient: [
            { color: '#B6648D', time: 0, id: 1 },
            { color: '#896DA2', time: 0.35, id: 2 },
            { color: '#59739F', time: 0.7, id: 3 },
        ],
        toRemoved: [], // stores IDs of removed colors
    },
    CheckpointOutlineColour: '#c5a8ab',
    ColorGradientInGame: {
        gradient: [
            { color: '#896DA2', time: 0, id: 1 },
            { color: '#B664AE', time: 0.5, id: 2 },
            { color: '#B6648D', time: 1, id: 3 },
        ],
        toRemoved: [], // stores IDs of removed colors
    },
    StreakConfig: [
        {
            glowColor: '#B6648D',
            perfectBarColor: '',
            invertPerfectBar: false,
            VFXColor: '#916179',
        },
        {
            glowColor: '#B6648D',
            perfectBarColor: '#1394B0',
            invertPerfectBar: false,
            VFXColor: '#916179',
        },
        {
            glowColor: '#B6648D',
            perfectBarColor: '#1394B0',
            invertPerfectBar: false,
            VFXColor: '#916179',
        },
        {
            glowColor: '#B6648D',
            perfectBarColor: '#1394B0',
            invertPerfectBar: false,
            VFXColor: '#916179',
        },
        {
            glowColor: '#B6648D',
            perfectBarColor: '#1394B0',
            invertPerfectBar: false,
            VFXColor: '#916179',
        },
    ],
    TrackIntensityGlow: '#515f99',
    VFXColor: '#916179',
    VFXAlternativeColor: '#C895AD',
};

export const uploadSongInitialState = {
    image: '',
    imageName: '',
    title: '',
    difficulty: '',
    artists: [],
    bpm: 120,
    duration: {
        minutes: 0,
        seconds: 0,
    },
    genre: [],
    description: '',
};

export const difficulties = [
    { value: 'normal', label: 'Normal' },
    { value: 'hard', label: 'Hard' },
    { value: 'hardPlus', label: 'Hard+' },
    { value: 'extreme', label: 'Extreme' },
    { value: 'extremePlus', label: 'Extreme+' },
    { value: 'insane', label: 'Insane' },
    { value: 'insanePlus', label: 'Insane+' },
];
