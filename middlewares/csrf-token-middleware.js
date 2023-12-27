const csrfTokenMiddleware = (req, res, next) => {

    res.locals.csrf = req.csrf();
    next();
}


module.exports = {
    csrfTokenMiddleware: csrfTokenMiddleware
}
