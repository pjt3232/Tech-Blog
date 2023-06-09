const sessionExpirationMiddleware = (req, res, next) => {
    if (req.session.user) {
        const sessionTimeout = 30*60*1000;
        const now = Date.now();
        if (req.session.lastActivity && now - req.session.lastActivity > sessionTimeout) {
            req.session.destroy();
            res.redirect('login');
        } else {
            req.session.lastActivity = now;
            next();
        } 
    } else {
        next();
    }
};

module.exports = sessionExpirationMiddleware;