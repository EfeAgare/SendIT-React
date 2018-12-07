
class CheckValidation {
    static createParcelValidation (req, res, next) {
        req.check('name').isLength({ min: 2 }).trim()
        .withMessage('name must be specified.').matches("[a-zA-Z\s]*$")
        .withMessage('name name must be in alphabelt characters.');
        req.check('deliveryAddress', ' deliveryAddress cannot be  empty').trim()
        .not().isEmpty();
        req.check('deliveryPNumber', 'enter a valid Nigeria phone number').trim()
        .isMobilePhone('en-NG');
        req.check('pickUpAddress', 'pickUpAddress cannot be empty').trim()
        .not().isEmpty();
        req.check('itemDescription', 'itemDescription cannot be empty').trim()
        .not().isEmpty();
        req.check('itemWeight', 'itemWeight description cannot be empty').trim()
        .not().isEmpty();
        req.check('itemQuantity', 'itemQuantity cannot be empty and must be in integer').trim()
        .not().isEmpty().isInt();
        const errors = req.validationErrors();
        if (errors) {
            return res.status(400).json({errors: errors[0].msg});}next();
    }
}
export default CheckValidation;
