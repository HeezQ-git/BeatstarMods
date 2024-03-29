/* eslint-disable indent */
export const ACTION_TYPES = {
    REPLACE_FIELD: 'REPLACE_FIELD',
    SET_COLOR: 'SET_COLOR',
    SET_GRADIENT: 'SET_GRADIENT',
    UPDATE_GRADIENT: 'UPDATE_GRADIENT',
    DELETE_GRADIENT_COLOR: 'DELETE_GRADIENT_COLOR',
    UNDO_GRADIENT_COLOR: 'UNDO_GRADIENT_COLOR',
    FIND_GRADIENT_COLOR_POSITION: 'FIND_GRADIENT_COLOR_POSITION',
    ADD_GRADIENT_COLOR: 'ADD_GRADIENT_COLOR',
    GRADIENT_SORT: 'GRADIENT_SORT',
    SET_STREAK_COLOR: 'SET_STREAK_COLOR',
    COPY_FIELD: 'COPY_FIELD',
    SET_CONFIG: 'SET_CONFIG',
};

export const configCreatorReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.REPLACE_FIELD:
            return {
                ...state,
                [action.configColorType]: action.payload,
            };
        case ACTION_TYPES.SET_COLOR:
            return {
                ...state,
                [action.configColorType]: action.payload,
            };
        case ACTION_TYPES.SET_GRADIENT:
            return {
                ...state,
                [action.configColorType]: {
                    ...state[action.configColorType],
                    gradient: action.payload,
                },
            };
        case ACTION_TYPES.UPDATE_GRADIENT:
            return {
                ...state,
                [action.configColorType]: {
                    ...state[action.configColorType],
                    gradient: state[action.configColorType].gradient.map((item) => {
                        if (item.id === action.payload.id) {
                            return {
                                ...item,
                                color: action.payload.color,
                                time: action.payload.time,
                            };
                        }
                        return item;
                    }),
                },
            };
        case ACTION_TYPES.DELETE_GRADIENT_COLOR:
            return {
                ...state,
                [action.configColorType]: {
                    ...state[action.configColorType],
                    toRemoved: [...state[action.configColorType].toRemoved, action.payload],
                },
            };
        case ACTION_TYPES.UNDO_GRADIENT_COLOR:
            return {
                ...state,
                [action.configColorType]: {
                    ...state[action.configColorType],
                    toRemoved:
                        state[action.configColorType].gradient.filter(
                            (item) => !state[action.configColorType].toRemoved.includes(item.id),
                        ).length < 8
                            ? state[action.configColorType].toRemoved.filter((id) => id !== action.payload)
                            : state[action.configColorType].toRemoved,
                },
            };
        case ACTION_TYPES.ADD_GRADIENT_COLOR:
            return {
                ...state,
                [action.configColorType]: {
                    ...state[action.configColorType],
                    gradient: [...state[action.configColorType].gradient, action.payload],
                },
            };
        case ACTION_TYPES.GRADIENT_SORT:
            return {
                ...state,
                [action.configColorType]: {
                    ...state[action.configColorType],
                    gradient: state[action.configColorType].gradient.sort((a, b) => a.time - b.time),
                },
            };
        case ACTION_TYPES.SET_STREAK_COLOR:
            return {
                ...state,
                StreakConfig: state.StreakConfig.map((item, index) => {
                    if (index === action.configColorType) {
                        return { ...item, [action.payload.type]: action.payload.color };
                    }
                    return item;
                }),
            };
        case ACTION_TYPES.COPY_FIELD:
            return {
                ...state,
                StreakConfig: state.StreakConfig.map((item, index) => {
                    if (index === action.payload.destinationStage) {
                        return {
                            ...item,
                            [action.payload.field]: state.StreakConfig[action.payload.stage][action.payload.field],
                        };
                    }
                    return item;
                }),
            };
        case ACTION_TYPES.SET_CONFIG:
            return {
                ...state,
                BaseColor: `#${action.payload.BaseColor}`,
                DarkColor: `#${action.payload.DarkColor}`,
                CheckpointOutlineColour: `#${action.payload.CheckpointOutlineColour}`,
                TrackIntensityGlow: `#${action.payload.TrackIntensityGlow}`,
                VFXColor: `#${action.payload.VFXColor}`,
                VFXAlternativeColor: `#${action.payload.VFXAlternativeColor}`,
                StreakConfig: action.payload.StreakConfig.map((item) => ({
                    ...item,
                    VFXColor: `#${item.VFXColor}`,
                    glowColor: `#${item.glowColor}`,
                    perfectBarColor: item.perfectBarColor ? `#${item.perfectBarColor}` : '',
                    invertPerfectBar: Boolean(item.invertPerfectBar),
                })),
                ColorGradient: {
                    ...state.ColorGradient,
                    gradient: action.payload.ColorGradient.map((item, index) => ({
                        ...item,
                        color: `#${item.color}`,
                        id: index,
                    })),
                },
                ColorGradientInGame: {
                    ...state.ColorGradientInGame,
                    gradient: action.payload.ColorGradientInGame.map((item, index) => ({
                        ...item,
                        color: `#${item.color}`,
                        id: index,
                    })),
                },
            };
        default:
            return state;
    }
};
