export const ACTION_TYPES = {
    SET_FIELD: 'SET_FIELD',
};

export const uploadSongReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.SET_FIELD:
            return {
                ...state,
                [action.field]: action.payload,
            };
        default:
            return state;
    }
};
