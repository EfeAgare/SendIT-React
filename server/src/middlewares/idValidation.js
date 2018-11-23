/**
 * This function handles parcelid validation
 * @param {object} req User resquest object
 * @param {object} res server  response object
 * @param {route} next route
 */
class IdValidation {
    /**
     * This method handles parcelid validation
     * @param {object} req User resquest object
     * @param {object} res server  response object
     * @param {route} next route
     */
    static parcelId(req, res, next) {
        req.check('parcelId', 'Parcel Id is Invalid').trim().isInt();
        const errors = req.validationErrors();
        if (errors) {
            return res.status(400).json({
                errors: errors[0].msg,
            });
        }next();
    }
    static userId(req, res, next) {
        req.check('userId', ' User Id not correctly specifed').trim().isInt();
        const errors = req.validationErrors();
        if (errors) {
            return res.status(400).json({
                errors: errors[0].msg,
            });
        }next();
    }
}
export default IdValidation;