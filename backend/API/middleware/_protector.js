const users = require('../models/users');

const addAction = async (req, res, next) => {
    const token = getToken(req);

    jwt.verify(token, '[S(X(Cx8r2.=fBUT', async (err, user) => {
        if (err) return res.redirect('/login');
        next();

        const _user = await users.findOne({ email: user.user.email });
        _user.actions++;
        await WebsiteUsers.updateOne({ email: user.user.email }, _user);
    });
};

module.exports = {
    checkToken,
    addAction,
};
