const jwt = require('jsonwebtoken');
const { getError } = require('../../utils/getError');

const getToken = (req) => req.cookies['token'];

const checkToken = async (req, res, next) => {
    const token = getToken(req);
    if (!token)
        return res.status(400).json({
            errorInfo: getError('user', 'NOT_LOGGED_IN'),
        });

    jwt.verify(token, '[S(X(Cx8r2.=fBUT', (err, user) => {
        if (err)
            return res.status(400).json({
                errorInfo: getError('user', 'NOT_LOGGED_IN'),
            });
        req.user = user;
        next();
    });
};

module.exports = {
    checkToken,
};
