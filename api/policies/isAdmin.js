

module.exports = (req, res, next) => {
    let isAdmin = req.currentUser.isAdmin;
    console.log("isAdmin ---" ,req.currentUser);
    if (!isAdmin) {
        res
            .status(401)
            .json({ message: 'You are not permitted to perform this action, this action is permitted to the admin only' });
        return;
    }

    return next();
}