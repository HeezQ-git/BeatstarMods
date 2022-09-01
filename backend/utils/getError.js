const errors = {
    user: {
        USER_NOT_EXIST: 'User does not exist',
        USER_NOT_VERIFIED: 'User is not verified',
        LOGIN_DISCORD: 'Login with discord',
        SAVE_CONFIG_FAILED: "Couldn't save config file",
        FILE_NAME_TAKEN: 'File name is already taken',
        NOT_LOGGED_IN: 'You must be logged in',
    },
    username: {
        USERNAME_TAKEN: 'This username is already taken',
        USERNAME_NOT_VALID: 'Username is not valid',
        USERNAME_TOO_LONG: 'Username is too long',
    },
    email: {
        EMAIL_TAKEN: 'This email is already taken',
    },
    password: {
        PASSWORD_TOO_SHORT: 'Password is too short',
        PASSWORD_NOT_PROVIDED: 'Password was not provided',
        PASSWORD_CONF_NOT_PROVIDED: 'Password confirmation was not provided',
        INCORRECT_PASSWORD: 'Incorrect password',
        INCORRECT_ANY: 'Incorrect password or email',
    },
    other: {
        COULD_NOT_CREATE_USER: 'Could not create user',
        UNEXPECTED: 'Unexpected error',
    },
};

module.exports = {
    getError: (category, code) => ({
        msg: errors[category][code] || 'An unknown error has occurred',
        category,
        code,
    }),
};
