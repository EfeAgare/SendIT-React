
class CheckValidation {
    static createParcelValidation (req, res, next) {
        req.check('firstName').isLength({ min: 2 }).trim()
        .withMessage('First name must be specified.').isAlphanumeric()
        .withMessage('First name musthave non-alphanumeric characters.');
        req.check('lastName').isLength({ min: 2 }).trim()
        .withMessage('Last name must be specified.').isAlphanumeric()
        .withMessage('Last name must have non-alphanumeric characters.');
        req.check('deliveryAddress', ' deliveryAddress cannot be  empty').trim()
        .not().isEmpty();
        req.check('deliveryLGA', 'deliveryAddress cannot be empty').trim()
        .not().isEmpty();
        req.check('deliveryState', 'deliveryAddress cannot be  empty').trim()
        .not().isEmpty();
        req.check('deliveryStreet', 'deliveryAddress cannot be  empty').trim()
        .not().isEmpty();
        req.check('deliveryEmail','Enter a valid email address').trim().isEmail();
        req.check('deliveryTime', ' expectedArrival time to: cannot be  empty').trim()
        .not().isEmpty().optional({ checkFalsy: true }).isISO8601();
        req.check('deliveryPNumber', 'enter a Vild Nigeria Phone numbe').trim()
        .isMobilePhone('en-NG');
        req.check('pickUpState', 'itemShipped name cannot be empty').trim()
        .not().isEmpty();
        req.check('pickUpLGA', 'itemShipped description cannot be empty').trim()
        .not().isEmpty();
        req.check('pickUpStreet', 'itemShipped description cannot be empty').trim()
        .not().isEmpty();
        req.check('itemDescription', 'itemShipped description cannot be empty').trim()
        .not().isEmpty();
        req.check('pickUpPhoneNumber', 'enter a Vild Nigeria Phone numbe').trim()
        .isMobilePhone('en-NG');
        const errors = req.validationErrors();
        if (errors) {
            return res.status(404).json({errors: errors});}next();
    }
}
export default CheckValidation;
