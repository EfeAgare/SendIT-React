
class CheckValidation {
    static createParcelValidation (req, res, next) {
        req.check('deliveryAddress.firstName').isLength({ min: 2 }).trim()
        .withMessage('First name must be specified.').isAlphanumeric()
        .withMessage('First name musthave non-alphanumeric characters.');
        req.check('deliveryAddress.lastName').isLength({ min: 2 }).trim()
        .withMessage('Last name must be specified.').isAlphanumeric()
        .withMessage('Last name must have non-alphanumeric characters.');
        req.check('deliveryAddress.streetAddress', ' deliveryAddress cannot be  empty')
        .not().isEmpty();
        req.check('deliveryAddress.addressCity', 'deliveryAddress cannot be empty')
        .not().isEmpty();
        req.check('deliveryAddress.addressState', 'deliveryAddress cannot be  empty')
        .not().isEmpty();
        req.check('expectedArrival.time', ' expectedArrival time to: cannot be  empty')
        .not().isEmpty().optional({ checkFalsy: true }).isISO8601();
        req.check('itemShipped.name', 'itemShipped name cannot be empty')
        .not().isEmpty();
        req.check('itemShipped.description', 'itemShipped description cannot be empty')
        .not().isEmpty();
        req.check('email','Enter a valid email address').isEmail();
        req.check('phoneNumber', 'enter a Vild Nigeria Phone numbe')
        .isMobilePhone('en-NG');
        const errors = req.validationErrors();
        if (errors) {
            return res.status(404).json({errors: errors.msg});}next();
    }
}
export default CheckValidation;
