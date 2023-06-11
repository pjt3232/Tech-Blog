//middleware to only allow access to content for a user who logged in
const withAuth = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.redirect('/');
    }
};

module.exports = withAuth;