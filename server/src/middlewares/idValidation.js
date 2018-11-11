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
        req.check('parcelId', ' Id must be an Integer').isInt();
        const errors = req.validationErrors();
        if (errors) {
            return res.status(404).json({
                errors: errors
            });
        }
        next();
    }
    static userId(req, res, next) {
        req.check('userId', ' Id must be an Integer').isInt();
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