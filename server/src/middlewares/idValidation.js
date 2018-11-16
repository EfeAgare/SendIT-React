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
        req.check('parcelId', ' Enter the valid Parcel ID').isInt();
        const errors = req.validationErrors();
        if (errors) {
            return res.status(404).json({
                errors: errors
            });
        }
        next();
    }
    static userId(req, res, next) {
        req.check('userId', ' Enter the correct User ID').isInt();
        const errors = req.validationErrors();
        if (errors) {
            return res.status(404).json({
                errors: errors
            });
        }
        next();
    }
}
export default IdValidation;