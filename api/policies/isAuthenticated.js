

module.exports = function (req, res, next) {
    const headerToken = req.headers['token'];
    if (!headerToken) {
        res
            .status(401)
            .json({ message: 'Missing authentication token.' });
        return;
    }
    sails.helpers.jwTokenVerify(headerToken).switch({
        error: function (err) {
            return res.serverError(err);
        },
        invalid: function (err) {
            return res
                .status(401)
                .json({ message: 'Cann\'t verify Token!!' });
        },
        success: function (user) {
            req.currentUser = user;
            return next();
        }
    });
};
