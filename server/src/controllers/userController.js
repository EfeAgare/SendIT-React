import users from '../models/users';
import parcels from '../models/parcels';

/**
 * This Class is for the User Controllers
 */

class UserController {
    /**
     * This Method fetch the a Parcel order belonging to a User
     * @param {object} req - client request object
     * @param {object} res -server response object
     * @param {object} next
     * @returns {object} success or failure
     */

    static getUserParcel(req, res, next) {
        const userData = users.filter(user => user.id === parseInt(req.params.userId));
        const userParcel =  parcels.filter(parcel => parcel.id === parseInt(req.params.userId));
        if (userData[0]) {
            return res.status(200).json({
                success: 'true',
                message: 'Parcel retrieved successfully',
                userData: userParcel,
                
            })
        } else {
            return res.status(404).json({
                message: 'User not found'
            })
        }
    }
}
export default UserController;