class UserValidation {
    static signUp(req, res, next) {
        req.check('username').isLength({  min: 2 }).trim()
        .withMessage('username name must be specified.').isAlphanumeric()
        .withMessage('username name must have non-alphanumeric characters.');
        req.check('email','Enter a valid email address').trim().isEmail();
        req.check('password').isLength({ min: 7 , max:12}).trim()
        .withMessage('password name must be specified.').matches( /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,12}$/)
        .withMessage('password 7 to 15 characters which contain at least one numeric digit and a special character');
        const errors = req.validationErrors();
        if (errors) {
            return res.status(404).json({errors: errors[0].msg});}next();
    }
}
export default UserValidation;