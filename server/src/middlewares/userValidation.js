class UserValidation {
    static signUp(req, res, next) {
        req.check('username').isLength({  min: 2 }).trim()
        .withMessage('username must be specified.').matches("^[a-zA-Z]*$")
        .withMessage('username must be in alphabelt characters.');
        req.check('lastname').isLength({  min: 2 }).trim()
        .withMessage('lastname must be specified.').matches("^[a-zA-Z]*$")
        .withMessage('lastname must be in alphabelt characters.');
        req.check('email','Enter a valid email address').isEmail().trim();
        req.check('password').matches( /^(?=.*\d).{4,10}$/)
        .withMessage('Password must be between 4 and 10 digits long and include at least one numeric digit');
        const errors = req.validationErrors();
        if (errors) {
            return res.status(400).json({errors: errors[0].msg});
        }
        next();
    }
            
    static login (req, res, next) {
        req.check('email','Enter a valid email address').trim().isEmail();
        req.check('password')
        const errors = req.validationErrors();
        if (errors) {
            return res.status(400).json({errors: errors[0].msg});}next();
    }
}
export default UserValidation;