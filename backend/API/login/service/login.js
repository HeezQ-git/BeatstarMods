const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ACCOUNT_TYPE } = require('../../../config/variables');
const { getError } = require('../../../utils/getError');
const users = require('../../../models/users');

const signToken = (user) => jwt.sign({ user }, '[S(X(Cx8r2.=fBUT');

const loginUser = async (req, res) => {
    let response = {
        success: false,
        msg: '',
        token: '',
    };

    if (req.body.password) {
        const user = await users.findOne({ email: req.body.email });

        if (user) {
            if (user.accountType === 'classic') {
                const result = await bcrypt.compare(
                    req.body.password,
                    user.password
                );

                if (result) {
                    response.success = true;
                    response.token = signToken({
                        username: user.username,
                        email: user.email,
                        userId: user._id,
                    });
                } else
                    response = {
                        ...response,
                        ...getError('password', 'INCORRECT_ANY'),
                    };
            } else
                response = {
                    ...response,
                    ...getError('user', 'LOGIN_DISCORD'),
                };
        } else if (req.body.accountType === 'discord') {
            return registerUser(req, res);
        } else
            response = {
                ...response,
                ...getError('user', 'USER_NOT_EXIST'),
            };
    } else
        response = {
            ...response,
            ...getError('password', 'PASSWORD_NOT_PROVIDED'),
        };

    return res.status(200).json(response);
};

const registerUser = async (req, res) => {
    let response = {
        success: false,
        msg: '',
        token: '',
    };

    if (req.body.password) {
        const user = await users.findOne({ email: req.body.email });

        if (!user) {
            const hash = await bcrypt.hash(req.body.password, 12);
            const newUser = await users.create({
                username: req.body.username || req.body.discord.username,
                email: req.body.email,
                password: hash,
                registerDate: Date.now(),

                accountType: !req.body.accountType
                    ? ACCOUNT_TYPE.CLASSIC
                    : ACCOUNT_TYPE.DISCORD,

                discord: {
                    avatar: req.body?.discord?.avatar || '',
                    banner: req.body?.discord?.banner || '',
                    discriminator: req.body?.discord?.discriminator || '',
                    id: req.body?.discord?.id || '',
                },
            });

            if (newUser) {
                response.success = true;
                response.token = signToken({
                    username: newUser.username,
                    email: newUser.email,
                    discordId: newUser?.discord?.id || '',
                    userId: newUser._id,
                });
            } else
                response = {
                    ...response,
                    ...getError('other', 'COULD_NOT_CREATE_USER'),
                };
        } else
            response = {
                ...response,
                ...getError('email', 'EMAIL_TAKEN'),
            };
    } else
        response = {
            ...response,
            ...getError('password', 'PASSWORD_NOT_PROVIDED'),
        };

    return res.status(200).json(response);
};

const checkSession = async (req, res) => {
    const token = req.body.token;

    const response = {
        success: false,
    };

    if (token) {
        try {
            const verify = jwt.verify(token, '[S(X(Cx8r2.=fBUT');
            response.success = !!verify.user;
            response.user = {
                username: verify.user.username,
                email: verify.user.email,
            };
        } catch (error) {}
    }

    return res.status(200).json(response);
};

const checkUsername = async (req, res) => {
    let response = {
        isTaken: true,
        msg: '',
        code: '',
    };

    const user = await users.findOne({ username: req.body.username });
    if (user)
        response = {
            ...response,
            ...getError('username', 'USERNAME_TAKEN'),
        };
    else response.isTaken = false;

    return res.status(200).json(response);
};

const checkEmail = async (req, res) => {
    let response = {
        isTaken: true,
        msg: '',
        code: '',
    };

    const user = await users.findOne({ email: req.body.email });
    if (user)
        response = {
            ...response,
            ...getError('email', 'EMAIL_TAKEN'),
        };
    else response.isTaken = false;

    return res.status(200).json(response);
};

module.exports = {
    loginUser,
    registerUser,
    checkSession,
    checkUsername,
    checkEmail,
};
